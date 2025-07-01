import os
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
from pinecone import Pinecone

load_dotenv()

# Load env
PINECONE_API_KEY = os.environ["PINECONE_API_KEY"]
PINECONE_INDEX = os.environ.get("PINECONE_INDEX", "expenses-index")

# Connect to Pinecone
pc = Pinecone(api_key=PINECONE_API_KEY)
index = pc.Index(PINECONE_INDEX)

# Load sentence-transformer
EMBEDDING_MODEL = SentenceTransformer("all-MiniLM-L6-v2")  # 384-dim

def embed_text(text: str):
    return EMBEDDING_MODEL.encode([text])[0]
