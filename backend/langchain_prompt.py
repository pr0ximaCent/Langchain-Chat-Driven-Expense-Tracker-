import os
import re
import json
from huggingface_hub import InferenceClient
from dotenv import load_dotenv

load_dotenv()

client = InferenceClient(
    model="meta-llama/Llama-2-7b-chat-hf",
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
        response = client.text_generation(prompt=prompt, max_new_tokens=256)
        print("🧠 RAW RESPONSE FROM LLM:\n", response)  # 👈 Debug log

        match = re.search(r"\[.*\]", response, re.DOTALL)
        if match:
            return json.loads(match.group())
        else:
            return {"error": "No JSON found", "raw": response}
    except Exception as e:
        return {"error": str(e), "raw": ""}
