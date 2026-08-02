# HerbalMart — Design System & Style Guide

## 1. Brand Aesthetics & Visual Identity
**Verdant Glass Forest** embodies a technological-organic wellness aesthetic. It combines deep emerald night forest tones, multi-layered frosted glass surfaces, luminous outer glows, vibrant lime primary call-to-actions, and crisp typography to create a high-end digital wellness experience.

---

## 2. Color Palette & Tokens

### 2.1 Dark Mode Surfaces & Base
- **Surface Background**: `#101415` — Deep charcoal night backdrop.
- **Surface Container**: `#1d2022` — Frosted container base.
- **Surface Container High**: `#272a2c` — Active section / elevated container.
- **Deep Emerald**: `#064e3b` — Foundation forest tone.

### 2.2 Accent & Brand Colors
- **Vibrant Lime**: `#84cc16` — Primary CTAs, active badges, discount highlights, glowing focus states.
- **Luminous Mint (Primary Tint)**: `#95d3ba` — Secondary accents, headings highlight, progress bars.
- **Moss Dark**: `#365314` — Subtle container fills and category tags.
- **Sage Mist**: `#94a3b8` — Metadata, breadcrumbs, SKU labels, secondary descriptions.

### 2.3 Glassmorphism Tokens
- **Glass Background (`glass-bg`)**: `rgba(15, 23, 42, 0.65)`
- **Glass Border (`glass-border`)**: `rgba(255, 255, 255, 0.15)`
- **Backdrop Blur**: `24px`
- **Glass Hover Glow**: `0 0 20px rgba(132, 204, 22, 0.25)` with border `rgba(255, 255, 255, 0.3)`

---

## 3. Typography Rules
- **Font Family**: `Inter`, system-ui, sans-serif
- **Headline XL**: 48px / 700 / -0.02em letter spacing
- **Headline LG**: 32px / 600 / -0.01em letter spacing
- **Body MD**: 16px / 400 / 24px line height
- **Label CAPS**: 12px / 600 / 0.05em letter spacing uppercase

---

## 4. UI Components & Patterns

### 4.1 Buttons
- **Primary Action Button**: Solid Vibrant Lime (`#84cc16`) with Dark Emerald (`#003829`) text for maximum pop and contrast. Rounded pill / 12px corners.
- **Secondary Button**: Glass-styled with 15% white border and crisp white text.
- **Accent Badge**: 10% opacity lime background with 100% lime text.

### 4.2 Product Cards
- Glass background with `backdrop-filter: blur(20px)`.
- 1px border at 15% white opacity.
- Hover effect: border transitions to 30% opacity with subtle lime glow (`0 0 20px rgba(132, 204, 22, 0.25)`).

### 4.3 Analytics & Charts
- Transparent backgrounds sitting inside frosted glass panels.
- Line/Area charts rendered in Luminous Mint (`#95d3ba`) and Vibrant Lime (`#84cc16`).
