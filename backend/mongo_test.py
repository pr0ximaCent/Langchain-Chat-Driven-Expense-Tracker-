import os
from dotenv import load_dotenv
from pymongo import MongoClient
import certifi

load_dotenv()
MONGO_URI = os.environ["MONGO_URI"]
client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
client.admin.command('ping')
print("✓ MongoDB connection successful")
