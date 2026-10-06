import { Router } from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
} from "../controllers/events.js";
import { validateBody } from "../middlewares/validateBody.js";
import { postEventSchema } from "../schema/events.js";

export const eventRouter = Router();

eventRouter.get("/", getAllEvents);
eventRouter.post("/", validateBody(postEventSchema), createEvent);
eventRouter.get("/:id", getEventById);
