import {startGame} from './loadGame.js'
import {Interactive} from './index.js';

console.log('StartScreen');
let interactive = new Interactive('StartScreen')
interactive.width = window.innerWidth - 30;
interactive.height = window.innerHeight - 30;
interactive.originX = 0;
interactive.originY = 0;
interactive.border = true;
let newText = interactive.text(50, 50, 'Start Game');

newText.root.onclick = event => {
    interactive.remove();
    startGame();
};
