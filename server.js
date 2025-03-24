const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
});

app.get("/skills", (req, res) => {
  res.sendFile(path.join(__dirname, "skills.html"));
});

app.get("/projects", (req, res) => {
  res.sendFile(path.join(__dirname, "projects.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

// API endpoint for contact form
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  // Here you would typically send an email or store the message in a database
  // For this example, we'll just log it and return a success response
  console.log("Contact form submission:", { name, email, subject, message });

  // Simulate a delay for demonstration purposes
  setTimeout(() => {
    res.json({
      success: true,
      message:
        "Your message has been sent successfully! I will get back to you soon.",
    });
  }, 1000);
});

// Handle 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
