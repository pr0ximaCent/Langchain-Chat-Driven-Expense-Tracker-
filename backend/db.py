import os
import logging
from pymongo import MongoClient
from datetime import datetime
import certifi

logger = logging.getLogger(__name__)

# Load MongoDB URI from environment (env must be loaded before this file is imported)
MONGO_URI = os.environ.get("MONGO_URI", "mongodb://localhost:27017/")
logger.info(f"Connecting to MongoDB with URI: {'*' * (len(MONGO_URI) - 20) + MONGO_URI[-20:]}")

try:
    # Use certifi to set trusted CA bundle for TLS/SSL
    client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
    # Test the connection
    client.admin.command('ping')
    logger.info("MongoDB connection successful!")

    db = client["finchain"]
    expenses = db["expenses"]

    # Test basic operations
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
        result = expenses.insert_one(doc)
        logger.info(f"Expense saved with ID: {result.inserted_id}")
        return result.inserted_id
    except Exception as e:
        logger.error(f"Error saving expense: {e}")
        raise
