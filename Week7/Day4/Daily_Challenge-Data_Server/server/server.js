const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS for React client
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// GET endpoint - Part I
app.get("/api/hello", (req, res) => {
  console.log("GET /api/hello received");
  res.json({ message: "Hello From Express" });
});

// POST endpoint - Part II
app.post("/api/world", (req, res) => {
  console.log("POST /api/world received");
  console.log("Request body:", req.body);

  const inputValue = req.body.post || req.body.value || "";
  const responseMessage = `I received your POST request. This is what you sent me: ${inputValue}`;

  res.json({ message: responseMessage });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
