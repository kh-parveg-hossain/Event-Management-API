import prisma from "../utils.js/db.js";

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: "Name and email are required" });

    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const user = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { registration: { include: { event: true } } },
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    const registeredEvents = user.registration.map(r => r.event);
    res.json({ ...user, registeredEvents: registeredEvents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// List all users
const listUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export { createUser, getUserById, listUsers };
