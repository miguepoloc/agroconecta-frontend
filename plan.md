# AgroConecta Frontend — Plan de implementación

## Contexto

El repo es un slate limpio: solo existen archivos de diseño (design.md, DESIGN_AUDIT.md, prototype.html, CLAUDE.md). Hay 18 pantallas diseñadas en Stitch (proyecto `5622278338137306407`) con el sistema Vital Harvest. El objetivo es construir el frontend en Next.js 15, desplegarlo en Vercel, y usar datos mock hasta que exista el backend.

**Decisiones confirmadas:**
- Stack: Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui
- Despliegue: Vercel (auto-deploy desde GitHub)
- Stitch: usar `mcp__stitch__get_screen` como referencia visual durante cada pantalla
- Auth: mock con roles en localStorage + cookie para middleware
- Prioridad: flujo Comprador completo → resto de flujos

---

## Fase 0 — Inicialización del proyecto

```bash
npx create-next-app@latest . \
  --typescript --tailwind --eslint --app --src-dir \
  --import-alias "@/*" --no-turbopack

npx shadcn@latest init
# Style: Default | Base color: Neutral | CSS variables: Yes

npx shadcn@latest add button card badge input select dialog sheet \
  table tabs progress avatar separator breadcrumb navigation-menu

npm install clsx tailwind-merge lucide-react
```

---

## Fase 1 — Design tokens (PRIMERO, todo depende de esto)

