import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import { useTasks } from "./hooks/useTasks";

export default function Popup() {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState(2);
  const [filter, setFilter] = useState(-1);
  const [mode, setMode] = useState("light");

  const { tasks, addTask, deleteTask, toggleTaskCompletion, editTask } = useTasks();

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.runtime) {
      chrome.runtime.sendMessage({ type: "GET_MODE" }, (res) => {
        if (res?.mode) setMode(res.mode);
      });
    } else {
      const saved = localStorage.getItem("mode");
      if (saved) setMode(saved);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (mode === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    if (typeof chrome !== "undefined" && chrome.runtime) {
      chrome.runtime.sendMessage({
        type: "SET_MODE",
        mode
      });
    } else {
      localStorage.setItem("mode", mode);
    }
  }, [mode]);

  return (
    <div
      className="
        w-[400px] p-3
        bg-gradient-to-b
        from-neutral-50 to-white
        dark:from-neutral-950 dark:to-black
        text-neutral-900 dark:text-neutral-100
      "
    >
      <div className="p-3 space-y-4">
        <Header mode={mode} setMode={setMode} />

        <TaskInput
          input={input}
          setInput={setInput}
          addTask={() => {
            addTask(input, priority);
            setInput("");
          }}
          priority={priority}
          setPriority={setPriority}
        />

        <FilterBar filter={filter} setFilter={setFilter} />

        <TaskList
          tasks={tasks}
          filter={filter}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      </div>
    </div>
  );
}
