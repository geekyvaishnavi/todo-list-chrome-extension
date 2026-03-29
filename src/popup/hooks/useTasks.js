import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const isChrome = typeof chrome !== "undefined" && chrome.storage;

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  // load tasks
  useEffect(() => {
    if (isChrome) {
      chrome.storage.sync.get(["tasks"], (res) => {
        if (res.tasks) setTasks(res.tasks);
      });
    } else {
      const data = localStorage.getItem("tasks");
      if (data) setTasks(JSON.parse(data));
    }
  }, []);

  const updateStorage = (data) => {
    setTasks(data);

    if (isChrome) {
      chrome.storage.sync.set({ tasks: data });
    } else {
      localStorage.setItem("tasks", JSON.stringify(data));
    }
  };

  const addTask = (input, priority) => {
    if (!input.trim()) return;

    const newTask = {
      uuid: uuidv4(),
      task: input.trim(),
      priority,
      isCompleted: false
    };

    const sorted = [newTask, ...tasks].sort((a, b) => b.priority - a.priority);
    updateStorage(sorted);
  };

  const deleteTask = (uuid) => {
    updateStorage(tasks.filter((t) => t.uuid !== uuid));
  };

  const toggleTask = (uuid) => {
    updateStorage(
      tasks.map((t) =>
        t.uuid === uuid ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  };

  const editTask = (uuid, newText) => {
    if (!newText.trim()) return;

    updateStorage(
      tasks.map((t) => (t.uuid === uuid ? { ...t, task: newText.trim() } : t))
    );
  };

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    editTask
  };
};
