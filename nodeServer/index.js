//node server which will handle socket io connection
const io = require('socket.io')(8000,{ cors: { origin: '*' } })
const users={};






io.on('connection', socket=>{           //listen to all the connection like rohit,mohit etc...
    
    socket.on('new-user-joined', name=>{ 
        // console.log("New user", name);      //connection hogya ab aage kya krna hai o batayega
        users[socket.id]=name;              //name set kr rha hai user ke under
        socket.broadcast.emit('user-joined',name); //koi join karega toh sabko mesg jyega
        
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name: users[socket.id]})
        
    });
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
        
    });
})