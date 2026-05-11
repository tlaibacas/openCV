# Backend — OpenCV (Virtual CV)

Lightweight backend for managing virtual CV data. Built with a focus on performance, simplicity, and full runtime control.

## Stack

- Node.js
- TypeScript
- Fastify
- PostgreSQL (`pg`)
- esbuild

## Scripts

```bash
npm run dev     # Run in development (watch mode)
npm run build   # Build for production
npm start       # Run built app
npm run lint    # Lint and fix code
npm test        # Run test script
```

## Project Structure

```text
src/
├── index.ts
├── db/
└── modules/
```

## Execution Flow

Development: tsx runs TypeScript directly with watch mode  
Build: esbuild compiles code into /dist  
Production: runs compiled JavaScript only (no TypeScript overhead)

## Database

PostgreSQL via `pg`  
Direct SQL queries (no ORM)  
Full control over performance

## API Example

```ts
fastify.get("/users", async () => {
  const result = await query("SELECT id, email FROM users");
  return result.rows;
});
```

## Principles

- Minimal dependencies
- Explicit logic over abstractions
- Compile-time over runtime
- Performance-first design
```
