from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_groq import ChatGroq
import os
import json
import re

# Enhanced prompt for better JSON parsing
prompt = PromptTemplate(
    input_variables=["entry"],
    template="""
You are an expense parser. Extract all expense items from the given sentence.

Sentence: "{entry}"

Return ONLY a valid JSON array in this exact format:
[{{"item": "item_name", "amount": number, "category": "category_name"}}]

Categories should be one of: Food, Transportation, Utilities, Entertainment, Shopping, Healthcare, Other

Example: [{{"item": "groceries", "amount": 50, "category": "Food"}}]

Response:"""
)

# Use Groq API - completely cloud-based, no local models
llm = ChatGroq(
    groq_api_key=os.environ["GROQ_API_KEY"],
    model_name="llama3-8b-8192",  # Fast and efficient for parsing tasks
    temperature=0.1,  # Low temperature for consistent JSON output
    max_tokens=1000
)

chain = LLMChain(llm=llm, prompt=prompt)

def parse_expense(entry: str):
    """
    Parse expense entry using Groq API
    """
    try:
        print(f"Parsing entry: {entry}")
        
        # Call Groq API through LangChain
        response = chain.run({"entry": entry})
        print("RAW GROQ API RESPONSE:", response)
        
        # Clean and extract JSON
        response_clean = response.strip()
        
        # Try to find JSON array in response
        json_match = re.search(r'\[.*?\]', response_clean, re.DOTALL)
        if json_match:
            json_str = json_match.group()
            try:
                parsed_data = json.loads(json_str)
                print("Successfully parsed JSON:", parsed_data)
                return parsed_data
            except json.JSONDecodeError as e:
                print(f"JSON parsing failed: {e}")
                return {"error": "Invalid JSON format", "raw": response}
        else:
            print("No JSON array found in response")
            return {"error": "No JSON found", "raw": response}
            
    except Exception as e:
        print(f"Error calling Groq API: {e}")
        return {"error": f"API call failed: {str(e)}", "raw": ""}