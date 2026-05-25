import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { Dashboard } from "./Dashboard";

afterEach(() => {
  cleanup();
});

describe("Dashboard", () => {
  it("renders the three-panel layout landmarks", () => {
    render(<Dashboard />);

    expect(screen.getAllByRole("complementary", { name: "Main navigation" }).length).toBeGreaterThan(0);
    expect(screen.getByRole("region", { name: "Table filters" })).toBeInTheDocument();
    expect(screen.getByRole("main", { name: "Dashboard main content" })).toBeInTheDocument();
  });

  it("filters records by search query", async () => {
    const user = userEvent.setup();
    render(<Dashboard />);

    const search = document.getElementById("dashboard-search");
    expect(search).toBeTruthy();
    await user.type(search!, "Acme");

    const table = screen.getByRole("table");
    expect(within(table).getByText("Acme Corp")).toBeInTheDocument();
    expect(within(table).queryByText("Northwind LLC")).not.toBeInTheDocument();
  });
});
