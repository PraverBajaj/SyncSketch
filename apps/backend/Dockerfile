# apps/backend/Dockerfile
# Node.js backend
FROM node:23.5.0-alpine AS builder
WORKDIR /app
COPY ./package.json ./pnpm-lock.yaml ./pnpm-workspace.yaml ./turbo.json ./
COPY packages ./packages
COPY apps/backend ./apps/backend
# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN cd apps/backend && pnpm install
RUN pnpm --filter packages/db prisma:generate
RUN pnpm --filter ./apps/backend build

FROM node:23.5.0-alpine AS runner
WORKDIR /app
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=builder /app/apps/backend ./apps/backend
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/node_modules ./node_modules
RUN npm install -g pnpm ts-node typescript
WORKDIR /app/packages/db
RUN npx prisma generate
WORKDIR /app/apps/backend
ENV NODE_ENV=development
EXPOSE 3009
CMD ["npx", "ts-node", "src/index.ts"]
