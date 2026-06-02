# AI Gatekeeper Frontend

React + Vite dashboard for interacting with the AI Gatekeeper backend.

## Features

- Prompt input to send natural language file commands
- AI decision view (`action`, `path`)
- Risk assessment panel:
	- Risk score out of 100
	- Risk level color coding (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`)
	- Reason list
- Gatekeeper result summary (`ALLOW` or `DENY`)
- Logs table with latest operations
- Request counters:
	- Total requests
	- Allowed
	- Denied

## API Integration

The app calls these backend endpoints:

- `POST http://localhost:3000/api/ai/chat`
- `GET http://localhost:3000/api/files/logs`

## Setup

1. Install dependencies

```sh
cd frontend
npm install
```

2. Start dev server

```sh
npm run dev
```

3. Open app

- `http://localhost:5173`

## Notes

- Backend must be running on `http://localhost:3000`
- Ensure Ollama + model are available for AI command parsing
