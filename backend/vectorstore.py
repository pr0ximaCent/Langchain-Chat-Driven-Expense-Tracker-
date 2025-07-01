import os
import pinecone
from sentence_transformers import SentenceTransformer

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Load Pinecone credentials
PINECONE_API_KEY = os.environ["PINECONE_API_KEY"]
PINECONE_ENV = os.environ["PINECONE_ENV"]
PINECONE_INDEX = os.environ.get("PINECONE_INDEX", "expenses-index")

# Initialize Pinecone
pinecone.init(api_key=PINECONE_API_KEY, environment=PINECONE_ENV)
index = pinecone.Index(PINECONE_INDEX)

# Load local embedding model
EMBEDDING_MODEL = SentenceTransformer("all-MiniLM-L6-v2")

def embed_text(text: str):
    return EMBEDDING_MODEL.encode([text])[0]
