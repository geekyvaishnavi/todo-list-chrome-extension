import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Sun,
  Moon,
  Monitor,
  Plus,
  Trash2,
  Circle,
  CheckCircle2
} from "lucide-react";

const PRIORITIES = {
  2: { label: "High", color: "bg-red-500" },
  1: { label: "Medium", color: "bg-yellow-400" },
  0: { label: "Low", color: "bg-green-500" }
};

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState(2);
  const [filter, setFilter] = useState(-1);
  const [theme, setTheme] = useState("system");

  // load
  useEffect(() => {
    chrome.storage.sync.get(["tasks", "theme"], (res) => {
      if (res.tasks) setTasks(res.tasks);
      if (res.theme) setTheme(res.theme);
    });
  }, []);

  // theme handling
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      if (theme === "dark") {
        root.classList.add("dark");
      } else if (theme === "light") {
        root.classList.remove("dark");
      } else {
        if (media.matches) root.classList.add("dark");
        else root.classList.remove("dark");
      }
    };

    applyTheme();

    const listener = () => {
      if (theme === "system") applyTheme();
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [theme]);

  const updateStorage = (data) => {
    setTasks(data);
    chrome.storage.sync.set({ tasks: data });
  };

  const addTask = () => {
    if (!input.trim()) return;

    const newTask = {
      uuid: uuidv4(),
      task: input.trim(),
      priority,
      isCompleted: false
    };

    const sorted = [newTask, ...tasks].sort((a, b) => b.priority - a.priority);
    updateStorage(sorted);
    setInput("");
  };

  const filtered = tasks.filter((t) => filter === -1 || t.priority === filter);

  return (
    <div className="w-[360px] p-4 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-950 text-neutral-900 dark:text-white">
      {/* MAIN CARD */}
      <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm p-4">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold tracking-tight">
            My Todo List ✏️
          </h1>

          {/* THEME SWITCH */}
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1 border border-neutral-200 dark:border-neutral-700">
            <button
              onClick={() => setTheme("light")}
              className={`p-1.5 rounded ${
                theme === "light" ? "bg-white shadow-sm" : ""
              }`}
            >
              <Sun size={14} />
            </button>

            <button
              onClick={() => setTheme("dark")}
              className={`p-1.5 rounded ${
                theme === "dark" ? "bg-white dark:bg-neutral-700 shadow-sm" : ""
              }`}
            >
              <Moon size={14} />
            </button>

            <button
              onClick={() => setTheme("system")}
              className={`p-1.5 rounded ${
                theme === "system"
                  ? "bg-white dark:bg-neutral-700 shadow-sm"
                  : ""
              }`}
            >
              <Monitor size={14} />
            </button>
          </div>
        </div>

        {/* INPUT */}
        <div className="mb-4">
          <div className="flex items-center gap-2 bg-white dark:bg-neutral-900 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
            <div
              className={`w-2.5 h-2.5 rounded-full ${PRIORITIES[priority].color}`}
            />

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a task..."
              className="flex-1 bg-transparent outline-none text-sm"
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />

            <button
              onClick={addTask}
              className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded-md transition"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* PRIORITY */}
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
        </div>

        {/* FILTER */}
        <div className="flex bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-1 mb-3 text-xs">
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

        {/* TASK LIST */}
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {filtered.length === 0 && (
            <p className="text-sm text-neutral-400 text-center py-8">
              ✨ No tasks yet
            </p>
          )}

          {filtered.map((t) => (
            <div
              key={t.uuid}
              className="group flex items-center gap-3 px-3 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition"
            >
              <button
                onClick={() =>
                  updateStorage(
                    tasks.map((task) =>
                      task.uuid === t.uuid
                        ? { ...task, isCompleted: !task.isCompleted }
                        : task
                    )
                  )
                }
              >
                {t.isCompleted ? (
                  <CheckCircle2 size={18} className="text-green-500" />
                ) : (
                  <Circle size={18} className="text-neutral-400" />
                )}
              </button>

              <span
                className={`flex-1 text-sm ${
                  t.isCompleted ? "line-through opacity-40" : ""
                }`}
              >
                {t.task}
              </span>

              <div
                className={`w-2 h-2 rounded-full ${PRIORITIES[t.priority].color}`}
              />

              <button
                onClick={() =>
                  updateStorage(tasks.filter((task) => task.uuid !== t.uuid))
                }
                className="opacity-0 group-hover:opacity-100 transition"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
