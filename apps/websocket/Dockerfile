# Node.js WebSocket server
FROM node:23.5.0-alpine AS builder
WORKDIR /app
COPY ./package.json ./pnpm-lock.yaml ./pnpm-workspace.yaml ./turbo.json ./
COPY packages ./packages
COPY apps/websocket ./apps/websocket
# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN cd apps/websocket && pnpm install
RUN pnpm --filter packages/db prisma:generate
RUN pnpm --filter ./apps/websocket build

FROM node:23.5.0-alpine AS runner
WORKDIR /app
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=builder /app/apps/websocket ./apps/websocket
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/node_modules ./node_modules
RUN npm install -g pnpm ts-node typescript
WORKDIR /app/packages/db
RUN npx prisma generate
WORKDIR /app/apps/websocket
ENV NODE_ENV=development
EXPOSE 8080
CMD ["npx", "ts-node", "src/index.ts"]
