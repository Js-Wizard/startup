import React from 'react';

import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function HowToPlay() {
    const [quote, setQuote] = React.useState("Light is more powerful than darkness. Hope is more powerful than fear. Love is more powerful than hate. And joy? Joy is way more powerful than misery will ever be!");
    const [quoteAuthor, setQuoteAuthor] = React.useState("Molly McGee");

    React.useEffect(() => {
        fetch('https://api.quotable.io/random')
            .then((response) => response.json())
            .then((data) => {
                setQuote(data.content);
                setQuoteAuthor(data.author);
            });
    }, []);

    return (
        <main>
            <section>
                <h1>How to play Fim</h1>

                <br/>

                <p>
                    Fim is a two-player turn-based pure strategy game. The state of the game is represented by a grid of numbers. Each turn is made by picking a valid number.
                    To start, the first player may choose any number except 1. This becomes the current number. The second player then chooses a valid number. The current number
                    then becomes a used number, and the chosen number is the new current number. Then it is the first player's turn again, and play continues until there are no
                    valid numbers for a player to choose from. That player loses, and the other player wins. A valid number is defined as follows:
                </p>
                <ol>
                    <li>Must not be a used number</li>
                    <li>Must not be the current number</li>
                    <li>
                        Must be either:
                        <ul>
                            <li>A factor of the current number, OR</li>
                            <li>The sum of the current number and a used number</li>
                        </ul>
                    </li>
                </ol>
                <p>
                    This game is inspired by "Nim", a similar game where players take turns removing a chosen amount of items from a pile. The name "Fim" is a combination of
                    Nim and the f in "factor". Both games have a winning strategy, but finding the winning strategy for Fim is likely not solvable in polynomial time.
                </p>

                <br/>
        
                <div id="quote" className="alert alert-info">
                    <div>{quote}</div>
                    <div id="author">- {quoteAuthor}</div>
                </div>

                <menu>
                    <li><Link to="/home"><Button variant="outline-light">Back</Button></Link></li>
                </menu>
            </section>
        </main>
    );
}