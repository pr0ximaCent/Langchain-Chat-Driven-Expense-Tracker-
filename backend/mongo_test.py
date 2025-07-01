import os
from dotenv import load_dotenv
from pymongo import MongoClient
import certifi

load_dotenv()  # This loads your .env into os.environ

MONGO_URI = os.environ["MONGO_URI"]
client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
client.admin.command('ping')
print("✓ MongoDB connection successful")
