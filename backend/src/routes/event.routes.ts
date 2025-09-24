import { Router } from "express";
import { EventRepository } from "../repositories";
import { EventService } from "../services/event/event.service";
import { EventController } from "../controllers";
import { authMiddleware, isOrganizer, validateSchema } from "../middlewares";
import { eventCreateSchema, eventUpdateSchema } from "../schemas/event.schema";

const eventRouter = Router();

const eventRepo = new EventRepository();
const eventService = new EventService(eventRepo);
const eventController = new EventController(eventService);

eventRouter.get("/", eventController.getAllEvents.bind(eventController));
eventRouter.post(
  "/",
  authMiddleware,
  isOrganizer,
  validateSchema(eventCreateSchema),
  eventController.createEvent.bind(eventController)
);
eventRouter.get(
  "/my",
  authMiddleware,
  isOrganizer,
  eventController.getMyEvents.bind(eventController)
);
eventRouter.put(
  "/:id",
  authMiddleware,
  isOrganizer,
  validateSchema(eventUpdateSchema),
  eventController.updateEvent.bind(eventController)
);
eventRouter.post(
  "/register",
  authMiddleware,
  eventController.registerEvent.bind(eventController)
);
eventRouter.get(
  "/:slug",
  authMiddleware,
  eventController.getEventBySlug.bind(eventController)
);

export default eventRouter;
