const express = require("express");

const app = express();
app.use(express.json());

// Temporary server memory.
// A Set stores unique values.
// Restarting the backend creates a new, empty Set.
const joinedEvents = new Set();

const validEvents = new Set([
  "web-workshop",
  "design-coffee",
  "community-event"
]);

// PRACTICE 1: Return information from the server.
app.get("/api/hello", (req, res) => {
  res.set("Cache-Control", "no-store");

  res.json({
    // TODO 1: Replace the text inside the quotes with your own greeting.
    // Keep the property name "greeting" unchanged.
    greeting: "CHANGE ME"
  });
});

// Prepared for you:
// React reads these registrations when the page opens.
app.get("/api/signups", (req, res) => {
  res.set("Cache-Control", "no-store");

  res.json({
    eventIds: [...joinedEvents]
  });
});

// PRACTICE 2: Receive and remember a registration.
app.post("/api/signups", (req, res) => {
  const eventId = req.body?.eventId;

  // Prepared for you: check that the event exists.
  if (typeof eventId !== "string" || !validEvents.has(eventId)) {
    return res.status(400).json({
      error: "Please choose a valid event."
    });
  }

  // TODO 2: Add one line that stores eventId in joinedEvents.
  // Hint: a Set has an .add(value) method.


  console.log("POST /api/signups received:", eventId);

  // Report whether the server actually remembered this event.
  res.json({
    eventId,
    joined: joinedEvents.has(eventId)
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});