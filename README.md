# FormVerse

Production-style form builder SaaS built with Turborepo, tRPC, Zod, Drizzle ORM and Next.js.

Users can create dynamic forms, publish shareable links, collect responses, view analytics and manage submissions.

Live Demo:
[Add deployed frontend URL]

API Documentation:
[Add Scalar docs URL]

GitHub Repository:
[Add GitHub URL]

Demo Credentials:

Email:
demo@test.com

Password:
password123


## Features

Authentication
- Signup/Login with JWT authentication
- Protected creator dashboard
- Persistent authentication using cookies

Form Management
- Create forms
- Edit forms
- Publish/unpublish forms
- Public and unlisted visibility modes
- Dynamic field builder
- Required/optional fields
- Multiple field types

Supported Field Types
- Short text
- Long text
- Email
- Number
- Single select
- Multi select
- Checkbox
- Rating
- Date

Public Forms
- Public explore page
- Shareable form links
- Public form submissions without login
- Visibility enforcement
- Thank-you screen after submission

Analytics & Responses
- Total responses
- Response charts
- Recent submissions
- Response management dashboard
- View submitted answers

Developer Features
- API documentation using Scalar
- Type-safe APIs with tRPC
- Validation with Zod
- Rate limiting
- Shared packages in monorepo
- Drizzle ORM migrations

Extra Features
- Explore page
- Landing page
- Pricing page
- Seeded demo data
- Dashboard analytics


## Tech Stack

Frontend:
- Next.js
- React
- Tailwind CSS
- tRPC client

Backend:
- Express
- tRPC server
- JWT Authentication

Database:
- PostgreSQL
- Drizzle ORM

Monorepo:
- Turborepo
- pnpm workspaces

Validation:
- Zod

API Docs:
- Scalar


## Architecture

```txt
apps/
 ├── web        -> Next.js frontend
 └── api        -> Express + tRPC backend

packages/
 ├── database   -> Drizzle schemas + DB
 ├── services   -> Business logic
 ├── trpc       -> Routes + procedures
 ├── logger
 └── shared utils
```
````

## Setup

Clone repository:

```bash
git clone [repo-url]
cd FormVerse
```

Install dependencies:

```bash
pnpm install
```

Create environment variables:

Example:

```env
DATABASE_URL=
JWT_SECRET=
NEXT_PUBLIC_API_URL=
```

Run migrations:

```bash
pnpm db:generate
pnpm db:migrate
```

Start development:

```bash
pnpm dev
```

Frontend:

```txt
http://localhost:3000
```

Backend:

```txt
http://localhost:8000
```

API Docs:

```txt
http://localhost:8000/docs
```

---

## Demo Data

Included seeded forms:

1. Anime Character Survey
2. Startup Validation Form
3. Movie Feedback Survey

Each contains:

* Sample responses
* Analytics data
* Charts

---

## API Documentation

Interactive API docs:

```txt
[Add deployed docs URL]
```

Local:

```txt
http://localhost:8000/docs
```

---

## Screenshots

Add screenshots:

### Landing Page

[Insert image]

### Dashboard

[Insert image]

### Form Builder

[Insert image]

### Analytics

[Insert image]

### Responses Dashboard

[Insert image]

### Explore Page

[Insert image]

---

## Deployment

Frontend:

```txt
[Add Vercel URL]
```

Backend:

```txt
[Add deployment URL]
```

Database:

```txt
[Add Neon/Supabase URL if needed]
```

---

## Submission Checklist

Included:

* Public GitHub repository
* Deployed project
* Demo credentials
* API documentation
* README
* Seed data
* Landing page
* Pricing page
* Analytics
* Response management
* Explore page

---

## Future Improvements

* Email notifications
* CSV export
* Conditional logic
* Form templates
* Password protected forms
* QR sharing

