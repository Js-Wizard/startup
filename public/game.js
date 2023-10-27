class Game
{
    constructor()
    {
        this.board = document.querySelector(".board");
        this.maxNumber = 30;
        this.numPlayers = localStorage.getItem("player-count") ?? 1;
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
                btn.addEventListener("click", () => this.doMove(i));

                cell.appendChild(btn);
            }

            this.board.appendChild(cell);
        }
    }

    isValid(idx)
    {
        return true;
    }

    doMove(idx)
    {
        return;
    }
}

const game = new Game();