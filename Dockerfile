# Build stage - Node.js
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files for Node.js dependencies
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy source code needed for build
COPY . .

# Run npm build
RUN npm run build

# Runtime stage - Python
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    git \
    curl \
    libxml2-dev \
    libxslt1-dev \
    zlib1g-dev \
    python3-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy build artifacts from Node.js stage
COPY --from=builder /app/dist ./dist

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8958

# Run the application
CMD ["python", "-m", "radarrsonarrm3usync.api"]
