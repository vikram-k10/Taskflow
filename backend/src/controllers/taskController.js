import Task from "../models/Task.js";
import Workspace from "../models/Workspace.js";

const checkMembership = async (workspaceId, userId) => {
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) return false;
  return workspace.members.some((m) => String(m) === userId);
};

export const getTasks = async (req, res) => {
  const { workspaceId } = req.params;
  if (!(await checkMembership(workspaceId, req.userId))) {
    return res.status(403).json({ error: "Not a member of this workspace" });
  }
  const tasks = await Task.find({ workspace: workspaceId }).sort({ createdAt: -1 });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { workspaceId } = req.params;
  if (!(await checkMembership(workspaceId, req.userId))) {
    return res.status(403).json({ error: "Not a member of this workspace" });
  }
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });
  const task = await Task.create({ title, description, user: req.userId, workspace: workspaceId });
  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const { workspaceId } = req.params;
  if (!(await checkMembership(workspaceId, req.userId))) {
    return res.status(403).json({ error: "Not a member of this workspace" });
  }
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, workspace: workspaceId },
    req.body,
    { new: true }
  );
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};

export const deleteTask = async (req, res) => {
  const { workspaceId } = req.params;
  if (!(await checkMembership(workspaceId, req.userId))) {
    return res.status(403).json({ error: "Not a member of this workspace" });
  }
  const task = await Task.findOneAndDelete({ _id: req.params.id, workspace: workspaceId });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json({ message: "Task deleted" });
};