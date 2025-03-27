import { Router } from "express";
import {
  getEvents,
  createEvent,
  getEvent,
  deleteEvent,
  updateEvent,
  deleteOneImage
} from "../controllers/event.controller.js";

const router = Router();

router.get("/", getEvents);
router.post("/", createEvent);

router.get("/:id", getEvent);
router.delete("/:id", deleteEvent);
router.put("/:id", updateEvent);

router.delete("/delete-image/:img(*)", deleteOneImage);

export default router;
