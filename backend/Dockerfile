FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json pnpm-workspace.yaml ./

RUN corepack enable
RUN pnpm install

ENV CI=true

COPY . .

RUN pnpm prisma generate
RUN pnpm build

FROM node:24-alpine AS runner

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-workspace.yaml ./
RUN pnpm install --prod
COPY --from=builder /app/dist ./dist

EXPOSE 1111

CMD ["pnpm", "start"]