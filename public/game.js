"use strict";

// Event messages
const WinEvent = 'win';
const LossEvent = 'loss';

class Game
{
    constructor()
    {
        if (window.Worker)
        {
            this.worker = new Worker("cpu.js");
            this.worker.onmessage = (e) => {
                setTimeout(() => { this.cpuMove(e.data); }, 1000);
            }
        }
        this.allowInput = false;
        this.board = document.querySelector(".board");
        this.gameText = document.getElementById("game-text");
        this.options = document.querySelector(".game-end-options");
        this.maxNumber = 30;
        this.cpuDepth = 5;
        this.numPlayers = Number(localStorage.getItem("player-count") ?? 1);
        this.userName = localStorage.getItem("user");
        if (!this.userName) { this.userName = "Player 1"; }
        this.guestName = localStorage.getItem("2p-name");
        if (!this.guestName) { this.guestName = "Player 2"; }
        this.reset();

        this.configureWebSocket();
    }

    reset()
    {
        this.userTurn = true;
        this.usedNumbers = new Array(this.maxNumber).fill(false);
        this.currentNumber = 0;
        this.gameText.style = "";
        this.options.style = "";
        this.updateText();
        this.updateBoard();
        this.allowInput = true;
    }

    updateText()
    {
        this.gameText.textContent = this.playerText(true) + " Turn";
    }

    playerText(isPossessive)
    {
        if (this.numPlayers === 1)
        {
            if (this.userTurn)
            {
                return "You" + (isPossessive ? "r" : "");
            }
            else
            {
                return "CPU" + (isPossessive ? "'s" : "");
            }
        }
        else
        {
            if (this.userTurn)
            {
                return this.userName + (isPossessive ? "'s" : "");
            }
            else
            {
                return this.guestName + (isPossessive ? "'s" : "");
            }
        }
    }

    updateBoard()
    {
        this.board.innerHTML = '';
        for (let i = 0; i < this.maxNumber; i++)
        {
            const cell = document.createElement("div");
            cell.textContent = i + 1;

            if (this.usedNumbers[i])
            {
                cell.className = "inactive-number";
            }
            else if (i + 1 === this.currentNumber)
            {
                cell.className = "current-number";
            }
            else if (isValid(i, this.usedNumbers, this.currentNumber))
            {
                cell.textContent = '';

                const btn = document.createElement("button");
                btn.textContent = i + 1;
                btn.className = "btn btn-outline-light";
                btn.addEventListener("click", () => { if(this.allowInput) { this.doMove(i); } });

                cell.appendChild(btn);
            }

            this.board.appendChild(cell);
        }
    }

    doMove(idx)
    {
        if (!isValid(idx, this.usedNumbers, this.currentNumber)) { return; }

        this.allowInput = false;
        this.usedNumbers[this.currentNumber - 1] = true;
        this.currentNumber = idx + 1;
        this.userTurn = !this.userTurn;

        this.updateText();
        this.updateBoard();

        if (!validMoveExists(this.usedNumbers, this.currentNumber))
        {
            this.endGame();
            return;
        }

        if (this.numPlayers === 1 && !this.userTurn)
        {
            if (window.Worker)
            {
                this.worker.postMessage([this.cpuDepth, this.usedNumbers, this.currentNumber]);
            }
            else
            {
                setTimeout(() => { this.cpuMove(optimalMove(this.cpuDepth, this.usedNumbers, this.currentNumber)); }, 1000);
            }
        }
        else
        {
            this.allowInput = true;
        }
    }

    cpuMove(idx)
    {
        if (idx >= 0)
        {
            this.doMove(idx);
        }
        else
        {
            console.error("No cpu moves found");
        }
    }

    endGame()
    {
        this.userTurn = !this.userTurn;
        const playerText = this.playerText(false);
        this.gameText.textContent = playerText + " win" + (playerText === "You" ? "" : "s") + "!";

        if (this.userTurn)
        {
            this.gameText.style = "color: green; text-shadow: 0px 0px 3px green;";
            win();
        }
        else
        {
            this.gameText.style = "color: red; text-shadow: 0px 0px 3px red;";
            lose();
        }

        this.options.style = "display: block";
    }



    configureWebSocket() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

        this.socket.onmessage = async (event) => {
          const msg = JSON.parse(await event.data.text());
          if (msg.type === WinEvent) {
            this.displayMsg(msg.from, `won in ${msg.value} turns!`);
          } else if (msg.type === LossEvent) {
            this.displayMsg(msg.from, `lost...`);
          }
        };
      }
    
      displayMsg(from, msg) {
        const logText = document.querySelector('.log');
        logText.innerHTML =
        `<li><span class="player-name">${from}</span> ${msg}</li>`; + chatText.innerHTML;
      }
    
      broadcastEvent(from, type, value) {
        const event = {
          from: from,
          type: type,
          value: value,
        };
        this.socket.send(JSON.stringify(event));
      }
}

const game = new Game();