const express = require("express");
const cors = require("cors");
const events = require("events");
const PORT = 3000;

const emitter = new events.EventEmitter();
const app = express();
app.use(cors());
app.use(express.json());

//get messages
app.get("/get-messages", (req, res) => {
  emitter.once("newMessage", (message) => {
    console.log(message);
    res.json(message);
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
