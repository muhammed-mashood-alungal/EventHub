import { Router } from "express";
import { EventRepository, TicketRepository, UserRepository } from "../repositories";
import { EventService } from "../services/event/event.service";
import { EventController } from "../controllers";
import { authMiddleware, isOrganizer, validateSchema } from "../middlewares";
import { eventCreateSchema, eventUpdateSchema } from "../schemas/event.schema";
import { TicketService } from "../services";

export const eventRouter = Router();

const eventRepo = new EventRepository();
const userRepo = new UserRepository();
const ticketRepo = new TicketRepository();
const ticketService = new TicketService(ticketRepo);
const eventService = new EventService(eventRepo,userRepo,  ticketService);
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
  "/:eventId",
  authMiddleware,
  isOrganizer,
  validateSchema(eventUpdateSchema),
  eventController.updateEvent.bind(eventController)
);
eventRouter.post(
  "/register/:eventId",
  authMiddleware,
  eventController.registerEvent.bind(eventController)
);
eventRouter.get(
  "/:slug",
  authMiddleware,
  eventController.getEventBySlug.bind(eventController)
);
