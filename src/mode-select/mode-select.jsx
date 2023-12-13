import React from 'react';

import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function ModeSelect() {
    const navigate = useNavigate();

    function play1p()
    {
        localStorage.setItem("player-count", 1);
        navigate('/play');
    }

    return (
        <main>
            <section>
                <h1>Choose game mode</h1>
                <menu>
                    <li><Button variant="success" onClick={play1p}>Play against CPU</Button></li>
                    <li><Link to="/2p-setup"><Button variant="primary">Local 2-player</Button></Link></li>
                    <li><Link to="/home"><Button variant="outline-light">Back</Button></Link></li>
                </menu>
            </section>
        </main>
    );
}