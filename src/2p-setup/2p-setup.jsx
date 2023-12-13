import React from 'react';

import {useNavigate, Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function TwoPSetup() {
    const navigate = useNavigate();

    const [secondName, setSecondName] = React.useState('');

    function play2p()
    {
        localStorage.setItem("player-count", 2);
        localStorage.setItem("2p-name", secondName);
        navigate('/play');
    }

    return (
        <main>
            <section>
                <h1>Enter second player name</h1>
                <form>
                    <div className="form-row">
                        <input type="text" placeholder="name" value={secondName} onChange={(e) => setSecondName(e.target.value)}/>
                        <Button variant="primary" onClick={play2p}>Play</Button>
                    </div>
                </form>
                <menu>
                    <li><Link to="/mode-select"><Button variant="outline-light">Back</Button></Link></li>
                </menu>
            </section>
        </main>
    );
}