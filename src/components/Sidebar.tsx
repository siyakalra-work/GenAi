import type { NavItem, SidebarProps } from "@/types/dashboard";

export function Sidebar({ items, brandLabel, onNavigate }: SidebarProps) {
  const handleClick = (item: NavItem) => (event: React.MouseEvent) => {
    event.preventDefault();
    onNavigate?.(item);
  };

  return (
    <aside
      className="flex h-full w-full shrink-0 flex-col border-r border-slate-200 bg-slate-900 text-slate-100 lg:w-64"
      aria-label="Main navigation"
    >
      <div className="border-b border-slate-700 px-5 py-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Dashboard
        </p>
        <h1 className="mt-1 text-lg font-bold text-white">{brandLabel}</h1>
      </div>

      <nav className="flex-1 px-3 py-4" aria-label="Sidebar links">
        <ul className="space-y-1" role="list">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                onClick={handleClick(item)}
                aria-label={`Navigate to ${item.label}`}
                aria-current={item.active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                  item.active
                    ? "bg-sky-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-800 text-xs font-bold uppercase"
                  aria-hidden="true"
                >
                  {item.label.charAt(0)}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-slate-700 px-5 py-4">
        <button
          type="button"
          aria-label="Open account menu"
          className="w-full rounded-lg border border-slate-600 px-3 py-2 text-left text-sm text-slate-200 transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          Account settings
        </button>
      </div>
    </aside>
  );
}
