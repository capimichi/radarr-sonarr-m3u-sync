FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies including Node.js and npm
RUN apt-get update && apt-get install -y \
    gcc \
    git \
    curl \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Install Node.js dependencies
RUN npm install

# Run npm build
RUN npm run build

# Create dist directory if it doesn't exist
RUN mkdir -p dist

# Expose port
EXPOSE 8958

# Run the application
CMD ["python", "-m", "radarrsonarrm3usync.api"]
