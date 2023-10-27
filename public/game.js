class Game
{
    constructor()
    {
        this.allowInput = false;
        this.board = document.querySelector(".board");
        this.gameText = document.getElementById("game-text");
        this.options = document.querySelector(".game-end-options");
        this.maxNumber = 30;
        this.numPlayers = Number(localStorage.getItem("player-count") ?? 1);
        this.userName = localStorage.getItem("user");
        if (!this.userName) { this.userName = "Player 1"; }
        this.guestName = localStorage.getItem("2p-name");
        if (!this.guestName) { this.guestName = "Player 2"; }
        this.reset();
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
            else if (this.isValid(i))
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

    isValid(idx)
    {
        if (this.currentNumber === 0)
        {
            return idx !== 0;
        }

        const num = idx + 1;
        return !this.usedNumbers[idx] && num !== this.currentNumber
            && (this.currentNumber % num === 0 || this.usedNumbers[num - this.currentNumber - 1]);
    }

    validMoveExists()
    {
        for (let i = 0; i < this.maxNumber; i++)
        {
            if (this.isValid(i))
            {
                return true;
            }
        }

        return false;
    }

    doMove(idx)
    {
        if (!this.isValid(idx)) { return; }

        this.allowInput = false;
        this.usedNumbers[this.currentNumber - 1] = true;
        this.currentNumber = idx + 1;
        this.userTurn = !this.userTurn;

        this.updateText();
        this.updateBoard();

        if (!this.validMoveExists())
        {
            this.endGame();
            return;
        }

        if (this.numPlayers === 1 && !this.userTurn)
        {

        }
        else
        {
            this.allowInput = true;
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
        }
        else
        {
            this.gameText.style = "color: red; text-shadow: 0px 0px 3px red;";
        }

        this.options.style = "display: block";
    }
}

const game = new Game();