# react-socket-io-chat-app
A browser based chatting app.

Tech stack used:
- React
- Socket.io-client
- Socket.io (as a node service with http server)
- CSS in JS
- Unit testing with jest & enzyme

Functionality
- User Register
- See active user/friends list
- Search in active usrs
- Chat with selected user
- Dynamic notification for new user chat msg
- Auto scroll
- more than 80% code coverage (See attached image below)

- Note: 
  - Unique userName restriction added for chat app. It will throw error on duplicate userNames. (If nothing happening on user register check if socket.io is running on http://localhost:4000 by visiting this in browser shows "Hello World! From scoket.io app". if not some issue with running node-socket.io service )
  - User registration and registration sucess & error are handled over socket.io events for now. [TODO: user registration REST API]
  - If node server/socket.io fails. All user gets 'disconnected' events over socket.io and all goes in logged out state. And user wont be able to register/use it until node service comes up.

Steps to Install:
- #npm install
- #npm start
- visit http://localhost:3000

Unit testing:
- #npm test 

Test Coverage Report:
- #npm test -- --coverage

![chat app code coverage](https://user-images.githubusercontent.com/3436316/48983171-9e74e880-f111-11e8-8996-f022d4142dbd.PNG)


# App Running Screenshot

![chat app capture](https://user-images.githubusercontent.com/3436316/48983081-5c977280-f110-11e8-9796-54670e7e7efa.PNG)
