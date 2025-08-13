# Vercel Setup Script for PolyNode Frontend (Windows PowerShell)
# This script helps set up the initial Vercel configuration

Write-Host "🚀 Setting up Vercel deployment for PolyNode Frontend..." -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "frontend/package.json")) {
    Write-Host "❌ Error: Please run this script from the project root directory" -ForegroundColor Red
    exit 1
}

# Check if Vercel CLI is installed
try {
    $vercelVersion = vercel --version 2>$null
    if ($vercelVersion) {
        Write-Host "✅ Vercel CLI already installed" -ForegroundColor Green
    }
} catch {
    Write-Host "📦 Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel@latest
}

# Navigate to frontend directory
Set-Location frontend

Write-Host "🔧 Initializing Vercel project..." -ForegroundColor Yellow
Write-Host "Please follow the prompts to configure your Vercel project:" -ForegroundColor Cyan
Write-Host "- Select 'Link to existing project' if you already have one" -ForegroundColor Cyan
Write-Host "- Or create a new project" -ForegroundColor Cyan
Write-Host "- Make sure to select the correct framework (Next.js)" -ForegroundColor Cyan

vercel

Write-Host ""
Write-Host "🎉 Vercel setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Copy your Vercel project ID from the output above" -ForegroundColor White
Write-Host "2. Go to https://vercel.com/account/tokens to create an API token" -ForegroundColor White
Write-Host "3. Add these as GitHub secrets:" -ForegroundColor White
Write-Host "   - VERCEL_TOKEN" -ForegroundColor White
Write-Host "   - VERCEL_PROJECT_ID" -ForegroundColor White
Write-Host "   - VERCEL_ORG_ID" -ForegroundColor White
Write-Host ""
Write-Host "4. Push your changes to trigger the CI/CD pipeline" -ForegroundColor White
Write-Host ""
Write-Host "For detailed setup instructions, see: docs/deployment/vercel-setup.md" -ForegroundColor Cyan

# Return to root directory
Set-Location ..
