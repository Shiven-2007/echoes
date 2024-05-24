import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
const app = express();
const server = createServer(app);
const io = new Server(server);
const __dirname = dirname(fileURLToPath(import.meta.url));


app.use(express.static("dist"));


app.get("/", (req, res) => {
	const roomid = Math.random().toString(36).substring(7);
	res.sendFile(join(__dirname, "dist/index.html"));
});

app.get("/phone/:roomid", (req, res) => {
    res.sendFile(join(__dirname, "dist/mobile/index.html"));
});
app.get("/pc/:roomid", (req,res)=>{
	res.sendFile(join(__dirname, "dist/pc/index.html"))
})
io.on("connection", (socket) => {
	console.log("a user connected");
	
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
	socket.on("create", async (room) => {
		socket.join(room);
        io.to(room).emit("number", (await io.in(room).fetchSockets()).length);
		
	});
	
	socket.on("mynotification", (room)=>{
		io.to(room).emit("mynotification", room)
	})

	socket.on("photoNotification", (row ,room)=>{
		io.to(room).emit("triggerPhotoNotification", row)
	})

	socket.onAny((eventName, ...args) => {
		console.log(eventName);
		console.log(args);
	  });
	  socket.onAnyOutgoing((eventName, ...args) => {
		console.log(eventName); 
		console.log(args); 
	  });
});

server.listen(3000, () => {
	console.log("server running at http://localhost:3000");
});
