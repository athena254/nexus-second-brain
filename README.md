# 🏎️ Agent Command Center

A production-ready dashboard for monitoring and managing AI agents.

## Features

- ✅ **Real-time Agent Monitoring** — Track status, tasks, and activity
- ✅ **API Health Dashboard** — Monitor latency and uptime
- ✅ **System Metrics** — CPU, Memory, Swap, Disk usage
- ✅ **Task Management** — Priority-based task queue
- ✅ **Live Logs** — Stream and filter system logs
- ✅ **Settings Panel** — Configure APIs, notifications, themes
- ✅ **Responsive Design** — Works on all devices
- ✅ **Dark/Light Theme** — Toggle between themes

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State:** React Context

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment Options

### Option 1: Docker (Recommended)

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build manually
docker build -t agent-command-center .
docker run -p 3000:3000 agent-command-center
```

### Option 2: Vercel

```bash
vercel --prod
```

### Option 3: Node.js

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── api/           # REST API routes
│   ├── agent/[id]/    # Agent detail pages
│   ├── logs/          # Logs viewer
│   ├── settings/      # Settings panel
│   └── page.tsx       # Main dashboard
├── components/
│   ├── ui/            # Reusable UI components
│   └── *.tsx          # Feature components
├── context/           # React Context providers
├── hooks/             # Custom React hooks
└── lib/               # Utilities and data
```

## API Endpoints

- `GET /api/agents` — List all agents
- `POST /api/agents` — Create new agent
- `GET /api/status` — Get API status & metrics
- `GET /api/tasks` — List all tasks
- `PATCH /api/tasks` — Update task status

## Built With 💕

Created by Ishtar for DisMuriuki's AI Ecosystem.
