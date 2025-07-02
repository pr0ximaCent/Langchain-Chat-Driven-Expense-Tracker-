## FinChain: The Chat-Driven Expense Tracker (Full Stack · Chatbot · NLP Analytics · Pinecone Semantic Search · FAST API)


**Imagine:** What if you could track and analyze your expenses just by _chatting in your own language_? No clunky dropdowns, no boring forms, no explicit category selection. Just say what you spent money on—**in any language, any style**—{Type “Spent 670 on burgers today”, “বার্গার খাইসি ১০০০ টাকা দিয়া”, or “Uber ride last night: 450”—FinChain extracts item, amount, and category, all powered by an LLM-based NLP backend] and FinChain’s AI does the rest: parses, extracts, categorizes, and gives you beautiful analytics. No more "finance apps" that you quit after two weeks. This is expense tracking, re-invented for real people.

---
## 📷 Attachments
![Dashboard](https://github.com/user-attachments/assets/81c77951-4769-477c-9448-dd35bcbb8945)


![Spending Categories](https://github.com/user-attachments/assets/d7e07ea9-0803-4953-b370-765bba5f5443)
![Transaction Reports](https://github.com/user-attachments/assets/3b134dda-ab24-4aa4-bac6-88913e092723)



## ✨ Features

- **Chat Your Expenses, Any Language:**  
  Type _“Spent 670 on burgers today”_, _“বার্গার খাইসি ১০০০ টাকা দিয়া”_, or _“Uber ride last night: 450”_—FinChain extracts item, amount, and category, all powered by an LLM-based NLP backend.
- **No Manual Categorization:**  
  You never have to pick categories, tags, or fill in forms. FinChain understands your text, auto-categorizes, and keeps learning.
- **Full-Stack Power:**
  - **Backend:** FastAPI (Python), async REST, MongoDB (expense storage), Pinecone (vector/semantic search for future AI queries).
  - **Frontend:** Next.js (React), Tailwind, Recharts, Lucide icons—pixel-perfect, modern dashboard UI.
  - **AI/NLP:** Hugging Face Transformers, LangChain, ONNX+TensorRT (GPU optimized inference coming soon!)
- **Beautiful Analytics:**
  - Auto-generated pie/bar charts, totals, monthly breakdowns.
  - “Latest transactions” view with full NLP parsing results.
  - Filter, search, and semantic queries planned.
 
## 🛠️ Tech Stack

### 🔧 Backend
- **FastAPI** (Python)
- **LangChain** (LLM)
- **MongoDB**
- **Pinecone** (Vector DB for semantic search)
- **Docker** (for deployment)

### 🖥️ Frontend
- **Next.js** (React)
- **Tailwind CSS**
- **Recharts** (for charts & graphs)

### 📡 APIs
- **RESTful endpoints**:
  - `/parse_expense`
  - `/expenses`
  - `/analytics/category`
  - `/analytics/monthly`
  - `/analytics/total`
  - `/query_expenses`

### 🤖 NLP / LLMs
- Current: **Groq / Flan-T5 / HuggingFace Transformers**
- Future: **ONNX** / **TensorRT** optimized **local inference**

### 🚀 Deployment
- **Docker-ready**
- Deploy backend to **Render.com**
- Deploy frontend to **Vercel**


---

## Requirements

Before running or deploying FinChain, ensure you have the following prerequisites and minimum hardware:

### Hardware Requirements

- **CPU**: Any modern 64-bit processor (Intel/AMD/Apple Silicon)
- **RAM**: At least **4 GB** (8 GB+ recommended for smoother development, especially if running backend + frontend + Docker locally)
- **Disk Space**: Minimum **2 GB** free for dependencies, source code, and Docker images
- **Internet**: Required for API calls (Pinecone, MongoDB Atlas, LLM providers) and NPM/Python installations
- **GPU**: *Not required* unless you want to run heavy ML models locally (all LLM/NLP is handled via APIs by default)

### Backend (FastAPI)

- **Python 3.9+** (preferably 3.10)
- **pip** (Python package installer)
- **MongoDB Atlas** database (connection URI in `.env`)
- **Pinecone** account and API key
- **Docker** (optional, for containerized deployment)
- **Git** (to clone or pull the repository)
- **Uvicorn** (installed via requirements.txt)

#### Python Dependencies

Install with:
```bash
pip install -r requirements.txt
```
---
## 💡 Why FinChain?

Traditional expense trackers die because:

- You have to **explicitly categorize** every entry.
- The UI/UX is boring, repetitive, and forces you to adapt.
- Multi-language, unstructured chat input is _never_ supported.

**FinChain flips this:**

- _You_ write in your own words, any language.
- The AI handles parsing, categorizing, and presenting analytics.
- You stay consistent, get value, and enjoy the process!

---


## 🧠 How it Works

### 1. **NLP-Driven Parsing**

- **Input:** You type _any expense in any language_.
- **LLM Chain:**  
  The backend uses Hugging Face Transformers (e.g., flan-t5-small, and upgradable) through LangChain, and runs inference (soon via ONNX+TensorRT for speed) to extract:
  - **item:** What did you spend on?
  - **amount:** How much?
  - **category:** What type of expense? (Food, Transport, Shopping, etc—learned by the AI).
- **Storage:**  
  Parsed results and original text are stored in **MongoDB** (fully queryable, exportable).
- **Analytics:**  
  Realtime analytics and charts are auto-generated from the parsed/categorized data.
- **(Planned) Semantic Search:**  
  Pinecone vector DB integration allows “fuzzy” AI queries like _“Show me all Uber rides this year”_ even if your input text never matched “Uber” exactly.

---

## ⚙️ Stack

| Layer    | Tech                                                |
| -------- | --------------------------------------------------- |
| Backend  | FastAPI (Python, async REST)                        |
| AI/NLP   | Hugging Face Transformers, LangChain, ONNX/TensorRT |
| Storage  | MongoDB (expenses), Pinecone (vector search)        |
| Frontend | Next.js (React), Tailwind, Recharts, Lucide         |
| Deploy   | Docker, Vercel/Render (planned)                     |

---

## 🚦 Current Status

- [x] **Fully working backend:** Expense parsing via NLP, saving to MongoDB.
- [x] **Modern dashboard UI:** Analytics, charts, and transaction feed.
- [x] **No manual categories:** LLM auto-categorizes entries, even in Bangla.
- [x] **All APIs connected:** Frontend-backend integration complete.
- [x] **Data visualizations:** Pie/bar charts, summary cards.
- [x] **NLP extraction is language-agnostic.**
- [x] **Pinecone and ONNX/TensorRT groundwork complete.**
- [ ] **(Next Up)** Semantic search, budget/goal modules, more advanced analytics.

---

## 📅 What’s Next

- **ONNX/TensorRT** for GPU-accelerated, low-latency inference.
- **Budget and goal setting**: set, track, and visualize financial targets.
- **Semantic AI Search**: Ask “How much did I spend on food in June?”—get an answer instantly.
- **Auto-learning categories**: Model adapts to your spending style.
- **Mobile-first responsive UI.**
- **Cloud deployment demo (Render/Vercel).**
- **Export, sharing, multi-user support.**

---

## 🚀 Getting Started

1. **Clone the repo & install:**

   ```bash
   git clone https://github.com/yourusername/finchain.git
   cd finchain
   ```

2. **Backend:**

   - Install dependencies:
     ```bash
     cd backend
     python -m venv venv
     source venv/bin/activate  # or venv\Scripts\activate
     pip install -r requirements.txt
     ```
   - Set up your `.env`:
     ```
     MONGO_URI=mongodb+srv://...       # Your MongoDB Atlas URI
     GROQ_API_KEY=...                  # Or Hugging Face key for LLM inference
     PINECONE_API_KEY=...              # (Optional for semantic search)
     ```
   - Run FastAPI:
     ```bash
     uvicorn main:app --reload
     ```

3. **Frontend:**
   - Install dependencies:
     ```bash
     cd frontend
     npm install
     ```
   - Run Next.js app:
     ```bash
     npm run dev
     ```
   - Go to [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Project Structure
```
finchain/
├── backend/
│   ├── main.py                # FastAPI entrypoint
│   ├── db.py                  # MongoDB functions
│   ├── nlp.py                 # LLM inference logic (LangChain, etc)
│   ├── pinecone.py            # Vector DB sync
│   └── ...                    # More modules
│
├── frontend/
│   ├── src/app/
│   │   ├── page.tsx           # Dashboard page (all React logic)
│   │   └── components/
│   │       └── AnalyticsDashboard.jsx
│   ├── lib/
│   │   └── api.js             # API helpers for frontend-backend
│   ├── public/
│   │   └── ...                # Static files, favicon, etc
│   └── ...                    # Next.js setup
│
├── README.md
└── ...
```
---

## 🧑‍💻 Contributing

PRs welcome! See `CONTRIBUTING.md` or open an issue.

---

## 📜 License

MIT

---

## 🏆 Credits

- [Sabik Aftahee](https://github.com/synuso) (Lead dev, NLP/backend/frontend)
- [OpenAI, Hugging Face, Pinecone](https://huggingface.co) (AI/infra)

---



**FinChain — Track expenses the way _you_ actually talk. Stop categorizing. Start understanding.**
