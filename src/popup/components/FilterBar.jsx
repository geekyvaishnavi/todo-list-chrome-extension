import { PRIORITIES } from "../constants/priorities";

export default function FilterBar({ filter, setFilter }) {
  return (
    <div className="flex bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1 mb-3 text-xs">
      <button
        onClick={() => setFilter(-1)}
        className={`flex-1 py-1 rounded-md ${
          filter === -1
            ? "bg-white dark:bg-neutral-700 shadow-sm"
            : "opacity-60"
        }`}
      >
        All
      </button>

      {[2, 1, 0].map((p) => (
        <button
          key={p}
          onClick={() => setFilter(p)}
          className={`flex-1 py-1 rounded-md ${
            filter === p
              ? "bg-white dark:bg-neutral-700 shadow-sm"
              : "opacity-60"
          }`}
        >
          {PRIORITIES[p].label}
        </button>
      ))}
    </div>
  );
}
