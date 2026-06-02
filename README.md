# AI Gatekeeper

AI Gatekeeper is a full-stack project that uses an AI model to interpret natural language file commands and safely execute them through a policy-based security layer.

## Project Structure

```
ai-gatekeeper/
  backend/
  frontend/
```

## Core Flow

1. User enters a prompt in the frontend dashboard.
2. Frontend calls backend API: `POST /api/ai/chat`.
3. Backend asks Ollama to convert prompt into JSON action (`READ`, `WRITE`, `DELETE`).
4. Security checks run (path traversal, blocked paths, allowed paths, risk scoring).
5. Operation is allowed or denied, logged, and returned to the dashboard.

## Features

- AI-powered command parsing through Ollama
- Risk assessment with score and level
- Policy-based access control
- File operation logging
- React dashboard with request stats and logs table

## Tech Stack

- Frontend: React, Vite, Axios
- Backend: Node.js, Express
- AI Runtime: Ollama (`qwen3`)

## Quick Start

### 1. Start Backend

```sh
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:3000`.

### 2. Start Frontend

```sh
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

### 3. Ensure Ollama is Running

Make sure Ollama is running locally and the `qwen3` model is available.

## Main APIs

- `POST /api/ai/chat`
- `GET /api/files/logs`
- `POST /api/files/read-file`
- `POST /api/files/write-file`
- `DELETE /api/files/delete-file`

## Notes

- Do not commit secrets such as `.env` files.
- Keep write/delete operations restricted to safe directories (`tmp` by default).
