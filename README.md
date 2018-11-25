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
  - unique userName restriction added for chat app. It will throw error on duplicate userNames
  - User registration and registration sucess & error are handled for this app only. [TODO: user registration REST API]

Steps to Install:
- #npm install
- #npm start

Unit testing:
- #npm test 

Test Coverage Report:
- #npm test -- --coverage

![chat app code coverage](https://user-images.githubusercontent.com/3436316/48983171-9e74e880-f111-11e8-8996-f022d4142dbd.PNG)


# App Running Screenshot

![chat app capture](https://user-images.githubusercontent.com/3436316/48983081-5c977280-f110-11e8-9796-54670e7e7efa.PNG)
