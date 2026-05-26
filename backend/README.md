# AI Gatekeeper Backend

A clean Node.js + Express backend starter for an "AI Gatekeeper" system.

## Folder Structure

```
backend/
  src/
    middleware/   # Custom Express middleware
    routes/       # Route handlers (API endpoints)
    tools/        # Utility/helper functions
    policies/     # Access control and AI policies
    logs/         # Log files and logging utilities
    services/     # Business logic and integrations
    app.js        # Main Express app setup
    server.js     # Server entry point
```

## Features
- Express server with ES modules
- Security best practices (helmet, cors)
- Logging (morgan)
- Nodemon for development
- Basic health check route
- Beginner-friendly code with comments

## Setup Instructions

1. **Install dependencies:**
   ```sh
   cd backend
   npm install
   ```
2. **Run in development mode (with nodemon):**
   ```sh
   npm run dev
   ```
3. **Run in production mode:**
   ```sh
   npm start
   ```
4. **Test health route:**
   Visit [http://localhost:3000/health](http://localhost:3000/health)

---

**Folder Purpose:**
- `middleware/`: Custom Express middleware (e.g., authentication, logging)
- `routes/`: API route handlers
- `tools/`: Utility/helper functions
- `policies/`: Access control and AI policies
- `logs/`: Log files and logging utilities
- `services/`: Business logic and integrations

---

**Security Packages Used:**
- [helmet](https://www.npmjs.com/package/helmet): Sets HTTP headers for security
- [cors](https://www.npmjs.com/package/cors): Enables Cross-Origin Resource Sharing

---

**Next Steps:**
- Add your own middleware, routes, tools, policies, and services as needed.
