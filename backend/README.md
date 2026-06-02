# AI Gatekeeper Backend

Node.js + Express backend for an AI-driven file access gatekeeper.

## What It Does

The backend accepts natural language prompts, asks a local LLM (Ollama) to convert the prompt into a JSON action, then executes the action through security checks.

Supported actions:
- `READ`
- `WRITE`
- `DELETE`

Each request includes:
- AI decision (`action`, `filePath`, optional `content`)
- Risk score and level (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`)
- Final gatekeeper result (`ALLOW` or `DENY`)

## Key Features

- AI route at `POST /api/ai/chat` backed by Ollama (`qwen3` model)
- Secure file operations with policy checks:
   - Path traversal blocking (`..`)
   - Blocked path protection (`.env`, `secret.txt`)
   - Allowed write/delete path control (`tmp`)
- Risk engine with scored output and reasons
- Request logging in `src/logs/logs.json`
- Recent logs API at `GET /api/files/logs`
- Optional quarantine flow on repeated suspicious activity

## Project Structure

```
backend/
   src/
      app.js
      server.js
      routes/
         aiRoutes.js
         fileRoutes.js
      tools/
         readFile.js
         writeFile.js
         deleteFile.js
      services/
         ollamaService.js
         riskEngine.js
         anomalyDetector.js
         quarantine.js
         logger.js
      policies/
         policies.json
      logs/
         logs.json
```

## API Endpoints

### AI Gatekeeper

- `POST /api/ai/chat`
   - Body: `{ "prompt": "read sample.txt" }`
   - Returns: decision, risk, and execution result

### Direct File Routes

- `POST /api/files/read-file`
- `POST /api/files/write-file`
- `DELETE /api/files/delete-file`
- `GET /api/files/logs`

## Setup

1. Install dependencies

```sh
cd backend
npm install
```

2. Create `.env` in `backend/`:

```env
PORT=3000
```

3. Start Ollama locally (default URL: `http://localhost:11434`) and ensure `qwen3` model is available.

4. Run backend

```sh
npm run dev
```

## Notes

- Frontend default origin expected by backend CORS: `http://localhost:5173`
- Logs are currently file-based and intended for local development
