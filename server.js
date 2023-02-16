const {Server}=require("socket.io");

const io=new Server(3000,{
    maxHttpBufferSize: 1e800000000000000,
    pingTimeout:30000,
    cors: {
    origin: "*"
}});

io.on("connection",(socket)=>{
  console.log(`New Connection Established with socket id ${socket.id}`);

  socket.on("mobile-scan",(room)=>{
    socket.join(`${room}`);
    console.log(`Scan Received.Room ${room}  joined my mobile.`);
    io.to(`${room}`).emit("transfer-ready");
  });

  socket.on("qr-generate",(room)=>{
    socket.join(`${room}`);
    console.log(`QR Generated.Room ${room} joined by the PC`);
  });

  socket.on("transfer",({room,message,file,device})=>{
    console.log(room,message,file,device);
    io.to(`${room}`).emit("receive",message,file,device);
  });

});

