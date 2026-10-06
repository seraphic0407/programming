import type { Request, Response } from "express";
import { EventRepository } from "../repositories/events.repository.js";

export const getAllEvents = async (_req: Request, res: Response) => {
  const events = await EventRepository.findAll();

  res.status(200).json({
    success: true,
    data: events,
  });
};

export const getEventById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    res.status(400).json({
      success: false,
      message: "ID event tidak valid",
    });
    return;
  }

  const event = await EventRepository.findById(id);

  if (!event) {
    res.status(404).json({
      success: false,
      message: "Event tidak ditemukan",
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: event,
  });
};

export const createEvent = async (req: Request, res: Response) => {
  const event = await EventRepository.create(req.body);

  res.status(201).json({
    success: true,
    message: "Event berhasil dibuat",
    data: event,
  });
};
