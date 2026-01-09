#!/bin/bash

# Quick Deployment Setup Script
# This script helps prepare your project for Netlify & Vercel deployment

echo "🚀 uTools.online Deployment Setup"
echo "=================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "⚠️  Git repository not found. Initializing..."
    git init
    git add .
    git commit -m "Initial commit"
fi

# Check if files exist
echo "✅ Checking deployment configuration files..."

if [ -f "netlify.toml" ]; then
    echo "   ✓ netlify.toml found"
else
    echo "   ✗ netlify.toml missing"
fi

if [ -f "backend/vercel.json" ]; then
    echo "   ✓ backend/vercel.json found"
else
    echo "   ✗ backend/vercel.json missing"
fi

if [ -f ".env.production" ]; then
    echo "   ✓ .env.production found"
else
    echo "   ✗ .env.production missing"
fi

if [ -f "backend/.env.production" ]; then
    echo "   ✓ backend/.env.production found"
else
    echo "   ✗ backend/.env.production missing"
fi

echo ""
echo "📋 Deployment Checklist:"
echo "========================"
echo ""
echo "BEFORE DEPLOYING:"
echo ""
echo "Backend (Vercel):"
echo "  1. [ ] Create account at https://vercel.com"
echo "  2. [ ] Connect GitHub repository"
echo "  3. [ ] Select 'backend' as root directory"
echo "  4. [ ] Deploy the backend"
echo "  5. [ ] Copy your Vercel backend URL (https://your-project.vercel.app)"
echo ""
echo "Frontend (Netlify):"
echo "  1. [ ] Create account at https://netlify.com"
echo "  2. [ ] Connect GitHub repository"
echo "  3. [ ] Add environment variable:"
echo "         VITE_API_URL = https://your-vercel-backend-url.vercel.app"
echo "  4. [ ] Deploy the frontend"
echo ""
echo "AFTER DEPLOYING:"
echo "  1. [ ] Test backend health: curl https://your-backend.vercel.app/api/health"
echo "  2. [ ] Visit frontend: https://your-site.netlify.app"
echo "  3. [ ] Test API integration (e.g., Word to PDF converter)"
echo ""
echo "📚 Full guide available in: DEPLOYMENT_GUIDE.md"
echo ""
echo "🎉 Setup complete! Ready for deployment."
echo ""
