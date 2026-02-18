# ethd-2026

Basic Next.js + TypeScript scaffold with plaintext file-based login and global text-file posts.

## Run

1. `npm install`
2. `npm run dev`
3. Open:
   - `http://localhost:3000/login`
   - `http://localhost:3000/posts`

## Current auth behavior

- Users are stored in `data/users.txt` as `username:password` (plain text).
- Login sets an `auth_user` cookie.
- Auth state helper (`loggedIn` / `not logged in`) is in `lib/session.ts` and shown in layout/login UI.

## Current post behavior

- Posts are stored globally in `data/posts.txt` (one JSON post per line).
- Fields: `id`, `poster`, `header`, `content`, `createdAt`.
- Posting is open and not gated by login.

## Folder intent

- `models/`: pure data shapes and constructors (`User`, `Post`).
- `lib/`: operational logic (file stores, auth/session helpers).

## APIs

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/status`
- `GET /api/posts`
- `POST /api/posts`
