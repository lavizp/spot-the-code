FROM oven/bun:latest AS base
WORKDIR /app

# 1. Install dependencies
# We copy everything first because monorepo builds need access to 
# package.json files in apps/ and packages/ to link correctly
COPY . .
RUN bun install

# 2. Build the API
# Better-T-Stack uses "api" or "server" as the folder name. 
# Your log shows "@spot-the-code/api", so we filter for that.
ENV NODE_ENV=production
RUN bun run build --filter=@spot-the-code/api

# 3. Runner Stage
FROM oven/bun:slim AS runner
WORKDIR /app

# Set environment
ENV NODE_ENV=production
ENV PORT=8080

# Copy the built files and the necessary production modules
# Note: Adjust 'dist' path if your build output goes elsewhere
COPY --from=base /app/apps/api/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/apps/api/package.json .

EXPOSE 8080

# Start the server (Using Bun for better performance)
CMD ["bun", "dist/index.js"]