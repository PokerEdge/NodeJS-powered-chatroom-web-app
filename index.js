let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


let port = process.env.PORT || 3000;

http.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

io.on('connection', (socket) => {
    // console.log('Connected.')

    // socket.on('disconnect', () => {
    //     console.log('Disconnected.');
    // });

    io.emit('connections', Object.keys(io.sockets.connected).length);

    socket.on('Created', (data) => {
        socket.broadcast.emit('Created', (data));
    });

    socket.on('chat-message', (data) => {
        socket.broadcast.emit('chat-message', (data));
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', (data));
    });

    socket.on('stoptyping', (data) => {
        socket.broadcast.emit('stoptyping', (data));
    });
    
    socket.on('joined', (data) => {
        socket.broadcast.emit('joined', (data));
    });
    
    socket.on('exited', (data) => {
        socket.broadcast.emit('exited', (data));
    });
});