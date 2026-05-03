# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Agent skills

### Issue tracker

Issues live in GitHub Issues (`miguepoloc/agroconecta-frontend`). See `docs/agents/issue-tracker.md`.

### Triage labels

Uses default label vocabulary (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — one `CONTEXT.md` + `docs/adr/` at the repo root (frontend only). See `docs/agents/domain.md`.

---

## Commands

```bash
npm run dev        # dev server on :3000
npm run build      # production build (TypeScript check + static generation)
npm run lint       # ESLint
npx tsc --noEmit   # type-check only — no output means clean
```

No test suite configured yet.

## Stack

- **Next.js 16** (App Router, `src/` dir, `@/*` alias)
- **React 19 / TypeScript 5**
- **Tailwind CSS v4** — all design tokens live in `src/app/globals.css` inside `@theme inline {}`. There is **no `tailwind.config.ts`**.
- **shadcn/ui v4** — components in `src/components/ui/`, built on `@base-ui/react` (NOT Radix).
- **Lucide React** for icons.
- **Sonner** for toasts (`<Toaster>` mounted in root layout).

## Critical: @base-ui/react behavior

shadcn here uses `@base-ui/react`, which differs from Radix in two important ways:

**1. No `asChild` prop.** Trigger components (`DialogTrigger`, `SheetTrigger`, etc.) render a `<button>` themselves. Never nest a `<Button>` inside a trigger — that creates `<button><button>` (invalid HTML + hydration crash). Apply `buttonVariants()` directly to the trigger's `className` instead:

```tsx
// Wrong — nested <button>
<SheetTrigger><Button variant="ghost"><Menu /></Button></SheetTrigger>

// Correct
<SheetTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}>
  <Menu />
</SheetTrigger>
```

**2. `Select.onValueChange` receives `string | null`.** Always guard: `onValueChange={(v) => v && setter(v)}`.

## Design system — Vital Harvest

All tokens are CSS variables defined in `globals.css` and consumed as Tailwind utilities.

| Token                    | Value                     | Use                           |
|--------------------------|---------------------------|-------------------------------|
| `bg-primary`             | `#012d1d` Forest Green    | CTAs, navbar, section headers |
| `bg-secondary-container` | `#ffb702` Sunflower Yellow| Highlights, impact banners    |
| `bg-surface`             | `#f9faf6` Warm Cream      | Page background               |
| `rounded-md`             | `0.75rem` (12 px)         | Standard component radius     |

Fonts: `font-epilogue` (headings, 600/700) · `font-inter` (body, default). Loaded via `next/font/google` in `layout.tsx`.

## Architecture

### Auth (mock — no real backend yet)

- `src/lib/auth-context.tsx` — `AuthProvider` wraps the whole app. Exposes `login`, `loginAs`, `logout`, `user`, `isAuthenticated`.
- Session is written to **two places** by design:
  - `localStorage["agro_auth_user"]` — user id, rehydrated into React state on mount.
  - Cookie `agro_auth_role` (non-httpOnly, `SameSite=Strict`) — the only thing Edge middleware can read.
- `src/middleware.ts` — guards `/admin/*`, `/agricultor/*`, `/institucional/*` using the cookie. Runs at the Edge (no localStorage access there).
- Four demo accounts in `mock-data.ts`: `comprador@demo.co`, `agricultor@demo.co`, `institucion@demo.co`, `admin@demo.co` — all password `demo123`. Quick-login buttons on `/login` are always visible (not gated by `NODE_ENV`).

### Data layer (all mock)

- `src/lib/types.ts` — canonical TypeScript interfaces for the whole domain.
- `src/lib/mock-data.ts` — static arrays + helpers (`getProductBySlug`, `formatCOP`, etc.). The only data source until a real API exists.
- `src/lib/cart-context.tsx` — cart state persisted to `localStorage["agro_cart"]`.

### Routes

| Path                     | Auth                   | Notes                                                          |
|--------------------------|------------------------|----------------------------------------------------------------|
| `/`                      | No                     | Landing page                                                   |
| `/catalogo`              | No                     | Filters via URL search params                                  |
| `/productos/[slug]`      | No                     | Product detail                                                 |
| `/carrito`               | No                     | Cart                                                           |
| `/checkout`              | No                     | Two-step (delivery → payment) in one route via `useState<Step>`|
| `/pedido/confirmacion`   | No                     | Reads `?numero=` from URL                                      |
| `/login` · `/registro`   | No                     |                                                                |
| `/lote/[id]`             | No                     | Public traceability — SSG via `generateStaticParams`           |
| `/institucional`         | institucion or admin   |                                                                |
| `/agricultor/panel`      | agricultor             |                                                                |
| `/admin/*`               | admin                  |                                                                |

### Layouts

- Public pages: import `<Navbar />` and `<Footer />` directly.
- Dashboard pages: wrap content in `<DashboardLayout>` (sticky sidebar, used by `/admin/*` and `/agricultor/*`).

### Patterns to follow

**`useSearchParams()` requires Suspense.** Split any page that calls it into an inner component (uses the hook) and an outer default export that wraps it in `<Suspense>`. See `catalogo/page.tsx`.

**Server component `params` is a Promise in Next.js 16.**

```tsx
// Server component
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
}

// Client component
export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
}
```

**External images** require adding the hostname to `next.config.ts → images.remotePatterns` (currently `images.unsplash.com` and `i.pravatar.cc` are allowed).

**Event handlers in server components** are not allowed. Extract interactive elements (buttons with `onClick`) into a `"use client"` component file — see `src/components/print-button.tsx`.

## Backend integration reference

- `BACKEND_KNOWLEDGE.md` — full API spec, PostgreSQL schema, all 30 endpoints, business rules, and the exact JSON shapes the frontend expects.
- `src/lib/types.ts` — TypeScript types that must match API response shapes 1:1.
- `src/lib/mock-data.ts` — seed data to replicate in the real database.

When integrating: replace mock imports in contexts/pages with `fetch` calls to `process.env.NEXT_PUBLIC_API_URL`.
