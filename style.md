# HerbalMart — Design System & Style Guide

## 1. Brand Aesthetics & Visual Identity
HerbalMart embodies organic wellness, modern ayurvedic elegance, and natural vitality. The visual design combines deep rich botanical greens with warm honey-gold accents, clean typography, soft elevated cards, and subtle micro-interactions.

---

## 2. Color Palette & Tokens

### 2.1 Primary Botanical Greens
- **Primary Deep Green**: `#1b4332` — Headers, major buttons, footer background.
- **Forest Green**: `#2d6a4f` — Hover states, primary interactive elements.
- **Botanical Sage**: `#52b788` — Active badges, progress indicators, highlights.
- **Soft Mint**: `#d8f3dc` — Card highlights, active tab fills, success pills.
- **Pale Leaf Tint**: `#f0fdf4` — Background section tinting.

### 2.2 Warm Earthy Accents
- **Warm Ayurvedic Gold**: `#d4a373` — Premium tags, discount highlights, rating stars.
- **Honey Amber**: `#e9c46a` — Sale badges, warning notifications, price callouts.
- **Earthy Terracotta**: `#e76f51` — Delete actions, high discount tags, hot deal banners.

### 2.3 Neutrals & Backgrounds
- **Body Background**: `#f8faf8` — Light clean organic backdrop.
- **Card Background**: `#ffffff` — Crisp white cards with soft drop-shadow.
- **Glassmorphism Overlay**: `rgba(255, 255, 255, 0.85)` with `backdrop-filter: blur(12px)`.
- **Dark Surface (Admin & Night Theme)**: `#0f231a` — Deep forest night mode background.
- **Text Dark Primary**: `#1a2b22` — Deep slate-green for maximum readability.
- **Text Muted**: `#64748b` — Subtitles, metadata, and breadcrumbs.

---

## 3. Typography Rules
- **Display & Headings**: `Playfair Display`, serif — conveys natural heritage and premium herbal authenticity.
- **Body & UI Elements**: `Plus Jakarta Sans` or `Inter`, sans-serif — ultra-readable, modern, clean.

---

## 4. UI Components & Patterns

### 4.1 Buttons
- **Primary Action**: Deep Green (`#1b4332`) gradient to Forest (`#2d6a4f`), white text, rounded 12px, soft box shadow `0 4px 14px rgba(27, 67, 50, 0.25)`.
- **Secondary / Soft**: Soft Mint fill (`#d8f3dc`) with Deep Green text.
- **Accent / Gold**: Warm Gold (`#d4a373`) for special promotional actions.

### 4.2 Product & Metric Cards
- 16px border-radius, soft border `1px solid rgba(45, 106, 79, 0.1)`.
- Hover effect: `transform: translateY(-4px)`, shadow expands to `0 12px 24px rgba(0, 0, 0, 0.08)`.
- Strikethrough original prices with clear honey/terracotta discount badge.

### 4.3 Navigation & Tabs
- Glassmorphic top navigation bar with search bar and quick cart counter badge.
- Role Switcher toggle bar (Customer View vs Admin Dashboard) seamlessly accessible.

---

## 5. Layout & Responsive Grid
- Responsive 12-column grid.
- Mobile friendly with touch-optimized touch targets and responsive navigation drawer.
