#test code

import os
import time
import asyncio
import aiohttp
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Depends
from neo4j import AsyncGraphDatabase
from langchain_core.messages import AIMessage, HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
import uvicorn
from pydantic import BaseModel
from typing import List, Dict

load_dotenv()

app = FastAPI()

# Environment variables
NEO4J_URI = os.getenv("NEO4J_URI")
NEO4J_USERNAME = os.getenv("NEO4J_USERNAME")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Validate environment variables
if not all([NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD, GOOGLE_API_KEY]):
    raise ValueError("Missing required environment variables. Please check your .env file.")

# Neo4j driver as a dependency
async def get_neo4j_driver():
    driver = AsyncGraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USERNAME, NEO4J_PASSWORD))
    try:
        yield driver
    finally:
        await driver.close()

# Pydantic models for request/response validation
class Node(BaseModel):
    properties: Dict[str, str]

class NodeResponse(BaseModel):
    nodes: List[Node]

# Database query functions
async def fetch_nodes(driver, label=None):
    query = "MATCH (n{}) RETURN n".format(f":{label}" if label else "")
    async with driver.session() as session:
        result = await session.run(query)
        return [dict(record["n"]) for record in await result.fetch()]

async def get_dynamic_schema(driver):
    query = """
    CALL apoc.meta.schema()
    YIELD value
    RETURN value
    """
    async with driver.session() as session:
        result = await session.run(query)
        schema = await result.single()
        return schema['value'] if schema else {}

# API routes
@app.get("/get-all-data", response_model=NodeResponse)
async def get_all_data(driver: AsyncGraphDatabase.driver = Depends(get_neo4j_driver)):
    try:
        data = await fetch_nodes(driver)
        if not data:
            raise HTTPException(status_code=404, detail="No data found in the database")
        return NodeResponse(nodes=[Node(properties=node) for node in data])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")

@app.get("/get-books", response_model=NodeResponse)
async def get_books(driver: AsyncGraphDatabase.driver = Depends(get_neo4j_driver)):
    try:
        books = await fetch_nodes(driver, "Book")
        if not books:
            raise HTTPException(status_code=404, detail="No books found in the database")
        return NodeResponse(nodes=[Node(properties=book) for book in books])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching books: {str(e)}")

@app.get("/get-students", response_model=NodeResponse)
async def get_students(driver: AsyncGraphDatabase.driver = Depends(get_neo4j_driver)):
    try:
        students = await fetch_nodes(driver, "Student")
        if not students:
            raise HTTPException(status_code=404, detail="No students found in the database")
        return NodeResponse(nodes=[Node(properties=student) for student in students])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching students: {str(e)}")

# Chatbot functions
async def get_response(user_query, chat_history, schema):
    template = """
    You are a helpful assistant specifically designed to answer questions about the college library database. 
    Use the following database schema information to inform your responses:
    
    {schema}
    
    Only answer questions related to this database schema. If a question is not related to the college library database, 
    politely inform the user that you can only answer questions about the college library system.

    Chat history: {chat_history}

    User question: {user_question}
    
    If the user's question requires querying the database, suggest a Cypher query that could answer their question, 
    but do not execute it. Explain how the query relates to their question.

    If the user asks for specific data, you can use the following API endpoints to fetch the data:
    - /get-all-data: Returns all nodes in the database
    - /get-books: Returns all book nodes
    - /get-students: Returns all student nodes

    Use these endpoints when appropriate to provide accurate information from the database.
    """

    prompt = ChatPromptTemplate.from_template(template)

    llm = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key=GOOGLE_API_KEY)
        
    chain = prompt | llm | StrOutputParser()
    
    return await chain.ainvoke({
        "schema": schema,
        "chat_history": chat_history,
        "user_question": user_query,
    })

async def fetch_data_from_api(endpoint):
    async with aiohttp.ClientSession() as session:
        async with session.get(f"http://localhost:8000{endpoint}") as response:
            if response.status == 200:
                return await response.json()
            else:
                return None

async def main():
    driver = AsyncGraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USERNAME, NEO4J_PASSWORD))
    
    print("Welcome to LibraGraph AI")
    print("Ask questions about the college library database or type 'quit' to exit.")

    chat_history = [
        AIMessage(content="Hello, I'm the College Library Assistant. How can I help you with information about our books, students, or admin usage?"),
    ]

    print("AI:", chat_history[0].content)

    schema_cache = None
    schema_cache_time = 0

    try:
        while True:
            user_query = input("You: ")
            
            if user_query.lower() == 'quit':
                print("Thank you for using LibraGraph AI. Goodbye!")
                break

            chat_history.append(HumanMessage(content=user_query))
            
            current_time = time.time()
            if schema_cache is None or current_time - schema_cache_time > 3600:  # Update cache every hour
                schema_cache = await get_dynamic_schema(driver)
                schema_cache_time = current_time
            
            response = await get_response(user_query, chat_history, schema_cache)

            # Check if we need to fetch data from the API
            if "get-all-data" in response.lower():
                data = await fetch_data_from_api("/get-all-data")
                if data:
                    response += f"\n\nHere's the data from the database: {data}"
            elif "get-books" in response.lower():
                books = await fetch_data_from_api("/get-books")
                if books:
                    response += f"\n\nHere are the books in the database: {books}"
            elif "get-students" in response.lower():
                students = await fetch_data_from_api("/get-students")
                if students:
                    response += f"\n\nHere are the students in the database: {students}"

            print("AI:", response)

            chat_history.append(AIMessage(content=response))
    finally:
        await driver.close()

if __name__ == "__main__":
    async def run_server():
        config = uvicorn.Config(app, host="0.0.0.0", port=8000)
        server = uvicorn.Server(config)
        await server.serve()

    async def run_main():
        server_task = asyncio.create_task(run_server())
        main_task = asyncio.create_task(main())
        
        await asyncio.gather(server_task, main_task)

    asyncio.run(run_main())