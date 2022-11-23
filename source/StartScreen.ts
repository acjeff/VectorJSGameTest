import {startGame} from './loadGame.js'
import {Interactive} from './index.js';
import HoverBox from './elements/input/hover-box.js';

let interactive = new Interactive('StartScreen')
interactive.width = window.innerWidth - 30;
interactive.height = window.innerHeight - 30;
interactive.originX = 0;
interactive.originY = 0;
interactive.border = true;

<<<<<<< HEAD
interactive.remove();
await startGame();
//PUT YOUR START SCREEN HERE :)
=======
//PUT YOUR START SCREEN HERE :)

let text = interactive.text(interactive.width / 3, interactive.height / 2, "SQUART");
text.style.fontSize = '138px';
text.style.textAlign = 'center';
text.style.fontFamily = "monospace";


let button = interactive.button(660, 550, "   ");

let startText = interactive.text(725, 560, "Start Game");
startText.style.fontSize = '30px'
text.style.fontFamily = "monospace";
>>>>>>> jess
