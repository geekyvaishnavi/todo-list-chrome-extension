import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  filter,
  toggleTask,
  deleteTask,
  editTask
}) {
  const filtered = tasks.filter((t) => filter === -1 || t.priority === filter);

  return (
    <div className="mt-2">
      {/* EMPTY STATE */}
      {filtered.length === 0 ? (
        <div
          className="
            flex flex-col items-center justify-center
            py-10 rounded-xl
            border border-dashed
            border-neutral-200 dark:border-neutral-800
            bg-neutral-50 dark:bg-neutral-900/50
          "
        >
          <p className="text-sm text-neutral-400">✨ No tasks yet</p>
          <span className="text-xs text-neutral-300 mt-1">
            Add your first task above
          </span>
        </div>
      ) : (
        /* TASK LIST */
        <div
          className="
            space-y-2 max-h-[300px] overflow-y-auto pr-1
            scrollbar-thin
            scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700
            scrollbar-track-transparent
          "
        >
          {filtered.map((t) => (
            <TaskItem
              key={t.uuid}
              task={t}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}
