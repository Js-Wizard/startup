import React from 'react';

import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const WinEvent = 'win';
const LossEvent = 'loss';
const maxNumber = 30;
const cpuDepth = 5;

export function Game({ userName, onWin, onLose, onBroadcast })
{
    const [gameTextStyle, setGameTextStyle] = React.useState({});
    const [gameOver, setGameOver] = React.useState(false);
    const [worker, setWorker] = React.useState(null);
    const [allowInput, setAllowInput] = React.useState(false);
    const [userTurn, setUserTurn] = React.useState(true);
    const [usedNumbers, setUsedNumbers] = React.useState([]);
    const [currentNumber, setCurrentNumber] = React.useState(0);
    const [turnNumber, setTurnNumber] = React.useState(0);
    const [pendingMove, setPendingMove] = React.useState(-1);

    const numPlayers = Number(localStorage.getItem("player-count") ?? 1);
    const name2 = localStorage.getItem("2p-name");
    const displayName = userName ? userName : "Player 1";
    const displayName2 = name2 ? name2 : "Player 2";

    React.useEffect(() => {
        if (window.Worker)
        {
            const newWorker = new Worker("/src/play/cpu.js");
            newWorker.onmessage = (e) => {
                setTimeout(() => { setPendingMove(e.data); }, 1000);
            }
            setWorker(newWorker);
        }

        reset();
    }, []);

    React.useEffect(() => {
        if (pendingMove >= 0)
        {
            cpuMove(pendingMove);
            setPendingMove(-1);
        }
    }, [pendingMove])

    function reset()
    {
        setGameOver(false);
        setUserTurn(true);
        setUsedNumbers(new Array(maxNumber).fill(false));
        setCurrentNumber(0);
        setGameTextStyle({});
        setAllowInput(true);
        setTurnNumber(0);
    }

    function playerText(isPossessive)
    {
        if (numPlayers === 1)
        {
            if (userTurn)
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
            if (userTurn)
            {
                return displayName + (isPossessive ? "'s" : "");
            }
            else
            {
                return displayName2 + (isPossessive ? "'s" : "");
            }
        }
    }

    function doMove(idx)
    {
        if (!isValid(idx, usedNumbers, currentNumber)) { return; }

        setAllowInput(false);
        let newUsedNumbers = usedNumbers.slice();
        newUsedNumbers[currentNumber - 1] = true;

        setUsedNumbers(newUsedNumbers);
        setCurrentNumber(idx + 1);
        
        if (!validMoveExists(newUsedNumbers, idx + 1))
        {
            endGame();
            return;
        }

        if (numPlayers === 1 && userTurn)
        {
            if (window.Worker)
            {
                worker.postMessage([cpuDepth, newUsedNumbers, idx + 1]);
            }
            else
            {
                setTimeout(() => { cpuMove(optimalMove(cpuDepth, newUsedNumbers, idx + 1)); }, 1000);
            }
        }
        else
        {
            setAllowInput(true);
        }

        if (userTurn)
        {
            setTurnNumber(turnNumber + 1);
        }

        setUserTurn(!userTurn);
    }

    function cpuMove(idx)
    {
        if (idx >= 0)
        {
            doMove(idx);
        }
        else
        {
            console.error("No cpu moves found");
        }
    }

    function endGame()
    {
        if (userTurn)
        {
            setGameTextStyle({color: "green", textShadow: "0px 0px 3px green"});
            onWin();
            if (userName)
            {
                onBroadcast(userName, WinEvent, turnNumber);
            }
        }
        else
        {
            setGameTextStyle({color: "red", textShadow: "0px 0px 3px red"});
            onLose();
            if (userName)
            {
                onBroadcast(userName, LossEvent, 0);
            }
        }

        setGameOver(true);
    }

    function isValid(idx, usedNumbers, currentNumber)
    {
        if (currentNumber === 0)
        {
            return idx !== 0;
        }

        const num = idx + 1;
        return !usedNumbers[idx] && num !== currentNumber
            && (currentNumber % num === 0 || usedNumbers[num - currentNumber - 1]);
    }

    function validMoveExists(usedNumbers, currentNumber)
    {
        for (let i = 0; i < usedNumbers.length; i++)
        {
            if (isValid(i, usedNumbers, currentNumber))
            {
                return true;
            }
        }

        return false;
    }

    function optimalMove(cpuDepth, usedNumbers, currentNumber)
    {
        let bestMoves = [];
        let bestScore = -(cpuDepth + 1);

        for (let i = 0; i < usedNumbers.length; i++)
        {
            if (isValid(i, usedNumbers, currentNumber))
            {
                const moveScore = -score(cpuDepth - 1, ...stateAfter(i, usedNumbers, currentNumber), -bestScore);
                if (moveScore >= bestScore)
                {
                    if (moveScore > bestScore)
                    {
                        bestScore = moveScore;
                        bestMoves = [];
                    }
                    bestMoves.push(i);
                }
            }
        }

        if (bestMoves.length === 0)
        {
            return -1;
        }

        return bestMoves[Math.floor(Math.random() * bestMoves.length)];
    }

    function score(depthRemaining, usedNumbers, currentNumber, pruningThreshold)
    {
        if (depthRemaining < 0) { return 0; }

        let bestScore = -(depthRemaining + 1);

        if (depthRemaining === 0)
        {
            if (validMoveExists(usedNumbers, currentNumber))
            {
                return 0;
            }
            else
            {
                return bestScore;
            }
        }

        for (let i = 0; i < usedNumbers.length; i++)
        {
            if (isValid(i, usedNumbers, currentNumber))
            {
                const moveScore = -score(depthRemaining - 1, ...stateAfter(i, usedNumbers, currentNumber), -bestScore);
                if (moveScore > bestScore)
                {
                    bestScore = moveScore;
                    if (bestScore > pruningThreshold)
                    {
                        return bestScore;
                    }
                }
            }
        }

        return bestScore;
    }

    function stateAfter(moveIdx, usedNumbers, currentNumber)
    {
        let newUsedNumbers = [...usedNumbers];
        newUsedNumbers[currentNumber - 1] = true;
        const newCurrentNumber = moveIdx + 1;
        return [newUsedNumbers, newCurrentNumber];
    }


    let gameText;
    if (gameOver)
    {
        const pText = playerText(false);
        gameText = pText + " win" + (pText === "You" ? "" : "s") + "!";
    }
    else
    {
        gameText = playerText(true) + " Turn";
    }

    const boardCells = usedNumbers.map((isUsed, num) => {
        let cellClass = "";
        let cellContent = num + 1;

        if (isUsed)
        {
            cellClass = "inactive-number";
        }
        else if (num + 1 === currentNumber)
        {
            cellClass = "current-number";
        }
        else if (isValid(num, usedNumbers, currentNumber))
        {
            cellContent = <Button variant="outline-light" onClick={() => { if(allowInput) { doMove(num); } }}>{num + 1}</Button>;
        }

        return <div key={num} className={cellClass}>{cellContent}</div>
    });


    return (
        <section>
            <h1 style={gameTextStyle}>{gameText}</h1>
            <div className="board">
                {boardCells}
            </div>
            { gameOver && 
            <div className="form-row">
                <Button variant="primary" onClick={reset}>Play again</Button>
                <Link to="/home"><Button variant="outline-light">Back to menu</Button></Link>
            </div>
            }
        </section>
    );
}