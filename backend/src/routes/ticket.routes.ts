import { Router } from "express";
import { authMiddleware, isOrganizer } from "../middlewares";
import { TicketRepository } from "../repositories";
import { TicketService } from "../services";
import { TicketController } from "../controllers";

export const ticketRouter = Router();

const ticketRepo = new TicketRepository();
const ticketRepoService = new TicketService(ticketRepo);
const ticketController = new TicketController(ticketRepoService);

ticketRouter.get(
  "/my",
  authMiddleware,
  ticketController.getMyEventTickets.bind(ticketController)
);
ticketRouter.get(
  "/event/:eventId",
  ticketController.getEventTickets.bind(ticketController)
);
ticketRouter.post(
  "/validate",
  authMiddleware,
  isOrganizer,
  ticketController.validateTicket.bind(ticketController)
);
