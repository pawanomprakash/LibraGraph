# integrated_chatbot.py
# This part of the code combines the server.py file coded by Prabhas and the prior chatbot.
# The final vision will be to have a multiagent system basically reusing code such as the server.py code to be integrated into various parts of the project.
# The code will be considered working properly when it runs succesfully in either Prabhas/raniyas Neo4j database

import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from neo4j import GraphDatabase
from langchain_core.messages import AIMessage, HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
import uvicorn
import requests

load_dotenv()

app = FastAPI()

uri = os.getenv("NEO4J_URI")
username = os.getenv("NEO4J_USERNAME")
password = os.getenv("NEO4J_PASSWORD")
driver = GraphDatabase.driver(uri, auth=(username, password))

google_api_key = os.getenv("GOOGLE_API_KEY")

if not google_api_key:
    print("Missing Google API key. Please check your .env file.")
    exit(1)

# server.py functions.
# This part of the code shall be improved hopefully by calling functions form the multiagents systems
 
def fetch_all_nodes():
    query = "MATCH (n) RETURN n"
    with driver.session() as session:
        results = session.run(query)
        return [dict(record["n"]) for record in results]

def fetch_nodes_by_label(label):
    query = f"MATCH (n:{label}) RETURN n"
    with driver.session() as session:
        results = session.run(query)
        return [dict(record["n"]) for record in results]

@app.get("/get-all-data")
async def get_all_data():
    try:
        data = fetch_all_nodes()
        if not data:
            raise HTTPException(status_code=404, detail="No data found in the database")
        return {"nodes": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")

@app.get("/get-books")
async def get_books():
    try:
        books = fetch_nodes_by_label("Book")
        if not books:
            raise HTTPException(status_code=404, detail="No books found in the database")
        return {"books": books}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching books: {str(e)}")

@app.get("/get-students")
async def get_students():
    try:
        students = fetch_nodes_by_label("Student")
        if not students:
            raise HTTPException(status_code=404, detail="No students found in the database")
        return {"students": students}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching students: {str(e)}")

# Chatbot functions
def get_database_schema():
    # This function should return the actual database schema
    # For now, we'll use a placeholder
    return """
    Nodes:
    - Book (properties: title, author, ISBN, availability)
    - Student (properties: name, USN_ID)
    - Admin (properties: name)

    Relationships:
    - (Student)-[BORROWED]->(Book)
    - (Admin)-[ACCESSED]->(Book)
    """

def get_response(user_query, chat_history):
    template = """
    You are a helpful assistant specifically designed to answer questions about the college library database. 
    Use the following database schema information to inform your responses:
    
    {schema}
    
    The database contains information about:
    1. Books (title, author, ISBN, availability)
    2. Students (name, USN ID)
    3. Admin usage (admin name, access time)

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

    llm = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key=google_api_key)
        
    chain = prompt | llm | StrOutputParser()
    
    return chain.invoke({
        "schema": get_database_schema(),
        "chat_history": chat_history,
        "user_question": user_query,
    })

def fetch_data_from_api(endpoint):
    response = requests.get(f"http://localhost:8000{endpoint}")
    if response.status_code == 200:
        return response.json()
    else:
        return None

def main():
    print("Welcome to LibraGraph AI")
    print("Ask questions about the college library database or type 'quit' to exit.")

    chat_history = [
        AIMessage(content="Hello, I'm the College Library Assistant. How can I help you with information about our books, students, or admin usage?"),
    ]

    print("AI:", chat_history[0].content)

    while True:
        user_query = input("You: ")
        
        if user_query.lower() == 'quit':
            print("Thank you for using LibraGraph AI. Goodbye!")
            break

        chat_history.append(HumanMessage(content=user_query))
        
        response = get_response(user_query, chat_history)

        # Check if we need to fetch data from the API
        if "get-all-data" in response.lower():
            data = fetch_data_from_api("/get-all-data")
            if data:
                response += f"\n\nHere's the data from the database: {data}"
        elif "get-books" in response.lower():
            books = fetch_data_from_api("/get-books")
            if books:
                response += f"\n\nHere are the books in the database: {books}"
        elif "get-students" in response.lower():
            students = fetch_data_from_api("/get-students")
            if students:
                response += f"\n\nHere are the students in the database: {students}"

        print("AI:", response)

        chat_history.append(AIMessage(content=response))

if __name__ == "__main__":
    import threading
    
    def run_server():
        uvicorn.run(app, host="0.0.0.0", port=8000)

    server_thread = threading.Thread(target=run_server)
    server_thread.start()

    main()

    import requests
    requests.post("http://localhost:8000/shutdown")