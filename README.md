# Backend — Virtual CV API

Lightweight backend for managing virtual CV data. Built with a focus on performance, simplicity, and full runtime control.

## Stack

- Node.js (ESM)
- TypeScript
- Fastify
- PostgreSQL (`pg`)
- Prisma
- Zod

## Scripts

```bash
npm run dev      # Run in development (watch mode)
npm run build    # Build for production
npm run start    # Run built app
npm run lint     # Lint and fix code
npm run migrate  # Run Prisma migrations
```

## Project Structure
src/  
├── index.ts  
├── db/   
└── modules/  

## Execution Flow
Development: tsx runs TypeScript directly with watch mode  
Build: tsc compiles code into /dist and generates Prisma client  
Production: runs compiled JavaScript only (no TypeScript overhead)

## Database
PostgreSQL via `pg` + Prisma Client  
Direct SQL possible for performance-critical paths  
Full control over query execution

## API Example

fastify.get("/users", async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      email: true
    }
  });

  return result;
});

## Principles
- Minimal dependencies
- Explicit logic over abstractions
- Compile-time over runtime
- Performance-first design
