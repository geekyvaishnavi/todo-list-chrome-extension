import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { PRIORITIES } from "../constants/priorities";
import { Pencil, Trash2, Circle, CheckCircle2, Check, X } from "lucide-react";

export default function TaskItem({ task, toggleTask, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.task);
  const textareaRef = useRef();

  useEffect(() => {
    if (!isEditing) {
      setValue(task.task);
    }
  }, [task.task]);

  // dynamic when editing
  useLayoutEffect(() => {
    if (!isEditing) return;

    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "0px";
    el.style.height = el.scrollHeight + "px";

    el.scrollTop = el.scrollHeight;
  }, [value, isEditing]);

  
  // focus + move cursor to end when entering edit mode
  useLayoutEffect(() => {
    if (isEditing && textareaRef.current) {
      const el = textareaRef.current;

      el.focus();
      const length = el.value.length;
      el.setSelectionRange(length, length);
    }
  }, [isEditing]);

  const handleSave = () => {
    if (!value.trim()) {
      setValue(task.task);
      setIsEditing(false);
      return;
    }
    editTask(task.uuid, value.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(task.task);
    setIsEditing(false);
  };

  return (
    <div
      className="
        group flex items-start gap-3 px-3 py-2 rounded-xl
        bg-white dark:bg-neutral-900
        border border-neutral-200 dark:border-neutral-800
        shadow-sm hover:shadow-md
        transition-all duration-150
      "
    >
      {/* COMPLETE */}
      <button onClick={() => toggleTask(task.uuid)} className="mt-1">
        {task.isCompleted ? (
          <CheckCircle2 size={18} className="text-green-500" />
        ) : (
          <Circle
            size={18}
            className="text-neutral-400 dark:text-neutral-500"
          />
        )}
      </button>

      {/* TEXT / EDIT */}
      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={(e) => {
            const related = e.relatedTarget;
            if (related && related.dataset?.action) return;
            handleSave();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSave();
            }
            if (e.key === "Escape") handleCancel();
          }}
          autoFocus
          rows={1}
          className="
          flex-1 text-sm
          resize-none
          bg-transparent outline-none
          text-neutral-800 dark:text-neutral-200
          border-b border-neutral-300 dark:border-neutral-700
          whitespace-pre-wrap break-words
          max-h-24 overflow-y-auto
          transition-all duration-100"
        />
      ) : (
        <p
          className={`
            flex-1 text-sm
            text-neutral-800 dark:text-neutral-200
            line-clamp-3
            ${task.isCompleted ? "line-through opacity-40" : ""}
          `}
        >
          {task.task}
        </p>
      )}

      {/* PRIORITY */}
      <div
        className={`w-2 h-2 mt-2 rounded-full ${PRIORITIES[task.priority].color}`}
      />

      {/* ACTIONS */}
      {isEditing ? (
        <>
          {/* SAVE */}
          <button
            data-action="save"
            onClick={handleSave}
            className="text-green-500 hover:text-green-600 transition mt-1"
          >
            <Check size={16} />
          </button>

          {/* CANCEL */}
          <button
            data-action="cancel"
            onClick={handleCancel}
            className="text-red-500 hover:text-red-600 transition mt-1"
          >
            <X size={16} />
          </button>
        </>
      ) : (
        <>
          {/* EDIT (only if NOT completed) */}
          {!task.isCompleted && (
            <button
              onClick={() => {
                setIsEditing(true);
                setValue(task.task);
              }}
              className="
                opacity-0 group-hover:opacity-100
                transition
                text-neutral-400 hover:text-blue-500 mt-1
              "
            >
              <Pencil size={14} />
            </button>
          )}

          {/* DELETE */}
          <button
            onClick={() => deleteTask(task.uuid)}
            className="
              opacity-0 group-hover:opacity-100
              transition
              text-neutral-400 hover:text-red-500 mt-1
            "
          >
            <Trash2 size={14} />
          </button>
        </>
      )}
    </div>
  );
}
