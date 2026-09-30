# Stage 1 - Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Build-time placeholder; no database connection is made here
ENV MONGODB_URI=mongodb://localhost:27017/companydb

RUN npm run build


# Stage 2 - Run
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/.next ./.next

COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
