import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App()
{
  return <div className='body bg-dark text-light'>
    <header>
        <a href="home.html">
            <div className="logo"><img alt="fim logo" src="logo.png" /></div>
        </a>
    </header>

    <main>App components go here</main>

    <footer>
        <span className="author">
            &copy; Brent Thomson 2023 | 
            <a href="https://github.com/Js-Wizard/startup">Source</a>
        </span>
    </footer>
  </div>;
}