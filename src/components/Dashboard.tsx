import { useMemo, useState } from "react";
import { defaultNavItems, sampleRecords } from "@/data/sampleRecords";
import type {
  DashboardProps,
  DashboardRecord,
  FilterState,
  NavItem,
  TableColumn,
} from "@/types/dashboard";
import { DataTable } from "./DataTable";
import { FilterBar } from "./FilterBar";
import { Sidebar } from "./Sidebar";

const columns: TableColumn<DashboardRecord>[] = [
  { key: "name", header: "Account", sortable: true },
  { key: "email", header: "Email", sortable: true },
  { key: "status", header: "Status", sortable: true },
  { key: "revenue", header: "Revenue", sortable: true },
  { key: "updatedAt", header: "Updated", sortable: true },
];

function filterRecords(records: DashboardRecord[], filters: FilterState): DashboardRecord[] {
  const query = filters.search.trim().toLowerCase();

  return records.filter((record) => {
    const matchesStatus = filters.status === "all" || record.status === filters.status;
    const matchesSearch =
      query.length === 0 ||
      record.name.toLowerCase().includes(query) ||
      record.email.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });
}

function sortRecords(
  records: DashboardRecord[],
  sortKey: keyof DashboardRecord,
  direction: "asc" | "desc",
): DashboardRecord[] {
  return [...records].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (typeof aVal === "number" && typeof bVal === "number") {
      return direction === "asc" ? aVal - bVal : bVal - aVal;
    }

    const comparison = String(aVal).localeCompare(String(bVal));
    return direction === "asc" ? comparison : -comparison;
  });
}

export function Dashboard({
  title = "Revenue Analytics",
  navItems = defaultNavItems,
  records = sampleRecords,
  initialFilters,
}: DashboardProps) {
  const [nav, setNav] = useState<NavItem[]>(navItems);
  const [filters, setFilters] = useState<FilterState>({
    search: initialFilters?.search ?? "",
    status: initialFilters?.status ?? "all",
  });
  const [sortKey, setSortKey] = useState<keyof DashboardRecord>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const filteredRows = useMemo(
    () => sortRecords(filterRecords(records, filters), sortKey, sortDirection),
    [records, filters, sortKey, sortDirection],
  );

  const handleNavigate = (item: NavItem) => {
    setNav((current) =>
      current.map((entry) => ({ ...entry, active: entry.id === item.id })),
    );
    setMobileNavOpen(false);
  };

  const handleSort = (key: keyof DashboardRecord) => {
    if (sortKey === key) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDirection("asc");
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Mobile overlay sidebar */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${mobileNavOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileNavOpen}
      >
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMobileNavOpen(false)}
          className={`absolute inset-0 bg-slate-900/60 transition-opacity ${
            mobileNavOpen ? "opacity-100" : "opacity-0"
          }`}
          tabIndex={mobileNavOpen ? 0 : -1}
        />
        <div
          id="mobile-sidebar"
          className={`absolute inset-y-0 left-0 w-72 max-w-[85vw] transform transition-transform ${
            mobileNavOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar items={nav} brandLabel={title} onNavigate={handleNavigate} />
        </div>
      </div>

      {/* Desktop sidebar — panel 1 */}
      <div className="hidden lg:block">
        <Sidebar items={nav} brandLabel={title} onNavigate={handleNavigate} />
      </div>

      {/* Main content — panels 2 & 3 */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-sidebar"
              onClick={() => setMobileNavOpen(true)}
              className="rounded-lg border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 lg:hidden"
            >
              <span aria-hidden="true">☰</span>
            </button>
            <div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">{title}</h2>
              <p className="text-sm text-slate-500">Accounts &amp; revenue overview</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Export filtered records as CSV"
            className="shrink-0 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
          >
            Export
          </button>
        </header>

        {/* Panel 2: filter bar */}
        <FilterBar
          filters={filters}
          onSearchChange={(search) => setFilters((current) => ({ ...current, search }))}
          onStatusChange={(status) => setFilters((current) => ({ ...current, status }))}
          resultCount={filteredRows.length}
        />

        {/* Panel 3: data table */}
        <main className="flex-1 p-4 sm:p-6" aria-label="Dashboard main content">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <DataTable
              columns={columns}
              rows={filteredRows}
              sortKey={sortKey}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
