# apps/frontend/Dockerfile
# Next.js frontend
FROM node:23.5.0-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages ./packages
COPY apps/frontend ./apps/frontend

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN cd apps/frontend && pnpm install
RUN pnpm --filter ./apps/frontend build

FROM node:23.5.0-alpine AS runner
WORKDIR /app
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=builder /app/apps/frontend ./apps/frontend
COPY --from=builder /app/apps/frontend/.next ./.next
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/node_modules ./node_modules
RUN npm install -g pnpm
WORKDIR /app/apps/frontend
ENV NODE_ENV=development
EXPOSE 3000
CMD ["pnpm", "dev"]
