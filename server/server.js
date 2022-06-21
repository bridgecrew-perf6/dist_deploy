const io = require('socket.io')(3001, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});
// The server wil have the port 3001 that differs than the client 3000 
// so they will have different url  so we are going to use cors as it will give us the ability to request from a server that have
// differnt url // Then we are going to specifiy what method will the client be able to get through --> GET REQUEST AND POST REQUEST
// Origin is our Actual client


io.on("connection", socket=> {}
)
// every time the client is going to connect it will run this i o connection sp we gave it a socket 
// this socket is how we communicate back to the client