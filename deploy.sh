#!/bin/bash

echo "🚀 Starting deployment process..."

echo "📦 Installing frontend dependencies..."
cd frontend
npm install

echo "🔨 Building frontend..."
npm run build

echo "✅ Frontend build complete!"
echo ""
echo "📝 Next steps:"
echo "1. Push to GitHub:"
echo "   git add ."
echo "   git commit -m 'Deploy to production'"
echo "   git push origin main"
echo ""
echo "2. Deploy to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import repository: Ashutosh-Codess/modex-project"
echo "   - Root Directory: frontend"
echo "   - Build Command: npm run build"
echo "   - Output Directory: dist"
echo "   - Add env var: VITE_API_URL=https://your-backend-url"
echo ""
echo "3. Deploy backend to Railway/Render:"
echo "   - See DEPLOYMENT.md for details"

