import { useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState<string[]>([]);

  function addTask(task: string) {
    setTasks([...tasks, task]);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-5">
        <TaskForm addTask={addTask} />
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}

export default App;