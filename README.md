# Gen AI — Analytics Dashboard

A responsive **3-panel dashboard** built with React, TypeScript, and Tailwind CSS:

1. **Sidebar** — primary navigation and branding  
2. **Filter bar** — search and status filters with live result count  
3. **Data table** — sortable customer records  

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run test` | Run Vitest tests |
| `npm run preview` | Preview production build |

## Project structure

```
src/
  components/
    Dashboard.tsx   # Page layout & state
    Sidebar.tsx     # Panel 1
    FilterBar.tsx   # Panel 2
    DataTable.tsx   # Panel 3
  types/dashboard.ts
  data/sampleRecords.ts
```

## Accessibility

See [ACCESSIBILITY_CHECKLIST.md](./ACCESSIBILITY_CHECKLIST.md) for the full audit checklist and manual test script.

## Wireframe mapping

| Wireframe region | Component |
|------------------|-----------|
| Left navigation rail | `Sidebar` |
| Top filters / search | `FilterBar` |
| Main data grid | `DataTable` inside `Dashboard` |
