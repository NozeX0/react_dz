function TaskList({ tasks }: { tasks: string[] }) {
  return (
    <div className="mt-5">
      <h2 className="mb-3 text-xl font-bold">Список завдань</h2>

      <div className="min-h-80 rounded border bg-gray-50 p-3">
        {tasks.length === 0 ? (
          <p className="text-gray-500">Завдань немає</p>
        ) : (
          tasks.map((task, index) => (
            <div key={index} className="mb-2 rounded bg-white p-3">
              {task}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;