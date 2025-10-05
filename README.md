# NestJS JWT Auth Starter (MongoDB + Mongoose)

A NestJS starter template that implements JWT authentication, user management, and role-based access control using MongoDB with Mongoose. This README has been updated to reflect the current repository structure and setup.

## Features

- Authentication & Authorization
  - JWT access and refresh tokens
  - Login, registration, and logout
  - Role-based access control (RBAC)
  - Public route decorators

- User management
  - User profile and statistics endpoints
  - Password change and reset scaffolding

- Project utilities
  - Global exception filters
  - Response transformation interceptor
  - Guards and decorators for common patterns
  - Input validation with class-validator

## Project structure (high level)

Files and folders relevant to this template:

- `src/` - application source
  - `main.ts` - bootstrap
  - `app.module.ts`, `app.controller.ts`, `app.service.ts`
  - `auth/` - authentication module, controller, service, DTOs
  - `database/` - database providers / module (Mongoose)
  - `jwt/` - JWT helpers/services
  - `schemas/` - Mongoose schemas (e.g. `user.schema.ts`)
  - `utils/` - decorators, guards, filters, interceptors, strategies
- `test/` - e2e test(s)
- `package.json`, `tsconfig.json`, `nest-cli.json`, `pnpm-lock.yaml`

## Quick start

These instructions assume you're on macOS or Linux with Node.js and pnpm installed.

1. Clone the repository

```bash
git clone https://github.com/aditya04tripathi/nestjs-starter-api-with-jwt-auth.git
cd nest-js-jwt-auth-mongodb-starter-template
```

2. Install dependencies

```bash
pnpm install
```

3. Copy and edit environment variables

```bash
cp .env.example .env
# Edit .env and set MONGODB_URI, JWT_SECRET, and other values
```

Common environment variables used in this project:

- `MONGODB_URI` - MongoDB connection string (e.g. mongodb://localhost:27017/mydb)
- `JWT_SECRET` - Secret used to sign access tokens
- `JWT_REFRESH_SECRET` - Secret used to sign refresh tokens (if used)
- `PORT` - Server port (default: 3001)

4. Run the app in development

```bash
pnpm run start:dev
```

5. Run tests

```bash
pnpm test
```

## Scripts

Relevant npm/pnpm scripts are defined in `package.json`. Typical scripts you can expect:

- `start` - run production build
- `start:dev` - run in watch (NestJS) development mode
- `build` - TypeScript build
- `test` - run unit/e2e tests
- `lint` - run ESLint

Run `pnpm run` or inspect `package.json` for the exact scripts available.

## Notes on database and migrations

This template uses MongoDB with Mongoose rather than Prisma/Postgres. There are no Prisma migrations in this repository. The `database` module and providers wire up a Mongoose connection using `MONGODB_URI`.

If you need seeding or migration tooling, add scripts or use a migration/seed library compatible with MongoDB (for example, `migrate-mongo` or `umzug`).

## Contributing

Please follow the standard fork-and-PR workflow:

1. Fork the repo
2. Create a feature branch
3. Make changes and add tests
4. Run lint/tests: `pnpm run pr-ready` (if available)
5. Open a pull request

## License

MIT License — see the `LICENSE` file for details.

---

If you'd like, I can also update or add a `.env.example` with precise variables found in the codebase, or scan `src/` to extract exact env var names and scripts from `package.json`. Tell me which you'd prefer next.
