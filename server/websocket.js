const ws = require("ws");

const webSocketServer = new ws.Server(
  {
    port: 3000,
  },
  () => console.log("Server started on port 3000")
);

webSocketServer.on("connection", function connection(ws) {
  ws.on("message", function (message) {
    message = JSON.parse(message);
    switch (message.event) {
      case "message":
        broadcastMessage(message);
        break;
      case "connection":
        broadcastMessage(message);
        break;
    }
  });
});

const message = {
  event: "message/connection",
  id: 123,
  date: "08/04/2021",
  username: "alex",
  message: "message",
};

//делаю широковезательное сообщение всем пользователям
function broadcastMessage(message) {
  webSocketServer.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
}
