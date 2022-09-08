const {Server}=require("socket.io");

const io=new Server(3000,{cors: {
    // origin: "http://localhost:5500"
  }});

io.on("connection",(socket)=>{

  socket.on("mobile-scan",(room)=>{
    socket.join(room);
    io.to(room).emit("transfer-ready");
  })

  socket.on("qr-generate",(room)=>{
    socket.join(room);
  });

  socket.on("transfer",({room,message,file,device})=>{
    console.log(room,message,file,device);
    io.to(room).emit("receive",message,file,device);
    console.log(1500);
  })


  

});

