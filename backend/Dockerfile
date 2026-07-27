FROM node:24-alpine AS builder

WORKDIR /app

RUN corepack enable
RUN corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm i

ENV CI=true

COPY . .

RUN pnpm prisma generate
RUN pnpm run build

FROM node:24-alpine AS runner

WORKDIR /app

RUN corepack enable
RUN corepack prepare pnpm@latest --activate

COPY package.json  pnpm-lock.yaml pnpm-workspace.yaml ./

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 1111

CMD ["pnpm", "start"]