# Accessibility Checklist — Analytics Dashboard

Use this checklist when reviewing or extending the dashboard. Items marked **Done** are implemented in the current codebase.

## Structure & landmarks

| Item | Status | Notes |
|------|--------|-------|
| Page has `lang` on `<html>` | **Done** | `index.html` |
| Logical heading hierarchy | **Done** | `h1` in sidebar, `h2` in main header |
| `<aside>` for sidebar navigation | **Done** | `Sidebar.tsx` with `aria-label="Main navigation"` |
| `<main>` for primary content | **Done** | `Dashboard.tsx` |
| Filter area labeled as a region | **Done** | `aria-label="Table filters"` on filter section |
| Table has `<caption>` (visually hidden) | **Done** | `sr-only` caption in `DataTable.tsx` |

## Keyboard & focus

| Item | Status | Notes |
|------|--------|-------|
| All interactive controls are keyboard reachable | **Done** | Native buttons, links, inputs, select |
| Visible focus indicators | **Done** | `focus-visible:ring-*` on controls |
| Sort buttons operable with keyboard | **Done** | `<button>` in table headers |
| Mobile nav overlay dismissible | **Done** | Backdrop button closes menu |
| No keyboard trap in mobile drawer | **Done** | Overlay + slide panel pattern |

## ARIA & labels

| Item | Status | Notes |
|------|--------|-------|
| Every interactive control has `aria-label` or visible label | **Done** | Per project rules |
| Nav links describe destination | **Done** | `aria-label="Navigate to …"` |
| Current page indicated in nav | **Done** | `aria-current="page"` |
| Search input has associated `<label>` | **Done** | `htmlFor` + `id` |
| Status filter has associated `<label>` | **Done** | `htmlFor` + `id` |
| Sort state exposed on headers | **Done** | `aria-sort` + button `aria-label` |
| Filter result count announced | **Done** | `aria-live="polite"` on count |
| Mobile menu button exposes state | **Done** | `aria-expanded`, `aria-controls` |
| Decorative icons hidden | **Done** | `aria-hidden="true"` where used |

## Tables

| Item | Status | Notes |
|------|--------|-------|
| Column headers use `<th scope="col">` | **Done** | `DataTable.tsx` |
| Row keys stable for React list | **Done** | `id` field |
| Empty state readable by screen readers | **Done** | Single cell with message |
| Status not conveyed by color alone | **Done** | Text label in badge |

## Responsive & motion

| Item | Status | Notes |
|------|--------|-------|
| Layout usable at mobile widths | **Done** | Collapsible sidebar, horizontal scroll on table |
| Touch targets ≥ 44px where possible | **Partial** | Padding on nav/buttons; verify on device |
| Respects `prefers-reduced-motion` | **Todo** | Add `motion-reduce:` utilities if animations expand |

## Color & contrast

| Item | Status | Notes |
|------|--------|-------|
| Text meets WCAG AA contrast (4.5:1) | **Verify** | Run axe or Lighthouse on built page |
| Focus ring meets 3:1 against background | **Verify** | Sky ring on white/slate backgrounds |

## Manual test script

1. Tab through sidebar, filters, table sort buttons, and Export — order should be logical.
2. Activate **Open navigation menu** on a narrow viewport; confirm **Close navigation menu** works.
3. With VoiceOver/NVDA, confirm filter count updates when search/status changes.
4. Sort each column; confirm sort direction is announced.
5. Run [axe DevTools](https://www.deque.com/axe/devtools/) or Lighthouse Accessibility audit on `/`.

## Automated tests

| Item | Status |
|------|--------|
| Vitest smoke tests for landmarks & filtering | **Done** | `Dashboard.test.tsx` |
