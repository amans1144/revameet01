const express = require("express");
const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
const io = require("socket.io")(server);
// Peer

const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.get("/api", (req, res) => {
  res.redirect(`/${uuidv4()}`);
});

app.set("view engine", "ejs");
//app.use(express.static(__dirname + "/public"));
app.use("/peerjs", peerServer);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);

    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message);
    });
  });
});
// heroku----------- work to serve react
const path = require("path");
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
// adding middleware ----------*********
const whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",

  "https://shrouded-journey-38552.heroku",
];
// const corsOptions = {
//   origin: function (origin, callback) {
//     console.log("** Origin of request " + origin);
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       console.log("Origin acceptable");
//       callback(null, true);
//     } else {
//       console.log("Origin rejected");
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// app.use(express.static(path.resolve(__dirname, "../client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
// });

server.listen(process.env.PORT || 3001);
