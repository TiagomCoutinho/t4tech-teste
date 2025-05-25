FROM node:20-slim
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
RUN npm rebuild better-sqlite3
COPY . .
RUN npm run build
CMD ["npx", "ts-node", "src/server.ts"]