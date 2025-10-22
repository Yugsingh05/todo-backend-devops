FROM oven/bun:1.2.22-slim

WORKDIR /app


COPY package.json .
COPY bun.lock* .

RUN bun install

COPY . .

EXPOSE 3002

CMD ["bun", "run", "start"]