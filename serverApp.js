var http = require("http");
var server = http.createServer(function (req, res) {
    res.write("Hello World! From scoket.io app"); //write a response to the client
    res.end(); //end the response
});

var io = require("socket.io").listen(server);

const port = 4000;

const users = {};
function _removeUserFromUsers(socketId) {
    console.log("_removeUserFromUsers", socketId)
    for (user in users) {
        let userObj = users[user];
        if (userObj.socketId === socketId) {
            delete users[user];
            break;
        }
    }
    io.emit("users-updated", Object.keys(users));
}
io
    .sockets
    .on("connection", function (socket) {
        console.log("A client is connected!", socket.id);

        socket.on('private-message', function (msgObj) {
            if (msgObj.to in users) {
                const toUser = users[msgObj.to];
                const socketId = toUser.socketId;
                io
                    .to(`${socketId}`)
                    .emit('private-message', msgObj);
            }
        })

        socket.on("user-register", function (user) {
            console.log("user-register", user.userName)
            if (!(user.userName in users)) {
                users[user.userName] = {
                    socketId: socket.id,
                    userName: user.userName
                }
                io
                    .to(`${socket.id}`)
                    .emit('user-success', true);
            } else {
                io
                    .to(`${socket.id}`)
                    .emit('error-from-socket', 'Username already exist!');
            }
            io.emit('users-updated', Object.keys(users))
        });
        socket.on('user-logout', function (user) {
            _removeUserFromUsers(socket.id);
        })

        socket.on("disconnect", function () {
            _removeUserFromUsers(socket.id)
        });
    });

server.listen(port, () => console.log(`Example app listening on port ${port}!`));
