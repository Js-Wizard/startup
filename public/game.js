class Game
{
    constructor()
    {
        this.board = document.querySelector(".board");
        this.maxNumber = 30;
        this.numPlayers = Number(localStorage.getItem("player-count") ?? 1);
        this.userName = localStorage.getItem("user") ?? "Player 1";
        this.guestName = localStorage.getItem("2p-name") ?? "Player 2";
        this.reset();
    }

    reset()
    {
        this.userTurn = true;
        this.allowInput = false;
        this.usedNumbers = new Array(this.maxNumber).fill(false);
        this.currentNumber = 0;
        this.updateText();
        this.updateBoard();
        this.allowInput = true;
    }

    updateText()
    {
        const textEl = document.getElementById("game-text");
        let playerText = '';

        if (this.numPlayers === 1)
        {
            if (this.userTurn)
            {
                playerText = "Your";
            }
            else
            {
                playerText = "CPU's";
            }
        }
        else
        {
            if (this.userTurn)
            {
                playerText = this.userName + "'s";
            }
            else
            {
                playerText = this.guestName + "'s";
            }
        }

        textEl.textContent = playerText + " Turn";
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

    doMove(idx)
    {
        if (!this.isValid(idx)) { return; }

        this.allowInput = false;
        this.usedNumbers[this.currentNumber - 1] = true;
        this.currentNumber = idx + 1;
        this.userTurn = !this.userTurn;

        this.updateText();
        this.updateBoard();

        if (this.numPlayers === 1 && !this.userTurn)
        {
            
        }
        else
        {
            this.allowInput = true;
        }
    }
}

const game = new Game();