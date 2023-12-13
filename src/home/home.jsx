import React from 'react';

import Button from 'react-bootstrap/Button';
import {useNavigate, Link} from 'react-router-dom';

export function Home({ userName, onAuthChange }) {
    const navigate = useNavigate();

    function logout()
    {
        localStorage.removeItem('user');
        onAuthChange('');

        if (userName === '')
        {
            navigate('/');
        }
        else
        {
            fetch(`/api/auth/logout`, {
                method: 'delete',
            }).finally(() => navigate('/'));
        }
    }

    const displayName = userName === '' ? "Guest" : userName;

    return (
        <main>
            <section>
                <h1>Welcome, <span className="player-name">{displayName}</span></h1>
                <menu>
                    <li><Link to="/mode-select"><Button variant="primary">Play</Button></Link></li>
                    <li><Link to="/how-to-play"><Button variant="info">How to play</Button></Link></li>
                    <li><Button variant="danger" onClick={logout}>Log Out</Button></li>
                </menu>
            </section>
        </main>
    );
}