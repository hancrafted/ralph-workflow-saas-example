# Tailwind CSS Conventions

## Version

- **Tailwind CSS v4** — uses the new CSS-first configuration approach
- Configuration via `@theme` directive in CSS, not `tailwind.config.js`

## Usage Pattern

- Tailwind is for **utility styling and layout** — not component-level styling
- PrimeNG handles component appearance; Tailwind handles spacing, layout, and positioning
- Apply Tailwind classes directly in Angular templates

## Common Patterns

### Layout
- `flex`, `grid`, `flex-col`, `items-center`, `justify-between` for flexbox/grid layouts
- `gap-*` for consistent spacing between flex/grid children
- `container`, `mx-auto`, `px-*` for page-level centering and padding

### Spacing
- Use Tailwind spacing scale (`p-4`, `m-2`, `gap-6`) for consistent spacing
- Prefer `gap` over margin for flex/grid children

### Responsive Design
- Mobile-first: base styles apply to all, prefix for larger screens
- `sm:`, `md:`, `lg:`, `xl:` breakpoint prefixes
- Example: `class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"`

### Typography
- `text-sm`, `text-base`, `text-lg`, `text-xl` for font sizes
- `font-medium`, `font-semibold`, `font-bold` for weight

### Sizing
- `w-full`, `max-w-*`, `h-screen`, `min-h-*` for width/height constraints

## Rules

- Do not create custom CSS classes when a Tailwind utility exists
- Do not use `@apply` — use utilities directly in templates
- Do not use Tailwind for styling PrimeNG internals — let the theme handle it
- Keep class strings readable; split across lines if they exceed ~80 characters
