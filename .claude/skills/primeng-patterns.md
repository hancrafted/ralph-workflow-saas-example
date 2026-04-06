# PrimeNG Patterns

## Version & Theme

- **PrimeNG 21** with the Aura theme
- Import PrimeNG components individually in standalone component `imports` arrays
- Do not import entire PrimeNG module — import only what you use

## Component Usage

- Use PrimeNG components as the primary UI building blocks:
  - **Buttons:** `p-button` directive or `<p-button>` component
  - **Tables:** `<p-table>` with column templates
  - **Forms:** `p-inputtext`, `p-dropdown`, `p-calendar`, `p-checkbox`
  - **Dialogs:** `<p-dialog>` for modals
  - **Toasts:** `<p-toast>` with `MessageService` for notifications
  - **Menus:** `<p-menubar>`, `<p-menu>`, `<p-breadcrumb>`

## Styling Conventions

- PrimeNG handles component-level styling via Aura theme
- Use **Tailwind CSS** for layout, spacing, and custom styling around PrimeNG components
- Do not override PrimeNG theme variables unless explicitly required
- Prefer Tailwind utilities over custom CSS for spacing, flexbox, grid

## Forms

- Use PrimeNG form components with Angular reactive forms
- Leverage PrimeNG's built-in validation message display
- Use `p-floatlabel` for form field labels where appropriate

## Data Display

- Use `<p-table>` for tabular data with built-in sorting, filtering, pagination
- Use `<p-card>` for content cards
- Use `<p-tag>` for status badges and labels

## States

- Always handle loading, empty, and error states in data-driven components
- Use `<p-skeleton>` for loading placeholders
- Use `<p-message>` or `<p-inlinemessage>` for inline error/info messages
