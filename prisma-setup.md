# Prisma Setup Guide

## Table of Contents
- [Prerequisites](#prerequisites)
- [Development Setup](#development-setup)
- [Production Setup](#production-setup)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before starting with Prisma, ensure you have:
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database (or your preferred database)
- Git for version control

## Development Setup

### 1. Installation

```bash
# Install Prisma CLI as a dev dependency
npm install prisma --save-dev

# Install Prisma Client
npm install @prisma/client
```

### 2. Initialize Prisma

```bash
# Initialize Prisma in your project
npx prisma init
```

This creates:
- `prisma/` directory
- `prisma/schema.prisma` file
- `.env` file

### 3. Configure Environment Variables

In your `.env` file:
```env
# Development Database URL
DATABASE_URL="postgresql://username:password@localhost:5432/flashcard_db?schema=public"
```

### 4. Define Your Schema

Edit `prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Your models here
```

### 5. Development Workflow

```bash
# Generate Prisma Client after schema changes
npx prisma generate

# Create and apply migrations
npx prisma migrate dev --name init

# View your database with Prisma Studio
npx prisma studio
```

### 6. Add Scripts to package.json

```json
{
  "scripts": {
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio",
    "prisma:format": "prisma format",
    "prisma:validate": "prisma validate",
    "dev": "prisma generate && nest start --watch"
  }
}
```

## Production Setup

### 1. Environment Configuration

Create `.env.production`:
```env
DATABASE_URL="postgresql://username:password@production-host:5432/flashcard_db?schema=public"
```

### 2. Production Database Setup

```bash
# Create production database
npx prisma migrate deploy

# Generate Prisma Client for production
npx prisma generate
```

### 3. Production Scripts

Add to package.json:
```json
{
  "scripts": {
    "build": "prisma generate && nest build",
    "start:prod": "node dist/main",
    "prisma:deploy": "prisma migrate deploy"
  }
}
```

### 4. CI/CD Integration

Example GitHub Actions workflow:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Generate Prisma Client
        run: npx prisma generate
        
      - name: Run migrations
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          
      - name: Build
        run: npm run build
```

## Best Practices

### 1. Schema Management
- Use meaningful model and field names
- Add comments to complex fields
- Use enums for fixed value sets
- Implement proper relations
- Use appropriate field types

### 2. Migration Strategy
- Create migrations for all schema changes
- Test migrations locally before deploying
- Use meaningful migration names
- Keep migrations in version control
- Review migration files before applying

### 3. Performance Optimization
- Use appropriate indexes
- Implement pagination for large datasets
- Use select statements to limit fields
- Implement proper relations
- Use transactions when needed

### 4. Security
- Never commit .env files
- Use connection pooling in production
- Implement proper access controls
- Use parameterized queries
- Regular security audits

### 5. Type Safety
```typescript
// Use Prisma types
import { Prisma } from '@prisma/client';

// Type-safe queries
const user = await prisma.user.findUnique({
  where: { id: userId },
  select: {
    id: true,
    email: true,
  },
});
```

## Troubleshooting

### Common Issues

1. **Prisma Client Generation Fails**
```bash
# Clear generated files
rm -rf generated/prisma

# Regenerate client
npx prisma generate
```

2. **Migration Conflicts**
```bash
# Reset database (development only)
npx prisma migrate reset

# Create new migration
npx prisma migrate dev --name fix_conflict
```

3. **Connection Issues**
- Check DATABASE_URL format
- Verify database credentials
- Ensure database is running
- Check network connectivity
- Verify firewall settings

4. **Performance Issues**
- Use Prisma Studio to analyze queries
- Implement proper indexes
- Use connection pooling
- Monitor query performance
- Use appropriate select statements

### Debugging Tools

1. **Prisma Studio**
```bash
npx prisma studio
```

2. **Query Logging**
```typescript
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
```

3. **Migration Status**
```bash
npx prisma migrate status
```

4. **Database Introspection**
```bash
npx prisma db pull
```

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma GitHub Repository](https://github.com/prisma/prisma)
- [Prisma Examples](https://github.com/prisma/prisma-examples)
- [Prisma Blog](https://www.prisma.io/blog)
- [Prisma Discord Community](https://discord.gg/prisma) 