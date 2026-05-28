<div align="center">

<img src="./assets/banner.png" alt="FormVerse Banner" width="100%" />

<br />

# FormVerse

**A production-grade, open-source form builder SaaS.**
Build dynamic forms, publish shareable links, collect responses, and analyze results — all in one platform.

<br />

[![Live Demo](https://img.shields.io/badge/Live%20Demo-form--verse--web--nine.vercel.app-6366f1?style=for-the-badge&logo=vercel)](https://form-verse-web-nine.vercel.app/)
[![API Docs](https://img.shields.io/badge/API%20Docs-Scalar-0ea5e9?style=for-the-badge&logo=swagger)](https://formverse-ltsb.onrender.com/docs)
[![GitHub](https://img.shields.io/badge/GitHub-coderTejas565-181717?style=for-the-badge&logo=github)](https://github.com/coderTejas565/FormVerse)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Live Links](#live-links)
- [Screenshots](#screenshots)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Local Setup](#local-setup)
- [Seed Data](#seed-data)
- [Security](#security)
- [Roadmap](#roadmap)

---

## Overview

FormVerse is a full-stack SaaS form builder built with a **monorepo architecture** using Turborepo. It provides everything needed to create, publish, and analyze forms — with a type-safe API layer, secure JWT authentication, and an interactive analytics dashboard.

Built as a production-style project to demonstrate real-world backend architecture, clean API design, and scalable monorepo practices.

---

## Live Links

| Resource | URL |
|---|---|
| Frontend | https://form-verse-web-nine.vercel.app/ |
| Backend API | https://formverse-ltsb.onrender.com |
| API Documentation | https://formverse-ltsb.onrender.com/docs |
| Repository | https://github.com/coderTejas565/FormVerse |

**Demo credentials:**
```
Email:    demo@test.com
Password: password123
```

---

## Screenshots

<details>
<summary>View Screenshots</summary>

### Landing Page
![Landing Page](./assets/landing.png)

### Dashboard
![Dashboard](./assets/dashboard.png)

### Form Builder
![Form Builder](./assets/form-builder.png)

### Public Form View
![Public Form](./assets/public-form.png)

### Analytics Dashboard
![Analytics](./assets/analytics.png)

### Response Dashboard
![Responses](./assets/responses.png)

### Explore Page
![Explore](./assets/explore.png)

</details>

---

## Features

### Authentication
- JWT-based authentication with secure cookie sessions
- Protected dashboard routes
- Role-based form ownership enforcement

### Dynamic Form Builder
Create fully customizable forms with a drag-and-drop builder.

**Supported field types:**

| Field | Description |
|---|---|
| Text | Single-line short text input |
| Long Text | Multi-line textarea |
| Email | Email with format validation |
| Number | Numeric input |
| Single Select | Dropdown with one choice |
| Multi Select | Dropdown with multiple choices |
| Checkbox | Boolean toggle |
| Rating | Star rating input |
| Date | Date picker |

Additional controls: publish/unpublish toggle, visibility modes (Public / Unlisted), required/optional field validation.

### Public Form System
- Shareable public URLs — no login required for respondents
- Visibility enforcement (unpublished/invalid forms handled gracefully)
- Thank-you confirmation flow on submission

### Responses & Analytics
- Response collection and storage
- Per-form response dashboard
- Analytics overview with submission tracking
- Answer-level breakdown per field

### Explore Page
- Discover publicly published forms
- Seeded demo forms for instant preview

### Backend & API
- Fully type-safe API layer using **tRPC**
- OpenAPI documentation via **Scalar**
- Input validation with **Zod**
- Rate limiting on public endpoints
- Secure authorization checks per procedure
- Clean modular backend structure

---

## Architecture

### System Flow

```
Client (Browser)
      ↓
Next.js Frontend
      ↓  tRPC calls
Express Backend
      ↓
Drizzle ORM
      ↓
PostgreSQL
```

### Monorepo Structure

```
FormVerse/
├── apps/
│   ├── web/              # Next.js frontend
│   └── api/              # Express + tRPC backend
│
└── packages/
    ├── database/         # Drizzle ORM schema & migrations
    ├── trpc/             # Shared tRPC routers
    ├── logger/           # Logging utilities
    ├── typescript-config/
    └── eslint-config/
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, Tailwind CSS, tRPC Client |
| Backend | Node.js, Express, tRPC Server |
| Auth | JWT, Secure Cookies |
| Database | PostgreSQL, Drizzle ORM |
| Validation | Zod |
| Monorepo | Turborepo, pnpm Workspaces |
| API Docs | Scalar |
| Deployment | Vercel (frontend), Render (backend) |

---

## Local Setup

### Prerequisites

- Node.js `>=18`
- pnpm `>=8`
- PostgreSQL instance

### 1. Clone the Repository

```bash
git clone https://github.com/coderTejas565/FormVerse.git
cd FormVerse
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create `.env` files in both `apps/api` and `apps/web`:

**`apps/api/.env`**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/formverse
JWT_SECRET=your_jwt_secret_here
BASE_URL=http://localhost:8000
```

**`apps/web/.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. Run Database Migrations

```bash
pnpm db:generate
pnpm db:migrate
```

### 5. Start Development Server

```bash
pnpm dev
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:8000 |
| API Docs | http://localhost:8000/docs |

---

## Seed Data

The database includes 3 pre-built demo forms with sample responses and analytics:

| Form | Description |
|---|---|
| Anime Character Survey | Preference-based multi-select form |
| Startup Validation Form | Feedback collection for product ideas |
| Movie Feedback Survey | Rating and review collection |

Each is seeded with responses, analytics data, and public visibility enabled.

---

## Security

| Mechanism | Implementation |
|---|---|
| Authentication | JWT tokens with short expiry |
| Sessions | Secure HTTP-only cookies |
| Authorization | Ownership checks on all protected procedures |
| Rate Limiting | Applied to public form submission endpoints |
| Input Validation | Zod schemas on all inputs |
| Error Handling | Safe errors — no stack traces in production |

---

## Roadmap

- [ ] Email notifications on new responses
- [ ] CSV export for response data
- [ ] Conditional logic between fields
- [ ] QR code sharing for forms
- [ ] Form templates library
- [ ] Multi-page form support
- [ ] Advanced analytics (completion rate, drop-off points)
- [ ] Team collaboration and shared workspaces

---

## License

Built for educational and portfolio purposes.

---

<div align="center">

Built by [Tejas Dev](https://github.com/coderTejas565) · [Live Demo](https://form-verse-web-nine.vercel.app/) · [API Docs](https://formverse-ltsb.onrender.com/docs)

</div>