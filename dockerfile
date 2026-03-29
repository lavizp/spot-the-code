# 1. Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# 2. Copy the workspace config (CRITICAL for "catalog:")
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package.json ./

# 3. Install dependencies using pnpm
RUN pnpm install --frozen-lockfile