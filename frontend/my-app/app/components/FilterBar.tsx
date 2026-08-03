"use client";

import { useBookStore } from "@/app/lib/bookstore";

export function FilterBar() {
  const {
    filterStatus,
    filterTag,
    setFilterStatus,
    setFilterTag,
  } = useBookStore();

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg bg-white p-4 shadow-sm">
      <div>
        <label className="mr-2 text-sm font-medium">Status:</label>

        <select
          value={filterStatus ?? ""}
          onChange={(e) =>
            setFilterStatus(e.target.value || null)
          }
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="">All</option>
          <option value="want-to-read">📖 Want to Read</option>
          <option value="reading">📘 Reading</option>
          <option value="completed">✅ Completed</option>
        </select>
      </div>

      <div>
        <label className="mr-2 text-sm font-medium">Tag:</label>

        <input
          type="text"
          value={filterTag ?? ""}
          onChange={(e) =>
            setFilterTag(e.target.value || null)
          }
          placeholder="react"
          className="rounded-md border px-3 py-2 text-sm"
        />
      </div>
    </div>
  );
}