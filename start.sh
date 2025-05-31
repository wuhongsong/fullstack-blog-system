#!/bin/bash
# Render.com 启动脚本
# 确保从正确的目录启动服务器

echo "Current directory: $(pwd)"
echo "Listing files:"
ls -la

echo "Checking server directory:"
ls -la server/

echo "Starting Node.js server..."
node server/server.js
