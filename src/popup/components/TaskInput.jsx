import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Plus, ChevronDown } from "lucide-react";
import { PRIORITIES } from "../constants/priorities";

export default function TaskInput({
  input,
  setInput,
  addTask,
  priority,
  setPriority
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const textareaRef = useRef();

useLayoutEffect(() => {
  const el = textareaRef.current;
  if (!el) return;

  if (!input) {
    // 🔥 reset to original 1-line height
    el.style.height = "auto";
    return;
  }

  el.style.height = "0px";
  el.style.height = el.scrollHeight + "px";

  el.scrollTop = el.scrollHeight;
}, [input]);

  return (
    <div className="mb-4 relative" ref={ref}>
      {/* INPUT BAR */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
        {/* PRIORITY DOT + DROPDOWN TRIGGER */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-1"
        >
          <div
            className={`w-2.5 h-2.5 rounded-full ${PRIORITIES[priority].color}`}
          />
          <ChevronDown size={12} className="text-neutral-400" />
        </button>

        {/* INPUT */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
          className="
    flex-1 bg-transparent outline-none text-sm
    text-neutral-800 dark:text-neutral-200
    resize-none
    whitespace-pre-wrap break-words
    max-h-24 overflow-y-auto
    transition-all duration-100
  "
          rows={1}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              addTask();
            }
          }}
        />

        {/* ADD BUTTON */}
        <button
          onClick={addTask}
          className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded-md transition"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
      absolute top-full left-0 mt-2 w-full z-50
      bg-white dark:bg-neutral-900
      border border-neutral-200 dark:border-neutral-700
      rounded-xl shadow-lg
      overflow-hidden
    "
        >
          {[2, 1, 0].map((p) => (
            <button
              key={p}
              onClick={() => {
                setPriority(p);
                setOpen(false);
              }}
              className="
          flex items-center gap-2 w-full px-3 py-2 text-sm
          hover:bg-neutral-100 dark:hover:bg-neutral-800
          transition
        "
            >
              <div
                className={`w-2.5 h-2.5 rounded-full ${PRIORITIES[p].color}`}
              />
              <span className="text-neutral-700 dark:text-neutral-200">
                {PRIORITIES[p].label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
