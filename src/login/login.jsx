import React from 'react';
import {useNavigate} from 'react-router-dom';

import { AuthState } from './authState';
import { MessageDialog } from './messageDialog';
import Button from 'react-bootstrap/Button';

export function Login({ onAuthChange }) {
    const navigate = useNavigate();
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function loginUser() {
        loginOrCreate(`/api/auth/login`);
    }

    async function createUser() {
        loginOrCreate(`/api/auth/create`);
    }

    async function loginOrCreate(endpoint) {
        if (name === "")
        {
            onAuthChange(name, AuthState.Authenticated);
            localStorage.setItem("user", name);
            navigate('/home');
            return;
        }

        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ name: name, password: password }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (response.ok) {
            localStorage.setItem("user", name);
            localStorage.removeItem("guest-data");
            onAuthChange(name, AuthState.Authenticated);
            navigate('/home');
        } else {
            const body = await response.json();
            setDisplayError(`⚠ Error: ${body.msg}`);
        }
    }
  
    return (
        <main>
            <section>
                <div className="big-logo"><img alt="fim logo" src="logo.png" /></div>
                <span><i>a game of numbers</i></span>

                <form>
                    <input type="text" placeholder="username" value={name} onChange={(e) => setName(e.target.value)}/>
                    <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <div>
                        <Button variant="primary" onClick={loginUser}>Log In</Button>
                        <Button variant="secondary" onClick={createUser}>Sign Up</Button>
                    </div>
                </form>
            </section>

            <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </main>
    );
}