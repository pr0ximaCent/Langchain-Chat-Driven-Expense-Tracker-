from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.llms import HuggingFaceHub

prompt = PromptTemplate(
    input_variables=["entry"],
    template="""
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
)

# If you have HUGGINGFACEHUB_API_TOKEN in .env, it will use it.
llm = HuggingFaceHub(
    repo_id="google/flan-t5-large",  # Free model, good for text2text tasks
    model_kwargs={"temperature": 0.1, "max_length": 256}
)

chain = LLMChain(llm=llm, prompt=prompt)

def parse_expense(entry: str):
    response = chain.run({"entry": entry})
    # Attempt to safely evaluate the JSON part from LLM response
    try:
        import json, re
        # Extract just the JSON array from the response
        arr = re.search(r"\[.*\]", response, re.DOTALL)
        if arr:
            return json.loads(arr.group())
    except Exception as e:
        return {"error": "Failed to parse", "raw": response}
    return {"error": "No output", "raw": response}
