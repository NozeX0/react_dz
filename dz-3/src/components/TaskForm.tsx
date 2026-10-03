import { useState } from "react";

function TaskForm({ addTask }: { addTask: (task: string) => void }) {
  const [task, setTask] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (task.trim() === "") {
      return;
    }

    addTask(task);
    setTask("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Назва завдання"
        className="flex-1 rounded border p-2"
      />

      <button
        type="submit"
        className="rounded bg-blue-500 px-5 text-white hover:bg-blue-600"
      >
        Додати
      </button>
    </form>
  );
}

export default TaskForm;