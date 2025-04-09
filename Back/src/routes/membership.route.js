import express from "express";
import { applyForMembership } from "../controller/membershipController.js";

const router = express.Router();

router.post("/apply", applyForMembership);

export default router;
