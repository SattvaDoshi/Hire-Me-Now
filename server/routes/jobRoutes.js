import express from "express";
import {
  deleteJob,
  getAllJobs,
  getMyJobs,
  getSingleJob,
  postJob,
  updateJob,
} from "../controllers/jobController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/get-all", getAllJobs);
router.post("/create-job", isAuthenticated, postJob);
router.get("/myJobs", isAuthenticated, getMyJobs);
router.put("/update-job/:id", isAuthenticated, updateJob);
router.delete("/delete/:id", isAuthenticated, deleteJob);
router.get("/:id", isAuthenticated, getSingleJob);

export default router;
