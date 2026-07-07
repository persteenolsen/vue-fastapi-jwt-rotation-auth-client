# Vue 3 + Pinia JWT Authentication Client (FastAPI Integration)

A Vue 3 frontend application demonstrating authentication using JWT access tokens and refresh token rotation

This project is designed as a companion client for a FastAPI backend implementing JWT authentication with refresh token rotation.

Last updated: 07-07-2026

---

## Features

- User login with JWT authentication
- Access token + refresh token handling
- Automatic token renewal via refresh endpoint
- Pinia state management for authentication state
- Form validation using VeeValidate + Yup
- Clean separation of API and state logic
- Integration-ready with FastAPI backend

---

## Tech Stack

- Vue 3 (frontend framework)
- Pinia (state management)
- Vite (dev server and build tool)
- Node.js 24.13.0
- VeeValidate (form validation)
- Yup (schema validation)
- ESLint (code quality)
- Volta (Node version management)
- Hosted on traditional web hosting (production deployment)

---

## Node Version Management (Volta)

This project uses Volta to ensure consistent Node.js versions.

### Install Node version

volta install node@24

### Pin project to Node version

volta pin node@24

### List installed Node versions

volta list node

---

## Project Setup

### 1. Install dependencies

npm install

---

### 2. Start development server

npm run dev

Frontend will be available at:

http://localhost:3000

---

### 3. Build for production

npm run build

---

### 4. Preview production build locally

npm run preview

Preview available at:

http://localhost:5050

---

## Backend Integration (FastAPI)

This frontend is designed to work with a FastAPI backend that provides:

- JWT access tokens
- Refresh Token Rotation
- Protected API routes
- SPA authentication endpoints

### Expected backend features:

- POST /token → login (access token)
- POST /tokens-spa → login (access + refresh tokens)
- POST /refresh-token-spa → refresh session
- GET /users/me → protected user endpoint

---

## Authentication Flow

This client implements JWT authentication with refresh token rotation:

1. User logs in with username and password
2. Backend returns:
   - Access token (short-lived)
   - Refresh token (longer-lived)
3. Access token is used for authenticated API requests
4. When access token expires:
   - Refresh token is sent to `/refresh-token-spa`
   - New access token (and refresh token) is returned
5. User stays logged in without re-authentication

---

## Security Notes

- Access tokens are short-lived
- Refresh tokens extend session without login
- Tokens are stored in client state (Pinia store)
- API requests include Authorization header with Bearer token

---

## Development Notes

- This project is intentionally kept simple to clearly demonstrate JWT authentication flow
- Focus is on learning authentication concepts, not enterprise-level security architecture
- Backend and frontend are decoupled for clarity and flexibility

---

## Future Improvements

- Store refresh token in HTTP-only cookies instead of client state
- Implement automatic token refresh interceptor (Axios middleware)
- Add persistent login (localStorage/session persistence)
- Add route guards for protected pages
- Improve error handling for expired sessions
- Add role-based access control (RBAC)
- Add unit tests for store and auth logic
- Add CI/CD pipeline for frontend builds

---

## Learning Purpose

This project was built to explore:

- JWT authentication in SPA applications
- Refresh token workflows
- Vue 3 + Pinia state management
- Frontend/backend separation
- Secure API communication patterns

---

## Author

Built by Per Olsen  
Frontend companion project for FastAPI JWT authentication system