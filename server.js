const {Server}=require("socket.io");

const io=new Server(3000,{cors: {
    origin: "http://127.0.0.1:5500"
  }});

io.on("connection",(socket)=>{console.log(socket.id);});

