FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# The port must be set by the PORT environment variable in Cloud Run
ENV PORT=8000

# Remove the --reload flag for production
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "${PORT}"]