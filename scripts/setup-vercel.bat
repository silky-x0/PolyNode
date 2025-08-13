@echo off
REM Vercel Setup Script for PolyNode Frontend (Windows Batch)
REM This script helps set up the initial Vercel configuration

echo 🚀 Setting up Vercel deployment for PolyNode Frontend...

REM Check if we're in the right directory
if not exist "frontend\package.json" (
    echo ❌ Error: Please run this script from the project root directory
    pause
    exit /b 1
)

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📦 Installing Vercel CLI...
    npm install -g vercel@latest
) else (
    echo ✅ Vercel CLI already installed
)

REM Navigate to frontend directory
cd frontend

echo 🔧 Initializing Vercel project...
echo Please follow the prompts to configure your Vercel project:
echo - Select 'Link to existing project' if you already have one
echo - Or create a new project
echo - Make sure to select the correct framework (Next.js)

vercel

echo.
echo 🎉 Vercel setup complete!
echo.
echo Next steps:
echo 1. Copy your Vercel project ID from the output above
echo 2. Go to https://vercel.com/account/tokens to create an API token
echo 3. Add these as GitHub secrets:
echo    - VERCEL_TOKEN
echo    - VERCEL_PROJECT_ID
echo    - VERCEL_ORG_ID
echo.
echo 4. Push your changes to trigger the CI/CD pipeline
echo.
echo For detailed setup instructions, see: docs/deployment/vercel-setup.md

REM Return to root directory
cd ..

pause
