# Sync Sketch

Sync Sketch is a real-time collaborative drawing app built as a monorepo using [Turborepo](https://turbo.build/repo). The project uses **pnpm** as the package manager.

---

## Project Structure

- `packages/db` — Database package with Prisma migrations
- Other packages (e.g., client, server, shared) — app logic and UI components

---

## Requirements

- **Node.js v23.5.0** (please ensure this exact version)
- pnpm (`npm install -g pnpm`)
- PostgreSQL or any supported database for Prisma

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/sync-sketch.git
cd sync-sketch
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Database Setup (packages/db)

Change directory to the db package:

```bash
cd packages/db
```

Copy `.env.example` to `.env` and update with your database connection string:

```bash
cp .env.example .env
```

Edit `.env`:

```ini
DATABASE_URL="postgresql://user:password@localhost:5432/sync_sketch_db"
```

Make sure your database server is running and accessible.

Run Prisma migrations to set up the database schema:

```bash
pnpm prisma migrate deploy
```

If you want to create or modify migrations during development, run:

```bash
pnpm prisma migrate dev
```

### 4. Running the Project

Return to the root directory and start the development server:

```bash
cd ../../
pnpm turbo run dev
```

This command runs all relevant packages concurrently.

---

## Video Demo

Below is a demo video showing how to set up and use Sync Sketch:


https://github.com/user-attachments/assets/fedf1bac-5349-448b-9671-7ce422cc0b8f




---

## Troubleshooting

- Verify the `.env` file in `packages/db` is configured correctly.
- Ensure your database server is running.
- Use Prisma Studio to visually inspect the database:

```bash
pnpm prisma studio
```

*Run this inside the `packages/db` folder.*

---

## License

MIT License
