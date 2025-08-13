#!/bin/bash

# Vercel Setup Script for PolyNode Frontend
# This script helps set up the initial Vercel configuration

echo "🚀 Setting up Vercel deployment for PolyNode Frontend..."

# Check if we're in the right directory
if [ ! -f "frontend/package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel@latest
else
    echo "✅ Vercel CLI already installed"
fi

# Navigate to frontend directory
cd frontend

echo "🔧 Initializing Vercel project..."
echo "Please follow the prompts to configure your Vercel project:"
echo "- Select 'Link to existing project' if you already have one"
echo "- Or create a new project"
echo "- Make sure to select the correct framework (Next.js)"

vercel

echo ""
echo "🎉 Vercel setup complete!"
echo ""
echo "Next steps:"
echo "1. Copy your Vercel project ID from the output above"
echo "2. Go to https://vercel.com/account/tokens to create an API token"
echo "3. Add these as GitHub secrets:"
echo "   - VERCEL_TOKEN"
echo "   - VERCEL_PROJECT_ID"
echo "   - VERCEL_ORG_ID"
echo ""
echo "4. Push your changes to trigger the CI/CD pipeline"
echo ""
echo "For detailed setup instructions, see: docs/deployment/vercel-setup.md"
