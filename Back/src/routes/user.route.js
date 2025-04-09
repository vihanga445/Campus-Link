import express from "express";
import {
  updateUser,
  deleteUser,
  signout,
  getUser,
  getUsers, // Import getUsers
 } from "../controller/user.controller.js";
import { verifyToken } from "../../utils/verifyUser.js";

const router = express.Router();

router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signout);
router.get("/:userId", getUser);
router.get("/getusers", verifyToken, getUsers); // Use getUsers here

export default router;
