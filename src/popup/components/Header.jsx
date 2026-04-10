import { Sun, Moon } from "lucide-react";

export default function Header({ mode, setMode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
        My Todo List ✏️
      </h1>

      <div
        className="
        flex items-center gap-1 
        bg-neutral-100 dark:bg-neutral-800 
        rounded-lg p-1 
        border border-neutral-200 dark:border-neutral-700
      "
      >
        {/* LIGHT */}
        <button
          onClick={() => setMode("light")}
          className={`
            p-1.5 rounded-md transition-all
            ${
              mode === "light"
                ? "bg-white text-black shadow-sm"
                : "text-neutral-500 hover:text-black dark:hover:text-white"
            }
          `}
        >
          <Sun size={14} />
        </button>

        {/* DARK */}
        <button
          onClick={() => setMode("dark")}
          className={`
            p-1.5 rounded-md transition-all
            ${
              mode === "dark"
                ? "bg-neutral-700 text-white shadow-sm"
                : "text-neutral-500 hover:text-black dark:hover:text-white"
            }
          `}
        >
          <Moon size={14} />
        </button>
      </div>
    </div>
  );
}
