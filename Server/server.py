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

@app.get("/get-all-data")
async def get_all_data():
    try:
        data = fetch_all_nodes()
        if not data:
            raise HTTPException(status_code=404, detail="No data found in the database")
        return {"nodes": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")

@app.on_event("shutdown")
def shutdown_event():
    driver.close()
