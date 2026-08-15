import express from "express";
import { createWorkspace, getMyWorkspaces, addMember } from "../controllers/workspaceController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();
router.use(requireAuth);

router.post("/", createWorkspace);
router.get("/", getMyWorkspaces);
router.post("/:id/members", addMember);

export default router;