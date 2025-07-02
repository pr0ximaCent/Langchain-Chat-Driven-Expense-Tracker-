import os
import traceback
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables FIRST
from dotenv import load_dotenv
load_dotenv()

# Verify Groq API key is loaded
if not os.environ.get("GROQ_API_KEY"):
    logger.error("GROQ_API_KEY not found in environment variables!")
    raise ValueError("GROQ_API_KEY is required")

# Debug: Check if environment variables are loaded
logger.info(f"GROQ_API_KEY loaded: {bool(os.environ.get('GROQ_API_KEY'))}")
logger.info(f"MONGO_URI loaded: {bool(os.environ.get('MONGO_URI'))}")
logger.info("Using Groq API for LLM inference (no local models)")

from fastapi import FastAPI, Request, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from bson import ObjectId

from db import save_expense, expenses
from langchain_prompt import parse_expense
from vectorstore import embed_text, index

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define your request schema
class ExpenseRequest(BaseModel):
    entry: str

@app.post("/parse_expense")
async def parse_expense_api(req: ExpenseRequest):
    try:
        logger.info(f"Received request: {req.entry}")
        
        # Parse the expense
        parsed_data = parse_expense(req.entry)
        logger.info(f"Parsed data: {parsed_data}")
        
        # Save to database and Pinecone
        save_expense(parsed_data, req.entry)
        logger.info("Data saved successfully")
        
        return {"status": "saved", "parsed": parsed_data}
    
    except Exception as e:
        logger.error(f"Error in parse_expense_api: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/expenses")
async def get_expenses(user: str = "demo", limit: int = 50):
    try:
        logger.info(f"Getting expenses for user: {user}")
        docs = list(expenses.find({"user": user}).sort("timestamp", -1).limit(limit))
        for d in docs:
            d["_id"] = str(d["_id"])
        return docs
    except Exception as e:
        logger.error(f"Error in get_expenses: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/query_expenses")
async def query_expenses(query: str = Query(...), user: str = "demo", top_k: int = 5):
    try:
        logger.info(f"Semantic search for query: {query}")
        embedding = embed_text(query)

        result = index.query(
            vector=embedding.tolist(),
            top_k=top_k,
            include_metadata=True
        )

        expense_ids = [match['id'] for match in result['matches']]
        docs = list(expenses.find({"_id": {"$in": [ObjectId(eid) for eid in expense_ids]}}))

        for doc in docs:
            doc["_id"] = str(doc["_id"])

        return docs

    except Exception as e:
        logger.error(f"Error in query_expenses: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail="Failed to query expenses.")


@app.get("/analytics/category")
async def category_summary(user: str = "demo"):
    from db import expenses
    pipeline = [
        {"$match": {"user": user}},
        {"$unwind": "$parsed"},
        {"$group": {
            "_id": "$parsed.category",
            "total": {"$sum": "$parsed.amount"}
        }}
    ]
    results = list(expenses.aggregate(pipeline))
    return [{"category": r["_id"], "total": r["total"]} for r in results]


@app.get("/analytics/monthly")
async def monthly_summary(user: str = "demo"):
    from db import expenses
    pipeline = [
        {"$match": {"user": user}},
        {"$unwind": "$parsed"},
        {"$group": {
            "_id": {
                "year": {"$year": "$timestamp"},
                "month": {"$month": "$timestamp"},
            },
            "total": {"$sum": "$parsed.amount"}
        }},
        {"$sort": {"_id.year": 1, "_id.month": 1}}
    ]
    results = list(expenses.aggregate(pipeline))
    return [
        {
            "year": r["_id"]["year"],
            "month": r["_id"]["month"],
            "total": r["total"]
        }
        for r in results
    ]


@app.get("/analytics/total")
async def total_summary(user: str = "demo"):
    from db import expenses
    pipeline = [
        {"$match": {"user": user}},
        {"$unwind": "$parsed"},
        {"$group": {"_id": None, "total": {"$sum": "$parsed.amount"}}}
    ]
    result = list(expenses.aggregate(pipeline))
    if result:
        return {"total": result[0]["total"]}
    else:
        return {"total": 0}




@app.get("/")
async def root():
    return {"message": "FinChain backend is up!"}
