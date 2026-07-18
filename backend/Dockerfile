FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

ENV CI=true

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:24-alpine AS runner

WORKDIR /app


COPY package.json  ./

RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 1111

CMD ["npm", "start"]