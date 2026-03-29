import { PRIORITIES } from "../constants/priorities";

export default function PrioritySelector({ priority, setPriority, input }) {
  if (!input.trim()) return null;

  return (
    <div className="flex gap-2 mt-2">
      {[2, 1, 0].map((p) => (
        <button
          key={p}
          onClick={() => setPriority(p)}
          className={`text-xs px-2 py-1 rounded-md border ${
            priority === p
              ? "bg-neutral-900 text-white dark:bg-white dark:text-black"
              : "opacity-60 hover:opacity-100"
          }`}
        >
          {PRIORITIES[p].label}
        </button>
      ))}
    </div>
  );
}
