# Install dependencies only when needed
FROM node:18 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy all files and build
FROM node:18 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build || echo "Skip build in dev"

# Production image, copy built assets
FROM node:18 AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app .
EXPOSE 3000
CMD ["npm", "run", "dev"] 