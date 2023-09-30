# Fim

## Description deliverable

### Elevator pitch

Games like Chess and Go have been around for centuries, but they lack one thing: simplicity. I present a game which is the solution. Fim is a pure strategy game that is very difficult to master, but it is easy to learn and each game takes only a few minutes. It's so simple, it could easily be played with pencil and paper! Each move consists of choosing a number, which is a simple click of a button on a computer interface. You can play a quick game with a friend, or practice your skills against a computer opponent.

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

## HTML deliverable

For this deliverable, I have completed the overall structure of my application using HTML.

- **HTML pages** - There are 6 pages: login (index.html), home, mode select, 2-player setup, play, and how to play.
- **Links** - After logging in, you go to the home page, where there is a menu of options. From there you can go to mode select, how to play, or go back to login. In mode select, the first option takes you directly to the game page, and the second option takes you to 2-player setup first. All pages except login and home have a link in the header to go to home.
- **Text** - The game is made up of a grid of numbers, the how-to-play page contains the rules for the game, and other pages have simple instructions.
- **Images** - I made a `favicon.ico` for the website icon, and a `logo.png` which is used for a logo in the header.
- **Authentication** - The login page has a form with username and password and two buttons, which will be used for sign up / login. When logged in, the home page shows the user's name, with "Molly" as placeholder.
- **Database** - On the play page, there is a section with the user's name and their amount of wins and losses. This information will be stored in a row of a database, so that it is saved even when the user logs out.
- **WebSocket** - On the play page, there is a section that will display live game results, which will be sent to the server and then received by everyone when a game finishes.
- **3rd-Party Service** - There is a placeholder for a random quote on the how-to-play page.

# Notes for exams
[Notes](notes.md)
