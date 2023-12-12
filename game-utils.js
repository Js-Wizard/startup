"use strict";

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