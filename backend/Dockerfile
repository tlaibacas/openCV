FROM node:24-alpine AS builder

WORKDIR /app
COPY package.json pnpm-workspace.yaml ./
RUN corepack enable && pnpm install

COPY . .

ENV CI=true

RUN pnpm generate
RUN pnpm build
RUN rm -rf node_modules
RUN pnpm install --prod

FROM node:24-alpine AS runner

WORKDIR /app

RUN corepack enable

COPY --from=builder /app/package.json /app/pnpm-workspace.yaml ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env* ./
EXPOSE 1111
CMD ["pnpm", "start"]