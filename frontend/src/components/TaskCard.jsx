export default function TaskCard({ task, onStatusChange, onDelete }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <select
        value={task.status}
        onChange={(e) => onStatusChange(task._id, e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
}
