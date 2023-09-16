# Fim

## Description deliverable

### Elevator pitch

Games like Chess and Go have been around for centuries, but they lack one thing: simplicity. I present a game which is the solution. Fim is a pure strategy game that is very difficult to master, but it is easy to learn and each game takes only a few minutes. It's so simple, it can easily be played with pencil and paper! Each move consists of choosing a number, which is a simple click of a button on a computer interface. You can play a quick game with a friend, or practice your skills against a computer opponent.

### Design

![Login Page](loginPage.png)

![Game Page](gamePage.png)

### Key Features

- Secure login over HTTPS
- Choose game mode
  - Local 2-player play
  - Play against a computer algorithm
- Fim game
  - Display whose turn it is
  - Display grid of numbers, with buttons corresponding to possible moves
  - Take turn by clicking a valid number
- Wins and losses for each account persistently stored
- Live game results from other users

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Used for application structure, with at least a login page and game page.
- **CSS** - Used for application style with a consistent color scheme, accomodating different device dimensions.
- **JavaScript** - Used for login and other endpoint calls, as well as the game logic and computer opponent algorithm.
- **Service** - Backend service with endpoints for:
  - login
  - retrieving win/loss numbers
  - submitting a game result
- **DB** - Securely store users and win/loss information in a database.
- **Login** - Register and login users. Services other than login accessible when authenticated. Display user information on game page.
- **WebSocket** - When a game is finished, a message is sent to all users indicating the user who finished the game, whether they won or lost, and the amount of turns if they won.
- **React** - Application ported to use the React web framework.

## Notes for exams
[Notes](notes.md)
