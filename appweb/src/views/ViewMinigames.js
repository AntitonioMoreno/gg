import React from 'react';
import MainNavbar from "../components/navbars/MainNavbar";
import openWindow from '../scripts/misc/redirectWindow'; 
import HelloWorld from './helloWorld'; 
// Minijuegos
import Roulette from './minigames/roulette';
import BlackJack from './minigames/blackjack';

function ViewMinigames() {
    const handleOpenWindow = (component) => {
        openWindow(component, 'Ruleta', ''); // Llama a openWindow con el componente que deseas renderizar
    };

    return (
        <main>
            <MainNavbar />
            <div className='container-welcome-message'>
                <h1>Bienvenido a Good Guys Casino</h1>
                <h1>Prueba gratis cualquiera de nuestros minijuegos!</h1>
            </div>
            <div className='minigames-boxes-container'>
                <div className='minigame-box'>
                    <img src='/images/test.png' alt='Ruleta Rusa'/>
                    <h3>Ruleta Rusa</h3>
                    <p>Prueba tu suerte</p>
                    <button onClick={() => handleOpenWindow(Roulette)}>Jugar</button>
                </div>
                <div className='minigame-box'>
                    <img src='/images/test.png' alt='Blackjack'/>
                    <h3>Blackjack</h3>
                    <p>Desafía al crupier</p>
                    <button onClick={() => handleOpenWindow(BlackJack)}>Jugar</button>
                </div>
                <div className='minigame-box'>
                    <img src='/images/test.png' alt='Bingo'/>
                    <h3>Ruleta Americana</h3>
                    <p>Juego de azar típico en casinos</p>
                    <button onClick={() => handleOpenWindow(HelloWorld)}>Jugar</button>
                </div>
                <div className='minigame-box'>
                    <img src='/images/test.png' alt='Minijuego 4'/>
                    <h3>Minijuego 4</h3>
                    <p>¡Diviértete!</p>
                    <button onClick={() => handleOpenWindow(HelloWorld)}>Jugar</button>
                </div>
            </div>
        </main>
    );
}

export default ViewMinigames;
