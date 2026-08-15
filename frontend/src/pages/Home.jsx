import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { fetchTasks, addTask, updateTaskStatus, deleteTask } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const { user, logout } = useAuth();

  const loadTasks = async () => setTasks(await fetchTasks());

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAdd = async (title) => {
    await addTask({ title });
    loadTasks();
  };

  const handleStatusChange = async (id, status) => {
    await updateTaskStatus(id, status);
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div>
      <div className="header-row">
        <h1>TaskFlow</h1>
        <div>
          <span>Hi, {user?.name}</span>
          <button onClick={logout}>Log out</button>
        </div>
      </div>
      <TaskForm onAdd={handleAdd} />
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}