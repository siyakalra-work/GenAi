export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon?: string;
  active?: boolean;
};

export type TableColumn<T> = {
  key: keyof T;
  header: string;
  sortable?: boolean;
};

export type RecordStatus = "active" | "pending" | "archived";

export type DashboardRecord = {
  id: string;
  name: string;
  email: string;
  status: RecordStatus;
  revenue: number;
  updatedAt: string;
};

export type FilterState = {
  search: string;
  status: RecordStatus | "all";
};

export type SidebarProps = {
  items: NavItem[];
  brandLabel: string;
  onNavigate?: (item: NavItem) => void;
};

export type FilterBarProps = {
  filters: FilterState;
  onSearchChange: (search: string) => void;
  onStatusChange: (status: FilterState["status"]) => void;
  resultCount: number;
};

export type DataTableProps<T extends { id: string }> = {
  columns: TableColumn<T>[];
  rows: T[];
  sortKey?: keyof T;
  sortDirection?: "asc" | "desc";
  onSort?: (key: keyof T) => void;
  emptyMessage?: string;
};

export type DashboardProps = {
  title?: string;
  navItems?: NavItem[];
  records?: DashboardRecord[];
  initialFilters?: Partial<FilterState>;
};
