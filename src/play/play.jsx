import React from 'react';

import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Game } from './game';

const WinEvent = 'win';
const LossEvent = 'loss';

export function Play({ userName }) {
    const [wins, setWins] = React.useState(0);
    const [losses, setLosses] = React.useState(0);
    const [socket, setSocket] = React.useState(null);
    const [messages, setMessages] = React.useState([]);

    const displayName = userName ? userName : "Guest";

    React.useEffect(() => {
        initializeUser();
        configureWebSocket();
    }, []);

    React.useEffect(() => {
        if (userName)
        {
            let dbMock = JSON.parse(localStorage.getItem("db-mock")) ?? {};
            dbMock[userName].wins = wins;
            dbMock[userName].losses = losses;
            localStorage.setItem("db-mock", JSON.stringify(dbMock));
        }
        else
        {
            localStorage.setItem("guest-data", JSON.stringify({ wins: wins, losses: losses }));
        }
    }, [wins, losses]);

    async function initializeUser()
    {
        let dbMock = JSON.parse(localStorage.getItem("db-mock")) ?? {};
        let userData;

        if (userName)
        {
            try
            {
                const response = await fetch('/api/userData/' + userName);
                userData = await response.json();
                dbMock[userName] = userData;
            }
            catch
            {
                userData = dbMock[userName];
                if (!userData)
                {
                    dbMock[userName] = { wins: 0, losses: 0 };
                    userData = dbMock[userName];
                }
            }
        }
        else
        {
            userData = JSON.parse(localStorage.getItem("guest-data")) ?? { wins: 0, losses: 0 };
        }

        setWins(userData.wins);
        setLosses(userData.losses);

        localStorage.setItem("db-mock", JSON.stringify(dbMock));
    }

    function configureWebSocket() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        setSocket(new WebSocket(`${protocol}://${window.location.host}/ws`));

        socket.onmessage = async (event) => {
            const msg = JSON.parse(await event.data.text());
            if (msg.type === WinEvent) {
                displayMsg(msg.from, `won in ${msg.value} turns!`);
            } else if (msg.type === LossEvent) {
                displayMsg(msg.from, `lost...`);
            }
        };
    }

    function displayMsg(from, msg) {
        setMessages([from, msg], ...messages);
    }

    function broadcastEvent(from, type, value) {
        const event = {
            from: from,
            type: type,
            value: value,
        };
        socket.send(JSON.stringify(event));
    }
      

    async function win()
    {
        setWins(wins + 1);
        if (userName)
        {
            await onlineWin();
        }
    }

    async function lose()
    {
        setLosses(losses + 1);
        if (userName)
        {
            await onlineLose();
        }
    }

    async function onlineWin()
    {
        try
        {
            const response = await fetch('/api/userData/' + userName + '/win', { method: 'PUT' });
            const userData = await response.json();
            setWins(userData.wins);
            setLosses(userData.losses);
        }
        catch
        {
            return;
        }
    }

    async function onlineLose()
    {
        try
        {
            const response = await fetch('/api/userData/' + userName + '/lose', { method: 'PUT' });
            const userData = await response.json();
            setWins(userData.wins);
            setLosses(userData.losses);
        }
        catch
        {
            return;
        }
    }



    const log = messages.map((message) => {
        return (
            <li>
                <span className="player-name">{message.from}</span> {message.msg}
            </li>
        );
    });

    return (
        <main className="play-main">
            <div className="user-info">
                <h2><span className="player-name">{displayName}</span></h2>
                <div>Wins: <span id="num-wins">{wins}</span></div>
                <div>Losses: <span id="num-losses">{losses}</span></div>
            </div>

            <Game onWin={win} onLose={lose} onBroadcast={broadcastEvent} />
            
            <div className="results-box">
                <h2>Live Results</h2>
                <ul className="log">{log}</ul>
            </div>
        </main>
    );
}