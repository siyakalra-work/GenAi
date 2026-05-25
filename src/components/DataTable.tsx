import type { DashboardRecord, DataTableProps } from "@/types/dashboard";

type DashboardTableProps = DataTableProps<DashboardRecord>;

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function StatusBadge({ status }: { status: DashboardRecord["status"] }) {
  const styles: Record<DashboardRecord["status"], string> = {
    active: "bg-emerald-100 text-emerald-800",
    pending: "bg-amber-100 text-amber-800",
    archived: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export function DataTable({
  columns,
  rows,
  sortKey,
  sortDirection = "asc",
  onSort,
  emptyMessage = "No records match your filters.",
}: DashboardTableProps) {
  const getSortLabel = (header: string, key: keyof DashboardRecord) => {
    if (sortKey !== key) return `Sort by ${header}`;
    return `Sort by ${header}, currently sorted ${sortDirection === "asc" ? "ascending" : "descending"}`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <caption className="sr-only">Customer records</caption>
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column) => {
              const isSorted = sortKey === column.key;
              const ariaSort = isSorted
                ? sortDirection === "asc"
                  ? "ascending"
                  : "descending"
                : undefined;

              if (column.sortable && onSort) {
                return (
                  <th
                    key={String(column.key)}
                    scope="col"
                    aria-sort={ariaSort}
                    className="px-4 py-3 font-semibold text-slate-700 sm:px-6"
                  >
                    <button
                      type="button"
                      onClick={() => onSort(column.key)}
                      aria-label={getSortLabel(column.header, column.key)}
                      className="inline-flex items-center gap-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                    >
                      {column.header}
                      {isSorted && (
                        <span aria-hidden="true">{sortDirection === "asc" ? "↑" : "↓"}</span>
                      )}
                    </button>
                  </th>
                );
              }

              return (
                <th
                  key={String(column.key)}
                  scope="col"
                  className="px-4 py-3 font-semibold text-slate-700 sm:px-6"
                >
                  {column.header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-slate-500 sm:px-6"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id} className="transition hover:bg-slate-50">
                {columns.map((column) => (
                  <td
                    key={`${row.id}-${String(column.key)}`}
                    className="whitespace-nowrap px-4 py-3 text-slate-700 sm:px-6"
                  >
                    <CellValue row={row} columnKey={column.key} />
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function CellValue({
  row,
  columnKey,
}: {
  row: DashboardRecord;
  columnKey: keyof DashboardRecord;
}) {
  const value = row[columnKey];

  if (columnKey === "status") {
    return <StatusBadge status={row.status} />;
  }

  if (columnKey === "revenue") {
    return <span className="font-medium tabular-nums">{formatCurrency(row.revenue)}</span>;
  }

  return <span>{String(value)}</span>;
}
