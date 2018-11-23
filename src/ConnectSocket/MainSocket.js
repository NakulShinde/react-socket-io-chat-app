import socketIOClient from "socket.io-client";
const socket = socketIOClient('http://127.0.0.1:4000');

socket.on('connect', () => {
    console.log("server socket back online")
});

function subscribeToDisconnect(callback) {
    socket.on('disconnect', data => {
        console.log("server socket disconnected")
        callback(data);
    });
}

function isSocketActive(){
    return socket.connected;
}

function subscribeToUserRegister(callback) {
    socket.on('user-register', user => callback(user));
}

function publishToUserRegister(data) {
    socket.emit('user-register', data);
}

function subscribeToPrivateMessages(callback) {
    socket.on('private-message', msgObj => callback(msgObj));
}

function publishToPrivateMessages(data) {
    socket.emit('private-message', data);
}

function subscribeToUserRegisterResponse(callback) {
    socket.on('user-success', user => callback(user));
}

function subscribeToUserListUpdate(callback) {
    socket.on('users-updated', user => callback(user));
}

function subscribeToErrors(callback) {
    socket.on('error-from-socket', user => callback(user));
}

function publishToLogout(user) {
    socket.emit('user-logout', user);
}

export {
    isSocketActive,
    subscribeToDisconnect,
    subscribeToUserRegister, 
    publishToUserRegister, 
    subscribeToUserRegisterResponse,
    subscribeToUserListUpdate,
    subscribeToErrors,
    subscribeToPrivateMessages,
    publishToPrivateMessages,
    publishToLogout
};