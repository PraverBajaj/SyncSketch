#!/bin/bash

# Optimized deployment for small EC2 instances

echo "🚀 Starting SyncSketch deployment for small instances..."

# Add swap space for small instances
echo "💾 Adding swap space..."
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Update system
echo "📦 Updating system packages..."
sudo apt update

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

# Install Git
echo "📥 Installing Git..."
sudo apt install git -y

# Configure Docker for low memory
echo "⚙️ Optimizing Docker for small instances..."
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json > /dev/null <<EOF
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2"
}
EOF

sudo systemctl restart docker

echo "✅ Small instance setup complete!"
echo ""
echo "⚠️  Important for small instances:"
echo "   - Build process may take 10-15 minutes"
echo "   - Use: docker-compose -f docker-compose.small.yml up -d"
echo "   - Monitor with: docker stats"
echo ""
echo "Next steps:"
echo "1. Clone your repository"
echo "2. Update DATABASE_URL in docker-compose.small.yml"
echo "3. Build with: docker-compose -f docker-compose.small.yml build"
echo "4. Deploy with: docker-compose -f docker-compose.small.yml up -d"