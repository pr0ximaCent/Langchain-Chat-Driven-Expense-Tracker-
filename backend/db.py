import os
import logging
from pymongo import MongoClient
from datetime import datetime
import certifi
from bson import ObjectId

# 🧠 Vector embedding
from vectorstore import embed_text, index

logger = logging.getLogger(__name__)

# Load MongoDB URI from environment
MONGO_URI = os.environ.get("MONGO_URI", "mongodb://localhost:27017/")
logger.info(f"Connecting to MongoDB with URI: {'*' * (len(MONGO_URI) - 20) + MONGO_URI[-20:]}")

try:
    client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
    client.admin.command('ping')
    logger.info("MongoDB connection successful!")

    db = client["finchain"]
    expenses = db["expenses"]

    logger.info(f"Connected to database: {db.name}")
    logger.info(f"Collections in database: {db.list_collection_names()}")

except Exception as e:
    logger.error(f"MongoDB connection failed: {e}")
    raise

def save_expense(parsed, raw, user="demo"):
    try:
        doc = {
            "user": user,
            "raw": raw,
            "parsed": parsed,
            "timestamp": datetime.utcnow()
        }

        # Save to MongoDB
        result = expenses.insert_one(doc)
        expense_id = str(result.inserted_id)
        logger.info(f"Expense saved with ID: {expense_id}")

        # Create embedding from raw message
        embedding = embed_text(raw)

        # Save vector to Pinecone
        index.upsert([
            (
                expense_id,
                embedding.tolist(),
                {
                    "user": user,
                    "raw": raw,
                    "parsed": str(parsed),
                    "timestamp": doc["timestamp"].isoformat()
                }
            )
        ])
        logger.info(f"Expense embedding upserted to Pinecone: {expense_id}")
        return expense_id

    except Exception as e:
        logger.error(f"Error saving expense: {e}")
        raise
