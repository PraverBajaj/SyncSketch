#!/bin/bash
echo "Waiting for database to be ready..."

# Wait for database to be available
until nc -z db 5432; do
  echo "Waiting for database..."
  sleep 2
done

echo "Database is ready! Starting websocket application..."
cd /app/apps/websocket
exec npx ts-node src/index.ts