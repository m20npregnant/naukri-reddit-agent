# Naukri Reddit Insights Agent

An AI-powered campaign intelligence tool that crawls Reddit career conversations, extracts deep cultural insights, and generates production-ready campaign copy for Naukri.com.

## 5-Step Pipeline

1. **Surface Scan** — Crawls career subreddits for specific, granular conversations (not generic summaries)
2. **Deep Dive** — Synthesizes threads into conversation clusters with named entities, verbatim language, and tensions
3. **Strategic Insights** — Extracts psychographics, white spaces, cultural currents, and strategic tensions
4. **Campaign Buckets** — Builds campaign platforms rooted in human truths with Reddit proof
5. **Creative Output** — Generates production-ready copy with hooks, visual direction, and CTAs

## Deploy to Vercel (Free) — 3 Steps

### Prerequisites
- A [GitHub](https://github.com) account
- An [Anthropic API key](https://console.anthropic.com) (free credits on signup)

### Step 1: Push to GitHub

```bash
# Clone or download this project, then:
cd naukri-reddit-agent
git init
git add .
git commit -m "Initial commit"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/naukri-reddit-agent.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **"Add New Project"**
3. Import your `naukri-reddit-agent` repo
4. Framework Preset: **Vite** (should auto-detect)
5. Click **Deploy**

### Step 3: Add your API Key

1. In Vercel dashboard, go to your project → **Settings** → **Environment Variables**
2. Add:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** your API key from console.anthropic.com
3. Click **Save**
4. Go to **Deployments** → click the three dots on latest deploy → **Redeploy**

Your agent is now live at `https://your-project.vercel.app` 🚀

## Local Development

```bash
npm install

# Create .env.local with your API key
echo "ANTHROPIC_API_KEY=sk-ant-xxxxx" > .env.local

# Install Vercel CLI for local serverless functions
npm i -g vercel

# Run locally (this starts both the Vite dev server and serverless functions)
vercel dev
```

## Project Structure

```
naukri-reddit-agent/
├── api/
│   └── claude.js          # Serverless function — proxies requests to Claude API
├── src/
│   ├── App.jsx            # Main agent UI + AI pipeline
│   └── main.jsx           # React entry point
├── index.html             # HTML entry
├── package.json
├── vite.config.js
├── vercel.json            # Vercel config (60s function timeout)
└── README.md
```

## How It Works

The frontend makes requests to `/api/claude` (a Vercel serverless function). This function securely attaches your API key and forwards the request to Anthropic's API. This way your API key is never exposed in the browser.

## Cost

- **Vercel hosting:** Free tier (includes 60s function timeout with Fluid Compute)
- **Anthropic API:** Pay-per-use (~$0.50-1.00 per full pipeline run using Claude Sonnet)
