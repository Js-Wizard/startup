"use strict";

importScripts("game-utils.js");

onmessage = function(e)
{
    let cpuDepth, usedNumbers, currentNumber;
    [cpuDepth, usedNumbers, currentNumber] = e.data;

    postMessage(optimalMove(cpuDepth, usedNumbers, currentNumber));
}