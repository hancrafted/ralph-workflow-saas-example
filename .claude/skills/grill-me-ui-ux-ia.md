# Grill-Me: UI/UX & Information Architecture

## When to Invoke

When the feature has a frontend component — any new page, component, or UI change.

## Questions to Resolve

### Layout & Navigation
- Where does this feature live in the app's navigation hierarchy?
- Is it a new page, a section within an existing page, or a dialog/overlay?
- What's the URL route? Does it need route parameters?
- How does the user get here? (sidebar link, button, redirect)

### PrimeNG Component Choices
- Which PrimeNG components should be used? (table, form, dialog, card, etc.)
- Are there data grids? → `p-table` with sorting, filtering, pagination?
- Are there forms? → Which input components? Validation display?
- Are there notifications? → Toast, inline message, or dialog?

### Responsive Design
- Does this need to work on mobile? Tablet?
- What changes at smaller breakpoints? (column collapse, stacked layout, hidden elements)
- Any mobile-specific interactions? (swipe, bottom sheet)

### User Flows
- What's the happy path? Step by step.
- What does the user see while data is loading? → Skeleton? Spinner?
- What does the user see when there's no data? → Empty state message/illustration?
- What does the user see on error? → Inline error? Toast? Error page?

### Accessibility
- Are all interactive elements keyboard navigable?
- Do form inputs have proper labels (not just placeholders)?
- Are ARIA attributes needed for dynamic content?
- Color contrast requirements?

### Information Architecture
- What data is displayed? List every field.
- What actions are available? (create, edit, delete, filter, sort, export)
- What's the visual hierarchy? (primary info vs. secondary details)
- Are there related entities shown? (e.g., project → tasks within it)

## Output

Summarize all UI/UX decisions as a structured list. These feed into the acceptance criteria and mockup/design notes sections of the issue.
