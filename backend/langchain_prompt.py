from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_community.llms import HuggingFacePipeline

from transformers import AutoModelForSeq2SeqLM, AutoTokenizer, pipeline

prompt = PromptTemplate(
    input_variables=["entry"],
    template="""
Extract all expense items with their name, amount, and best-fit category from this sentence.

Sentence: "{entry}"

Respond only in this JSON format (no explanation):

[{{"item": "...", "amount": ..., "category": "..."}}]
"""
)

# Load model and tokenizer locally
def get_local_llm():
    model_name = "google/flan-t5-small"  # or flan-t5-base
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
    pipe = pipeline("text2text-generation", model=model, tokenizer=tokenizer, max_length=256)
    return HuggingFacePipeline(pipeline=pipe)

def parse_expense(entry: str):
    llm = get_local_llm()
    chain = LLMChain(llm=llm, prompt=prompt)
    response = chain.run({"entry": entry})
    print("RAW LLM OUTPUT:", response)  # For debugging, remove or comment out in production

    import re, json, ast
    arr = re.search(r"\[.*\]", response, re.DOTALL)
    if arr:
        array_text = arr.group()
        # Try JSON parsing first
        try:
            return json.loads(array_text)
        except Exception:
            # If JSON fails, try literal_eval (handles single quotes, Pythonic lists)
            try:
                return ast.literal_eval(array_text)
            except Exception:
                pass
    # If nothing works, return the raw output for inspection
    return {"error": "Failed to parse", "raw": response}
