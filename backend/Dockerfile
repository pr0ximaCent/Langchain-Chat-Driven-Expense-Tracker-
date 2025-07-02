# Use official Python slim image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy dependencies and install
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy source code
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Launch server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
