# Web App - Vercel Deployment

This `apps/web` package is a TanStack Start application configured for Server-Side Rendering (SSR) on Vercel using a manual Serverless Function approach.

## How it works

1.  **Build**: `vite build` generates:
    -   `dist/client`: Static assets (CSS, JS, images) served globally by Vercel's Edge Network.
    -   `dist/server`: The server-side code used by the SSR function.
2.  **Entry Point**: `api/vercel.js` acts as the Vercel Serverless Function entry point. It imports the server handler from `dist/server` and adapts the Node.js request/response to the TanStack Start server.
3.  **Routing**: `vercel.json` handles routing. It serves static assets directly and rewrites all other requests to the `/api/vercel` function for SSR.

## Deployment Steps

1.  **Push to Git**: Ensure your code is pushed to your remote repository.
2.  **Import Project**: Go to the Vercel Dashboard and click "Add New..." -> "Project". Import your repository.
3.  **Project Settings**:
    -   **Root Directory**: Edit this to `apps/web`.
    -   **Framework Preset**: Select `Vite`.
    -   **Build Command**: `vite build` (Default).
    -   **Output Directory**: `dist/client`. **Important**: Vercel needs to serve the static assets from here.
4.  **Environment Variables**:
    -   Add `VITE_API_URL`: The URL of your backend API (e.g., `https://api.your-domain.com`).
5.  **Deploy**: Click "Deploy".

## Local Development vs Production

-   **Development**: `bun dev` uses Vite's dev server with SSR support.
-   **Production**: The built application uses the Vercel Serverless Function defined in `api/vercel.js`.

## Files of Interest

-   `api/vercel.js`: The adapter connecting Vercel's request object to the TanStack Start app.
-   `vercel.json`: Configures rewrite rules to bypass the function for static assets.