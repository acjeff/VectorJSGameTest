import {startGame} from './loadGame.js'
import {Interactive} from './index.js';
import HoverBox from './elements/input/hover-box.js';

let interactive = new Interactive('StartScreen')
interactive.width = window.innerWidth - 30;
interactive.height = window.innerHeight - 30;
interactive.originX = 0;
interactive.originY = 0;
interactive.border = true;

//PUT YOUR START SCREEN HERE :)

let text = interactive.text(0, 0, "SQUART");
text.style.fontSize = '138px';
text.style.textAlign = 'center';
text.style.fontFamily = "monospace";

// let button = interactive.button(660, 550, "   ");
// button.width = '100%';
// button.height = '100%';

// let startText = interactive.text(725, 560, "Start Game");
// startText.width = '100%';
// startText.height = '100%';
// startText.style.fontSize = '30px'
// startText.textAlign = 'center';
// text.style.fontFamily = "monospace";

// interactive.remove();
// startGame();