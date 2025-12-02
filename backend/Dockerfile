FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm ci

COPY src ./src

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY --from=builder /app/dist ./dist

RUN npm ci --only=production

EXPOSE 4000

CMD ["node", "dist/server.js"]
