const express = require("express");
const cors = require("cors");
const events = require("events");
const PORT = 3000;

const emitter = new events.EventEmitter();
const app = express();
app.use(cors());
app.use(express.json());

//get messages
app.get("/connect", (req, res) => {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });
  emitter.on("newMessage", (message) => {
    res.write(`data: ${JSON.stringify(message)} \n\n`);
  });
});

//send messages
app.post("/new-messages", (req, res) => {
  const message = req.body;
  emitter.emit("newMessage", message);
  console.log(message);
  res.status(200).json(message);
});

app.listen(PORT, () => console.log("listening on port " + PORT));
