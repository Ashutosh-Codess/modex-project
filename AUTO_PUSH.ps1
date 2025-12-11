# Auto Push Script - Run after creating GitHub repo
# Usage: .\AUTO_PUSH.ps1

Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Green

# Check if remote exists
$remote = git remote get-url origin 2>$null
if (-not $remote) {
    Write-Host "❌ Remote not found. Adding remote..." -ForegroundColor Yellow
    git remote add origin https://github.com/Ashutosh-Codess/modex-project.git
}

# Push to GitHub
Write-Host "📤 Pushing to origin/main..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "`n🌐 Next: Deploy to Vercel at https://vercel.com" -ForegroundColor Magenta
} else {
    Write-Host "❌ Push failed. Make sure:" -ForegroundColor Red
    Write-Host "   1. Repository exists at https://github.com/Ashutosh-Codess/modex-project" -ForegroundColor Yellow
    Write-Host "   2. You're authenticated (use Personal Access Token)" -ForegroundColor Yellow
    Write-Host "`nSee PUSH_AND_DEPLOY.md for help" -ForegroundColor Cyan
}

