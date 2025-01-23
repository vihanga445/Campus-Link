import express from "express";
import { sendInvite } from "../controller/invite.controller.js";

const router = express.Router();

// Route to send an invite
router.post("/", sendInvite);

export default router;
