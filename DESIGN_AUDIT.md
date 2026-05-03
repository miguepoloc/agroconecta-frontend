# AgroConecta — Registro de Auditoría de Diseño

Proyecto Stitch: **AgroDirect Sustainable Marketplace** (`projects/5622278338137306407`)
Sistema de diseño: **Vital Harvest** (Forest Green `#012d1d` · Sunflower Yellow `#ffb702` · Warm Cream `#f9faf6`)
Stack: Web Desktop (2560px) · Tipografías: Epilogue (headings) + Inter (body)

---

## Sesión 1 — 2026-05-02

### Pantallas analizadas (13 en total)

| Pantalla | Estado | Notas |
|---|---|---|
| Landing / Inicio (Cosecha Natural) | ✅ Existe | Bueno. Falta sección institucional y CTA para centros públicos |
| Catálogo con Paginación | ✅ Existe | Falta filtro por lote mínimo y precio institucional |
| Detalle de Producto (Cosecha Natural) | ✅ Existe | "Camino a tu Mesa" excelente. Falta LOT number y precio mayorista |
| Carrito (Cosecha Natural) | ✅ Existe | Banner 82% directo al agricultor es diferenciador clave |
| Acceso / Login (Vital Harvest) | ✅ Existe | Limpio. No diferencia roles en el login |
| Registro de Usuario (Vital Harvest) | ✅ Existe | Selector Comprador/Agricultor OK. Falta rol "Institución" |
| Panel Administrador (Vital Harvest) | ✅ Existe | Dashboard comprimido. Falta métricas institucionales y rango de fechas |
| Admin - Lista de Pedidos | ✅ Existe | — |
| Admin - Detalle de Pedido | ✅ Existe | — |
| Admin - Lista de Agricultores | ✅ Existe | — |
| Admin - Detalle de Agricultor | ✅ Existe | — |
| Panel Agricultor (Cosecha Natural) | ✅ Existe | Compliance Status con alertas es feature crítica y bien hecha |
| Vista Rápida de Producto (Vital Harvest) | ✅ Existe | — |

### Hallazgos — Lo que está bien (mantener)

- Brand Vital Harvest aplicado de forma consistente en todas las pantallas
- Bloque "Nuestro Propósito" en Landing comunica la misión social directamente
- Banner **"Impacto de tu compra – 82% va directo al agricultor"** en el Carrito es el mayor diferenciador UX de la plataforma
- Sección **"Camino a tu Mesa"** en Detalle de Producto (cosecha → empaque → envío → llegada) es un diferenciador de trazabilidad excelente
- Perfil del agricultor con foto, cita y certificaciones (GlobalGAP, Fair Trade) en el Detalle construye confianza
- **Compliance Status** con alerta de renovación ("RENEWAL NEEDED") en Panel Agricultor es feature crítica bien implementada
- Gold Sustainability Rank motiva al agricultor a mantener sus documentos vigentes
- Selector **"Soy Comprador / Soy Agricultor"** en registro bifurca el flujo correctamente

### Hallazgos — Problemas de diseño

#### Prioridad CRÍTICA

- **Contraste**: verificar badges de estado (verde claro sobre fondo blanco) en el admin — pueden fallar los 4.5:1 de WCAG
- **Sin checkout**: el carrito tiene "Proceder al Pago" pero no existe la pantalla de destino
- **Rol "Institución" ausente**: el registro solo tiene Comprador/Agricultor — el caso de uso de centros públicos no tiene soporte en la UI

#### Prioridad ALTA

- Admin dashboard demasiado comprimido: gráfico pequeño sin selector de fechas, sin métricas institucionales vs. individuales
- Catálogo sin ordenamiento (precio, frescura, distancia) ni filtro de "Lote mínimo disponible"
- Detalle de producto sin precio por volumen / precio institucional
- No existe página pública de trazabilidad por lote (requisito para licitaciones públicas colombianas)

#### Prioridad MEDIA

- Landing sin sección institucional ("¿Administras un comedor?")
- Sin sistema de mensajería entre comprador y agricultor
- Sin calendario de cosechas por región/temporada

### Vistas faltantes identificadas

| Vista | Prioridad | Estado |
|---|---|---|
| **Checkout / Pago** | Alta | 🔴 Pendiente creación |
| **Portal Institucional / Bulk Orders** | Crítica | 🔴 Pendiente creación |
| **Página de Trazabilidad Pública** | Alta (legal) | 🔴 Pendiente creación |
| **Confirmación de pedido** | Alta | 🔴 Pendiente creación |
| **Perfil del comprador** | Media | 🔴 Pendiente creación |
| **Catálogo estacional** | Media | 🔴 Pendiente creación |
| **Detalle de pedido (vista comprador)** | Media | 🔴 Pendiente creación |

---

## Sesión 1 — Creación de pantallas nuevas

> Las pantallas se crean en el proyecto Stitch `5622278338137306407` siguiendo el sistema de diseño Vital Harvest.

### Progreso

| Pantalla | Stitch Screen ID | Estado |
|---|---|---|
| Checkout — Paso 2 Entrega | `aa248be2d9534e9ca387d05271a57463` | ✅ Creada |
| Checkout — Paso 2 Entrega (v2) | `cd233ac545db4187bbbb27a9a3c9ccf5` | ✅ Creada (duplicado por retry) |
| Pago y Envío — Paso 3 | `3dd0f4d3da3245c5969e8be8f02ff869` | ✅ Creada |
| Portal Institucional | `c20f640175a74e7e83bbaca9109412c2` | ✅ Creada (+ 4 duplicados por retries previos) |
| Trazabilidad Pública | `11d9b2f6381d4a8c96495616b18f6f46` | ✅ Creada |
| Confirmación de Pedido | `7351bdd3fd6a41f39daeb19f280b3589` | ✅ Creada |

### Nota técnica — Comportamiento del MCP de Stitch

- El modelo `GEMINI_3_FLASH` genera pantallas en ~2 min (dentro del timeout)
- El modelo `GEMINI_3_1_PRO` excede consistentemente el timeout de 2 min
- Después de 1 generación exitosa, las siguientes peticiones en la misma sesión hacen timeout SIN crear la pantalla (rate limit o throttling del servidor)
- Estrategia recomendada: crear una pantalla por sesión de Claude, o esperar entre generaciones
