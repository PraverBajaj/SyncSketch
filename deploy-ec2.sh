#!/bin/bash

# EC2 Production Deployment Script for SyncSketch

echo "🚀 Starting SyncSketch production deployment..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker
echo "🐳 Installing Docker..."
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu

# Install Docker Compose
echo "🔧 Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Git if not present
echo "📥 Installing Git..."
sudo apt install git -y

echo "✅ Prerequisites installed successfully!"
echo ""
echo "Next steps:"
echo "1. Clone your repository: git clone <your-repo-url>"
echo "2. Update DATABASE_URL in docker-compose.prod.yml"
echo "3. Update email in docker-compose.prod.yml (replace praver@example.com)"
echo "4. Run: docker-compose -f docker-compose.prod.yml up -d"
echo ""
echo "🌐 Your app will be available at:"
echo "   Frontend: https://syncsketch.praverbajaj.tech"
echo "   Backend API: https://api.syncsketch.praverbajaj.tech"
echo "   WebSocket: wss://ws.syncsketch.praverbajaj.tech"