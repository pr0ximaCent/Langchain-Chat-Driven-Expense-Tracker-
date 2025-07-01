import os
from dotenv import load_dotenv

load_dotenv()

print("=== Environment Variables Test ===")
print(f"GROQ_API_KEY: {'✓ Set' if os.environ.get('GROQ_API_KEY') else '✗ Missing'}")
print(f"MONGO_URI: {'✓ Set' if os.environ.get('MONGO_URI') else '✗ Missing'}")

if os.environ.get('GROQ_API_KEY'):
    print(f"GROQ_API_KEY length: {len(os.environ.get('GROQ_API_KEY'))}")

if os.environ.get('MONGO_URI'):
    mongo_uri = os.environ.get('MONGO_URI')
    print(f"MONGO_URI starts with: {mongo_uri[:20]}...")
    print(f"MONGO_URI contains 'finchain': {'finchain' in mongo_uri}")

# Test MongoDB connection
try:
    from pymongo import MongoClient
    client = MongoClient(os.environ.get('MONGO_URI'))
    client.admin.command('ping')
    print("✓ MongoDB connection successful")
except Exception as e:
    print(f"✗ MongoDB connection failed: {e}")

# Test Groq connection
try:
    from langchain_groq import ChatGroq
    llm = ChatGroq(
        groq_api_key=os.environ.get("GROQ_API_KEY"),
        model_name="llama3-8b-8192"  # Updated model name
    )
    # Simple test
    response = llm.invoke("Say hello")
    print("✓ Groq connection successful")
    print(f"Test response: {response.content[:50]}...")
except Exception as e:
    print(f"✗ Groq connection failed: {e}")