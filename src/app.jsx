import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { HowToPlay } from './how-to-play/how-to-play';
import { ModeSelect } from './mode-select/mode-select';
import { TwoPSetup } from './2p-setup/2p-setup';
import { Play } from './play/play';

export default function App()
{
  return (
    <BrowserRouter>
        <div className='body bg-dark text-light'>
            <header>
                <NavLink to='home'>
                    <div className="logo"><img alt="fim logo" src="logo.png" /></div>
                </NavLink>
            </header>

            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/home' element={<Home />} />
                <Route path='/how-to-play' element={<HowToPlay />} />
                <Route path='/mode-select' element={<ModeSelect />} />
                <Route path='/2p-setup' element={<TwoPSetup />} />
                <Route path='/play' element={<Play />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer>
                <span className="author">
                    &copy; Brent Thomson 2023 | <a href="https://github.com/Js-Wizard/startup">Source</a>
                </span>
            </footer>
        </div>
    </BrowserRouter>
  );
}

function NotFound()
{
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}