### `tailwind.config.ts`
Mapear todos los tokens de `design.md`:
- Colors: surface, primary (#012d1d), secondary-container (#ffb702), on-surface, outline, error… (todos los 50 tokens)
- fontFamily: `epilogue: ['Epilogue', 'sans-serif']`, `inter: ['Inter', 'sans-serif']`
- borderRadius: `sm:0.25rem`, `DEFAULT:0.5rem`, **`md:0.75rem`** (12px — radio principal), `lg:1rem`, `xl:1.5rem`, `full:9999px`

### `src/app/globals.css`
- Variables HSL para shadcn/ui (`--primary`, `--background`, `--radius: 0.75rem`, etc.)
- `@layer base { body { @apply bg-surface text-on-surface font-inter } }`

### `src/app/layout.tsx`
- `next/font/google` para Epilogue (600,700) e Inter (400,500,600)
- Envolver con `<AuthProvider>` y `<CartProvider>`

---

## Fase 2 — Capa de datos

### `src/lib/types.ts`
```ts
UserRole = 'comprador' | 'agricultor' | 'institucion' | 'admin'
User { id, name, email, role, avatar, nit?, institutionName? }
Farmer { id, name, region, certifications, sustainabilityRank, complianceStatus, ... }
Product { id, slug, name, price, institutionalPrice?, minimumLot, lotNumber, freshnessScore, traceabilityChain, ... }
TraceabilityStep { stage: 'cosecha'|'empaque'|'envio'|'llegada', date, location, responsible }
Order { id, orderNumber, type: 'individual'|'institucional', status, items, total, ... }
CartItem { productId, product, quantity }
```

### `src/lib/mock-data.ts`
- 1 usuario por rol (4 total)
- 3-4 agricultores (Boyacá, Cundinamarca, Antioquia) con certif. GlobalGAP/FairTrade/ICA
- 6-8 productos (verduras, frutas, granos, tubérculos) con lot numbers `LOT-YYYY-MMDD-XX`
- 8-10 órdenes en distintos estados

---

## Fase 3 — Auth + Cart (antes de cualquier ruta protegida)

### `src/lib/auth-context.tsx`
- `login(email, password)` → busca en mockUsers
- `loginAs(role)` → acceso rápido en dev (sin password)
- `logout()`
- Persistencia: `localStorage['agro_auth_user']` + cookie `agro_auth_role=xxx; path=/; SameSite=Strict` (dual-write necesario para middleware Edge)

### `src/middleware.ts`
- Proteger `/admin/*` y `/agricultor/*`
- Lee cookie `agro_auth_role` (no localStorage — Edge no tiene acceso)
- Redirigir a `/login` si no autenticado, a `/` si rol incorrecto

### `src/lib/cart-context.tsx`
- `items`, `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `totalItems`, `subtotal`
- Persistencia en `localStorage['agro_cart']`

---

## Fase 4 — Componentes de layout

| Componente | Archivo | Uso |
|---|---|---|
| Navbar | `src/components/layout/navbar.tsx` | Wordmark AgroConecta, links, carrito con badge, avatar dropdown |
| Footer | `src/components/layout/footer.tsx` | Links, misión, redes |
| PageLayout | `src/components/layout/page-layout.tsx` | Navbar + children + Footer |
| DashboardLayout | `src/components/layout/dashboard-layout.tsx` | Sidebar izquierdo para /admin/* y /agricultor/* |

---

## Fase 5 — Componentes compartidos

| Componente | Archivo | Descripción |
|---|---|---|
| ProductCard | `src/components/product-card.tsx` | Variantes: catalog, quick-view, compact |
| FreshnessBadge | `src/components/freshness-badge.tsx` | Progress bar 0–100, gradiente verde |
| FarmerCard | `src/components/farmer-card.tsx` | Avatar circular, región, compliance badge |
| TraceabilityTimeline | `src/components/traceability-timeline.tsx` | "Camino a tu Mesa" — 4 pasos con iconos Lucide |
| ImpactBanner | `src/components/impact-banner.tsx` | "82% va directo al agricultor" — fondo amarillo |

---

## Fase 6 — Páginas (orden de implementación)

> Al inicio de cada página: llamar `mcp__stitch__get_screen` (proyecto `5622278338137306407`) para obtener la referencia visual. Para IDs desconocidos, llamar `mcp__stitch__list_screens` primero.

### IDs de Stitch conocidos (de DESIGN_AUDIT.md)
| Pantalla | Stitch Screen ID |
|---|---|
| Checkout — Entrega | `aa248be2d9534e9ca387d05271a57463` |
| Pago — Paso 3 | `3dd0f4d3da3245c5969e8be8f02ff869` |
| Portal Institucional | `c20f640175a74e7e83bbaca9109412c2` |
| Trazabilidad Pública | `11d9b2f6381d4a8c96495616b18f6f46` |
| Confirmación de Pedido | `7351bdd3fd6a41f39daeb19f280b3589` |

### Flujo Comprador (prioridad 1)
1. `src/app/page.tsx` — Hero verde, "Nuestro Propósito", productos destacados, CTA institucional, perfiles agricultores
2. `src/app/catalogo/page.tsx` — Grid + sidebar filtros (categoría, precio, lote mín), filtros via URL search params
3. `src/app/productos/[slug]/page.tsx` — Galería, panel compra, TraceabilityTimeline, FarmerCard expandido, tabla precios volumen
4. `src/app/carrito/page.tsx` — Lista items, ImpactBanner, resumen orden
5. `src/app/checkout/page.tsx` — **Una sola ruta, 2 steps via useState** (Entrega → Pago). Ref: IDs Stitch arriba.
6. `src/app/pedido/confirmacion/page.tsx` — Número pedido grande, resumen, CTAs

### Auth
7. `src/app/login/page.tsx` — Dos columnas. Quick login buttons en dev (`NODE_ENV=development`). Redirige según rol.
8. `src/app/registro/page.tsx` — 3 tabs: Comprador / Agricultor / Institución con campos por rol

### Flujo Institucional
9. `src/app/institucional/page.tsx` — KPIs, tabla órdenes activas, licitaciones. Protegido: `role === 'institucion'`
10. `src/app/lote/[id]/page.tsx` — **Público, sin auth**. LOT number, cadena custodia, certificaciones, botón imprimir

### Flujo Agricultor
11. `src/app/agricultor/panel/page.tsx` — Compliance status con alertas, KPIs, Gold Rank badge, órdenes activas

### Flujo Admin
12. `src/app/admin/page.tsx` — KPIs, chart ventas CSS-only, date range selector, tabla órdenes recientes
13. `src/app/admin/pedidos/page.tsx` — Table con filtros, badges WCAG (sin verde claro sobre blanco)
14. `src/app/admin/pedidos/[id]/page.tsx` — Detalle pedido, cambio de estado
15. `src/app/admin/agricultores/page.tsx` — Table agricultores con compliance filter
16. `src/app/admin/agricultores/[id]/page.tsx` — Perfil completo, alerta renovación (Toast), suspender (Dialog)

---

## Fase 7 — Despliegue

### `vercel.json`
```json
{
  "framework": "nextjs",
  "headers": [
    { "source": "/(.*)", "headers": [
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "X-Frame-Options", "value": "DENY" }
    ]}
  ]
}
```

### `.env.example`
```
NEXT_PUBLIC_APP_NAME=AgroConecta
NEXT_PUBLIC_APP_ENV=development
```

Conectar repo a Vercel → auto-deploy en cada push a `main`.

---

## Decisiones arquitectónicas clave

| Decisión | Elección | Razón |
|---|---|---|
| Filtros catálogo | URL search params | Compartibles, browser-back compatible, deep-linking desde landing |
| Auth middleware | Cookie `agro_auth_role` + localStorage | Edge middleware no tiene acceso a localStorage |
| Checkout | Una ruta `/checkout`, 2 steps con useState | Evita perder datos de formulario en navegación |
| Radio de componentes | `rounded-md` (0.75rem = 12px) | Matches `design.md` primary container radius |
| shadcn/ui | Base estructural, colores via Tailwind tokens | No dejar que el gris default de shadcn contamine Vital Harvest |
| Charts admin | CSS-only bar chart | Mantiene bundle lean para mock; recharts se puede añadir después |
| Badges de estado | `bg-primary-container text-on-primary-container` | Cumple WCAG 4.5:1 (arregla issue identificado en DESIGN_AUDIT.md) |

---

## Árbol de archivos completo

```
src/
├── app/
│   ├── layout.tsx, globals.css
│   ├── page.tsx                          # /
│   ├── catalogo/page.tsx                 # /catalogo
│   ├── productos/[slug]/page.tsx         # /productos/:slug
│   ├── carrito/page.tsx                  # /carrito
│   ├── checkout/page.tsx                 # /checkout
│   ├── pedido/confirmacion/page.tsx      # /pedido/confirmacion
│   ├── login/page.tsx
│   ├── registro/page.tsx
│   ├── institucional/page.tsx
│   ├── lote/[id]/page.tsx
│   ├── agricultor/panel/page.tsx
│   └── admin/
│       ├── page.tsx
│       ├── pedidos/page.tsx, [id]/page.tsx
│       └── agricultores/page.tsx, [id]/page.tsx
├── components/
│   ├── ui/                               # shadcn (no editar)
│   ├── layout/navbar, footer, page-layout, dashboard-layout
│   ├── product-card, freshness-badge, farmer-card
│   ├── traceability-timeline, impact-banner
├── lib/
│   ├── types.ts, mock-data.ts
│   ├── auth-context.tsx, cart-context.tsx, utils.ts
└── middleware.ts
tailwind.config.ts
vercel.json, .env.example
```

---

## Verificación

1. `npm run build` pasa sin errores TypeScript
2. `npm run dev` → visitar cada ruta manualmente
3. Quick login buttons en dev para probar los 4 roles
4. `/lote/LOT-2026-0412-MZ` carga sin auth
5. Acceder a `/admin` sin login → redirige a `/login`
6. `vercel deploy` → URL pública funcional
7. Confirmar contraste WCAG en badges de estado con browser DevTools
