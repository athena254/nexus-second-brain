# NEXUS Second Brain - Deployment Guide

## Quick Deploy to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Add NEXUS Second Brain"
gh repo create nexus-second-brain --public --source=. --description "AI-powered second brain"
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to vercel.com
2. Import from GitHub
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
   - `GROQ_API_KEY` = your Groq API key
4. Deploy!

### 3. Supabase Setup
1. Create project at supabase.com
2. Run `supabase/schema.sql` in SQL Editor
3. Get URL and keys from Settings → API

### 4. Groq Setup (Free AI)
1. Go to console.groq.com
2. Create API key
3. Free tier: 30 requests/minute

## Features
- ⚡ Capture (Text/URL/File/Voice/Image)
- 🔍 Search (Semantic/Exact/AI)
- 🕸️ Knowledge Graph (D3.js)
- 💬 AI Chat (Groq Llama)
- 📓 Notebooks
- 📑 Daily Digest
