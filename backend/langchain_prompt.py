from huggingface_hub import InferenceClient
import os
import json
import re
from dotenv import load_dotenv

load_dotenv()

# client = InferenceClient(
#     "google/flan-t5-large",
#     token=os.getenv("HUGGINGFACEHUB_API_TOKEN")
# )
client = InferenceClient(
    "meta-llama/Llama-2-7b-chat-hf",
    token=os.getenv("HUGGINGFACEHUB_API_TOKEN")
)

def parse_expense(entry: str):
    prompt = f"""
You are a finance assistant. Extract expenses from this message:
"{entry}"
Return a JSON array with fields 'item', 'amount', and 'category'.

Example:
Input: "Spent 500 on rent and 100 on groceries"
Output: [
  {{"item": "rent", "amount": 500, "category": "Housing"}},
  {{"item": "groceries", "amount": 100, "category": "Food"}}
]
"""
    try:
        response = client.text_generation(prompt, max_new_tokens=256, temperature=0.1)
        arr = re.search(r"\[.*\]", response, re.DOTALL)
        if arr:
            return json.loads(arr.group())
    except Exception as e:
        return {"error": str(e), "raw": response if 'response' in locals() else ""}
    return {"error": "No output"}
