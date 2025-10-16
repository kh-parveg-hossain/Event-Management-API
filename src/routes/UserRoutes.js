import express from "express";
import { createUser, getUserById, listUsers } from "../controllers/usercontroller.js";




const userrouter = express.Router();
/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: xL2oI@example.com
 *             required:
 *               - name
 *               - email
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already exists
 */
userrouter.post("/register",createUser);
/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: John Doe  
 *                 email:
 *                   type: string
 *                   example: xL2oI@example.com
 *                 registeredEvents:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:  
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "Tech Conference 2025"
 *                       dateTime:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-12-01T10:00:00.000Z"
 *                       location:
 *                         type: string
 *                         example: "Kolkata"
 *                       capacity:
 *                         type: number
 *                         example: 200
 *                     required:
 *                       - id
 *                       - title
 *                       - dateTime
 *                       - location
 *                       - capacity
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-01-01T10:00:00.000Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-01-01T10:00:00.000Z"
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 *      

 * */
userrouter.get("/user/:id",getUserById);
/** 
*  @swagger
*  /api/user:
*    get:
*      summary: List all users
*      tags:
*        - Users
*      responses:
*        200:
*          description: List of users
* */
userrouter.get("/user",listUsers);
export default userrouter