import express from "express";
import { createLostFound } from "../controller/lostfound.controller.js";

const router = express.Router();

// Route to create a lost/found entry
router.post("/", createLostFound);

export default router;
