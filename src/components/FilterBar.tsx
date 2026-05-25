import type { FilterBarProps, RecordStatus } from "@/types/dashboard";

const statusOptions: { value: RecordStatus | "all"; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "archived", label: "Archived" },
];

export function FilterBar({
  filters,
  onSearchChange,
  onStatusChange,
  resultCount,
}: FilterBarProps) {
  return (
    <section
      className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6"
      aria-label="Table filters"
    >
      <form
        className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="min-w-0 flex-1 sm:max-w-xs">
          <label htmlFor="dashboard-search" className="mb-1 block text-sm font-medium text-slate-700">
            Search
          </label>
          <input
            id="dashboard-search"
            type="search"
            value={filters.search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Name or email…"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          />
        </div>

        <div className="sm:w-44">
          <label htmlFor="dashboard-status" className="mb-1 block text-sm font-medium text-slate-700">
            Status
          </label>
          <select
            id="dashboard-status"
            value={filters.status}
            onChange={(event) =>
              onStatusChange(event.target.value as FilterBarProps["filters"]["status"])
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <p
          className="text-sm text-slate-500 sm:ml-auto sm:pb-2"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="font-semibold text-slate-800">{resultCount}</span>{" "}
          {resultCount === 1 ? "record" : "records"}
        </p>
      </form>
    </section>
  );
}
