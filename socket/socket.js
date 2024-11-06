const io = require("socket.io")(8000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let users = [];

const addUser = (id, userInfo, socketId) => {
  const checkUser = users.some((u) => u.id === id);

  if (!checkUser) {
    users.push({ id, userInfo, socketId });
  }
};

const userRemove = (socketId) => {
  users = users.filter((u) => u.socketId !== socketId);
};

const findFriend = (id) => {
  return users.find((u) => u.id === id);
};
const userLogout = (userId) => {
  users = users.filter((u) => u.id !== userId);
};

io.on("connection", (socket) => {
  console.log("socket is running");
  socket.on("addUser", (id, myInfo) => {
    addUser(id, myInfo, socket.id);
    io.emit("getUser", users);
  });

  socket.on("sendChat", (data) => {
    console.log(data);
    const user = findFriend(data.recieverId);
    if (user) {
      socket.to(user.socketId).emit("getChat", {
        senderId: data.senderId,
        senderName: data.senderName,
        recieverId: data.recieverId,
        createdAt: data.time,
        message: {
          text: data.message.text,
          image: data.message.image,
        },
      });
    }
  });

  socket.on("logout", (userId) => {
    console.log("asdfsdfdfaaaaaaaaaaaaa", userId);
    userLogout(userId);
    console.log(users);
  });
  socket.on('messageSeen',msg =>{
    const user = findFriend(msg.senderId);          
    if(user !== undefined){
         socket.to(user.socketId).emit('msgSeenResponse', msg)
    }          
})

socket.on('delivaredMessage',msg =>{
    const user = findFriend(msg.senderId);          
    if(user !== undefined){
         socket.to(user.socketId).emit('msgDelivaredResponse', msg)
    }          
})
socket.on('seen',data =>{
    const user = findFriend(data.senderId);          
    if(user !== undefined){
         socket.to(user.socketId).emit('seenSuccess', data)
    } 
})


  socket.on("disconnect", () => {
    userRemove(socket.id);
    io.emit("getUser", users);
  });
  socket.on("typing", (data) => {
    console.log("typing", data);
    const user = findFriend(data.recieverId);
    if (user) {
      socket.to(user.socketId).emit("typing", {
        senderId: data.senderId,
        recieverId: data.recieverId,
        message: data.msg,
      });
    }
  });
});
