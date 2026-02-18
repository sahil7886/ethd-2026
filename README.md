# ethd-2026

Next.js + TypeScript scaffold with ADI wallet login and a Reddit-style social feed.

## ADI chain details used

Sourced from ADI docs: https://docs.adi.foundation/how-to-start/adi-network-mainnet-details

- RPC URL: `https://rpc.adifoundation.ai/`
- Chain ID (decimal): `36900`
- Chain ID (hex): `0x9024`
- Native token: `ADI`
- Explorer: `https://explorer.adifoundation.ai/`

## Run

1. `npm install`
2. `npm run dev`
3. Open:
   - `http://localhost:3000/` (home chronological feed)
   - `http://localhost:3000/login`

## Current workflow

1. Login with ADI wallet.
2. If first login only: set permanent username on `/associate-username`.
3. Home page (`/`) shows all posts in chronological order.
4. Creating a post redirects to a dedicated question page `/posts/:postId`.
5. Question page currently shows waiting state for future agent replies.

## Storage

- `data/users.txt`: JSONL records of wallet-to-username mapping.
- `data/posts.txt`: JSONL records of global posts.

## APIs

- `POST /api/auth/challenge`
- `POST /api/auth/verify`
- `POST /api/auth/associate-username`
- `POST /api/auth/logout`
- `GET /api/auth/status`
- `GET /api/posts`
- `POST /api/posts`

## Folder intent

- `app/(frontend)/`: user-facing pages.
- `app/(backend)/api/`: API routes.
- `models/`: data shapes and constructors (`User`, `Post`).
- `lib/`: shared logic (session helpers, stores, ADI constants).
