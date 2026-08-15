import Workspace from "../models/Workspace.js";
import User from "../models/User.js";

export const createWorkspace = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Workspace name is required" });

    const workspace = await Workspace.create({
      name,
      owner: req.userId,
      members: [req.userId],
    });
    res.status(201).json(workspace);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({ members: req.userId }).sort({ createdAt: -1 });
    res.json(workspaces);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addMember = async (req, res) => {
  try {
    const { email } = req.body;
    const workspace = await Workspace.findById(req.params.id);
    if (!workspace) return res.status(404).json({ error: "Workspace not found" });

    if (String(workspace.owner) !== req.userId) {
      return res.status(403).json({ error: "Only the owner can add members" });
    }

    const userToAdd = await User.findOne({ email });
    if (!userToAdd) return res.status(404).json({ error: "No user found with that email" });

    if (workspace.members.includes(userToAdd._id)) {
      return res.status(400).json({ error: "User is already a member" });
    }

    workspace.members.push(userToAdd._id);
    await workspace.save();
    res.json(workspace);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};