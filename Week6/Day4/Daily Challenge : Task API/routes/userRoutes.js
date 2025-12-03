const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const USERS_FILE = path.join(__dirname, "../data/users.json");

// Helper function to read users from file
async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, create it with empty array
    if (error.code === "ENOENT") {
      await writeUsers([]);
      return [];
    }
    throw error;
  }
}

// Helper function to write users to file
async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
}

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// POST /api/register - Register a new user
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !username || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    // Read existing users
    const users = await readUsers();

    // Check if username already exists
    const usernameExists = users.some((user) => user.username === username);
    if (usernameExists) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    // Check if email already exists
    const emailExists = users.some((user) => user.email === email);
    if (emailExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user object
    const newUser = {
      id: generateId(),
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    // Add new user to array
    users.push(newUser);

    // Save to file
    await writeUsers(users);

    // Return success response (without password)
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      message: "Error registering user",
    });
  }
});

// POST /api/login - Login user
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    // Read users
    const users = await readUsers();

    // Find user by username
    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Login successful
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Error during login",
    });
  }
});

// GET /api/users - Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await readUsers();

    // Remove passwords from response
    const usersWithoutPasswords = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    res.json(usersWithoutPasswords);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({
      message: "Error retrieving users",
    });
  }
});

// GET /api/users/:id - Get user by ID
router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const users = await readUsers();

    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      message: "Error retrieving user",
    });
  }
});

// PUT /api/users/:id - Update user by ID
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Don't allow updating password through this endpoint
    if (updates.password) {
      return res.status(400).json({
        message: "Use the change password endpoint to update password",
      });
    }

    const users = await readUsers();
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check if new username already exists (if username is being updated)
    if (updates.username && updates.username !== users[userIndex].username) {
      const usernameExists = users.some(
        (u) => u.username === updates.username && u.id !== id
      );
      if (usernameExists) {
        return res.status(400).json({
          message: "Username already exists",
        });
      }
    }

    // Check if new email already exists (if email is being updated)
    if (updates.email && updates.email !== users[userIndex].email) {
      const emailExists = users.some(
        (u) => u.email === updates.email && u.id !== id
      );
      if (emailExists) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }
    }

    // Update user
    users[userIndex] = {
      ...users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await writeUsers(users);

    // Remove password from response
    const { password, ...updatedUser } = users[userIndex];
    res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({
      message: "Error updating user",
    });
  }
});

module.exports = router;
