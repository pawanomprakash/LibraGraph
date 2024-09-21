from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from neo4j import GraphDatabase
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Neo4j connection details from environment variables
uri = os.getenv("NEO4J_URI")
username = os.getenv("NEO4J_USERNAME")
password = os.getenv("NEO4J_PASSWORD")

driver = GraphDatabase.driver(uri, auth=(username, password))

def fetch_all_nodes():
    query = "MATCH (n) RETURN n"
    with driver.session() as session:
        results = session.run(query)
        nodes = []
        for record in results:
            nodes.append(record["n"])  # Extract node details
        return nodes
    
    
def fetch_nodes_by_label(label):
    query = f"MATCH (n:{label}) RETURN n"
    with driver.session() as session:
        results = session.run(query)
        nodes = []
        for record in results:
            nodes.append(record["n"])  # Extract node details
        return nodes

@app.get("/get-all-data")
async def get_all_data():
    try:
        data = fetch_all_nodes()
        if not data:
            raise HTTPException(status_code=404, detail="No data found in the database")
        return {"nodes": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")

@app.get("/get-authors")
async def get_authors():
    try:
        authors = fetch_nodes_by_label("Author")
        if not authors:
            raise HTTPException(status_code=404, detail="No authors found in the database")
        return {"authors": authors}
    except Exception as e:
        print(f"Error fetching authors: {e}")  # Print the error to console
        raise HTTPException(status_code=500, detail=f"Error fetching authors: {str(e)}")

@app.get("/get-books")
async def get_books():
    try:
        books = fetch_nodes_by_label("Book")
        if not books:
            raise HTTPException(status_code=404, detail="No books found in the database")
        return {"books": books}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching books: {str(e)}")
@app.get("/get-institutions")
async def get_institutions():
    try:
        institutions = fetch_nodes_by_label("Institution")
        if not institutions:
            raise HTTPException(status_code=404, detail="No institutions found in the database")
        return {"institutions": institutions}
    except Exception as e:
        print(f"Error fetching institutions: {e}")  # Print the error to console for debugging
        raise HTTPException(status_code=500, detail=f"Error fetching institutions: {str(e)}")

@app.get("/get-publishers")
async def get_publishers():
    try:
        publishers = fetch_nodes_by_label("Publisher")
        if not publishers:
            raise HTTPException(status_code=404, detail="No publishers found in the database")
        return {"publishers": publishers}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching publishers: {str(e)}")

@app.on_event("shutdown")
def shutdown_event():
    driver.close()