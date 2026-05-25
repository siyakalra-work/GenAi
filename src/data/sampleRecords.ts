import type { DashboardRecord, NavItem } from "@/types/dashboard";

export const defaultNavItems: NavItem[] = [
  { id: "overview", label: "Overview", href: "#overview", active: true },
  { id: "users", label: "Users", href: "#users" },
  { id: "reports", label: "Reports", href: "#reports" },
  { id: "settings", label: "Settings", href: "#settings" },
];

export const sampleRecords: DashboardRecord[] = [
  {
    id: "1",
    name: "Acme Corp",
    email: "billing@acme.com",
    status: "active",
    revenue: 12450,
    updatedAt: "2026-05-20",
  },
  {
    id: "2",
    name: "Northwind LLC",
    email: "ops@northwind.io",
    status: "pending",
    revenue: 8320,
    updatedAt: "2026-05-18",
  },
  {
    id: "3",
    name: "Globex Inc",
    email: "finance@globex.com",
    status: "active",
    revenue: 22100,
    updatedAt: "2026-05-22",
  },
  {
    id: "4",
    name: "Initech",
    email: "accounts@initech.co",
    status: "archived",
    revenue: 4100,
    updatedAt: "2026-04-30",
  },
  {
    id: "5",
    name: "Umbrella Co",
    email: "hello@umbrella.health",
    status: "pending",
    revenue: 15600,
    updatedAt: "2026-05-21",
  },
  {
    id: "6",
    name: "Stark Industries",
    email: "contracts@stark.com",
    status: "active",
    revenue: 48900,
    updatedAt: "2026-05-23",
  },
];
