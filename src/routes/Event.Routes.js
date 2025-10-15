import express from "express";
import { cancelRegistration, createEvent, getEvents, getEventStats, listUpcomingEvents, registerEvent } from "../controllers/event.controller.js";




const eventrouter = express.Router();

/**
 * @swagger
 * /api/create-event:
 *   post:
 *     summary: Create an event
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Tech Conference 2025"
 *               dateTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-12-01T10:00:00.000Z"
 *               location:
 *                 type: string
 *                 example: "Kolkata"
 *               capacity:
 *                 type: number
 *                 example: 200
 *             required:
 *               - title
 *               - dateTime
 *               - location
 *               - capacity
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Bad request
 */
 eventrouter.post("/create-event",createEvent);
 /**
  * @swagger
  * /api/event/{id}:
  *   get:
  *     summary: Get event details by ID
  *     tags:
  *       - Events
  *     parameters:
  *       - name: id
  *         in: path
  *         description: ID of the event
  *         required: true
  *         schema:
  *           type: integer
  *     responses:
  *       200:
  *         description: Event details
  *       404:
  *         description: Event not found
  * 
  */
eventrouter.get("/event/:id",getEvents);
/**
 * @swagger
 * /api/event/register:
 *   post:
 *     summary: Register for an event
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               eventId:
 *                 type: integer
 *                 example: 1
 *             required:
 *               - userId
 *               - eventId
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: User already registered
 *       404:
 *         description: Event or user not found
 */
eventrouter.post("/event/register",registerEvent);
/**
 * @swagger
 * /api/event/delete:
 *   post:
 *     summary: Cancel registration for an event
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               eventId:
 *                 type: integer
 *                 example: 1
 *             required:
 *               - userId
 *               - eventId
 *     responses:
 *       200:
 *         description: Registration cancelled
 *       404:
 *         description: User not registered for this event
 * */
eventrouter.post("/event/delete",cancelRegistration);
/**
 * @swagger
 * /api/event/allevent/upcoming:
 *   get:
 *     summary: Get all upcoming events
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: List of upcoming events
 * */
eventrouter.get("/event/allevent/upcoming",listUpcomingEvents);
/**
 * @swagger
 * /api/event/allevent/upcoming/{id}:
 *   get:
 *     summary: Get all upcoming events for a specific user
 *     tags:
 *       - Events   
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of upcoming events for the user
 * */
eventrouter.get("/event/allevent/upcoming/:id",getEventStats);


export default eventrouter