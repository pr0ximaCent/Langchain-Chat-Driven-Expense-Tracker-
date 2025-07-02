🚀 FinChain — Chat-Driven Expense Tracker
A full-stack, modern expense tracker where you log expenses in natural language, get them automatically parsed and categorized by LLMs, store all data in MongoDB, enable semantic search with Pinecone, and visualize insights through a rich Next.js dashboard UI.

🌟 Features
Chat-Driven Input: Log expenses in plain English, e.g. “Spent 450 on Uber and snacks”.

Automated Parsing: Local LLM (transformers, ONNX, or TensorRT-optimized) extracts item, amount, and category.

Categorization: Model assigns category on the fly (e.g. Food, Transport, etc.).

Persistent Storage: Expenses saved to MongoDB.

Semantic Search: Pinecone enables searching by meaning, not just exact words (coming up).

Rich Analytics UI: Stylish Next.js dashboard with charts (Recharts), category summaries, and recent expenses.

Modern Dev Workflow: FastAPI backend, Next.js frontend, Dockerized development, CI/CD-ready.

🖥️ Tech Stack
Layer	Tech
Frontend	Next.js (React, Tailwind, Recharts, Lucide)
Backend	FastAPI (Python, async, REST)
Parsing/AI	LangChain + HuggingFace Transformers, ONNX, TensorRT (GPU)
Storage	MongoDB Atlas
Vector Search	Pinecone
DevOps	Docker, Git, CI/CD

📁 Project Structure
bash
Copy
Edit
FinChain/
├── backend/
│   ├── main.py              # FastAPI entrypoint
│   ├── db.py                # MongoDB connection logic
│   ├── pinecone_utils.py    # Pinecone vector search logic
│   └── ...                  # LLM/chain parsing, routes
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx                   # Main dashboard page (Next.js)
│   │   │   ├── components/
│   │   │   │   └── AnalyticsDashboard.jsx # Dashboard analytics and charts
│   │   ├── lib/
│   │   │   └── api.js                     # All frontend API calls
│   │   └── ...                            # Styles, layouts, assets
│   └── ...
├── .env                 # Env vars for API keys, DB, etc.
├── README.md            # This file!
└── ...
🏁 How It Works
User enters an expense in chat (frontend).

Frontend POSTs entry to /parse_expense endpoint (FastAPI backend).

Backend:

Calls the local LLM chain to extract item, amount, category.

Stores parsed result in MongoDB.

(Coming up) Generates vector embedding and stores in Pinecone for semantic search.

Frontend pulls expenses and analytics from backend for dashboards/charts.

✨ Current UI & API Overview
Frontend (Next.js):
Dashboard: Modern, dark, analytics-first UI with charts, category splits, and recent expense list.

Add Expense: Smart textarea for natural language input.

Charts: Bar and Pie (with anti-cropping fix) using Recharts.

Sidebar Navigation: Icons for Dashboard, Transactions, Analytics, Budget, Goals.

Backend (FastAPI):
/parse_expense: POST, takes natural language, returns parsed info and saves it.

/expenses: GET, returns all expenses.

/analytics/category: GET, returns category-wise totals.

/analytics/monthly: GET, returns month-wise totals.

/analytics/total: GET, returns total spending.

/query_expenses: GET, (coming up) semantic search for expenses.

🛠️ Running Locally
1. Backend

bash
Copy
Edit
cd backend
python -m venv venv && source venv/bin/activate  # or activate for Windows
pip install -r requirements.txt
export MONGO_URI=...
export PINECONE_API_KEY=...
uvicorn main:app --reload
2. Frontend

bash
Copy
Edit
cd frontend
npm install
npm run dev
# Visit http://localhost:3000
🔑 Environment Variables
MONGO_URI — Your MongoDB Atlas connection string

PINECONE_API_KEY — Your Pinecone vector DB API key

GROQ_API_KEY or HF/other — For LLM access (if cloud model used)

(Others as needed)

🧠 Current Model/Chain
Local LLM (e.g., flan-t5-small or Falcon) via Transformers or ONNX, optimized for speed.

Custom prompt to extract items/amounts/categories from arbitrary chat input.

📊 Sample API Calls
Add an expense:

bash
Copy
Edit
curl -X POST http://localhost:8000/parse_expense -H "Content-Type: application/json" -d '{"entry":"Spent 500 on lunch"}'
Get all expenses:

bash
Copy
Edit
curl http://localhost:8000/expenses
🎨 Screenshots
Paste UI screenshots here!
Showcase your dashboard, charts, and input UX.

🚦 What’s Next (Planned Updates)
Backend
 Enable Semantic Search:
Integrate Pinecone for /query_expenses (search with meaning, e.g., “snacks last week”).

 Advanced Model Inference:
Switch to ONNX/TensorRT for blazing-fast, GPU-accelerated parsing.

 Model Improvement:
Experiment with better extraction LLMs or hybrid (rules+AI) pipelines.

 API Security:
Auth, rate-limiting, user separation (optional).

Frontend
 Analytics Expansion:
Add more filters, trends, and predictive insights (charts over time, budget goals, breakdowns).

 Full Transaction Table:
Interactive, searchable, paginated expense table (not just recent).

 UI Polish:
More animations, color themes, mobile responsiveness, onboarding tips.

 Semantic Search Bar:
Enter queries like “food in June” and see smart results.

DevOps
 Dockerize Everything:
Full local deployment, single-command spinup.

 CI/CD Pipeline:
GitHub Actions for auto-testing and deploy.

 Free Demo Deploy:
Host backend (Render.com) + frontend (Vercel) for public preview.

💡 Contributing
PRs welcome!

Open an issue or feature request.

Fork, branch, and PR!

👤 Author
Sabik Aftahee
Based in CUET. Contact: [Your email/LinkedIn]
Researcher, AI/ML/NLP enthusiast, full-stack developer.

📚 License
MIT (or your choice).

