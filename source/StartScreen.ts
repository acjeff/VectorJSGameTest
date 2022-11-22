import {startGame} from './loadGame.js'
import {Interactive} from './index.js';

let interactive = new Interactive('StartScreen')
interactive.width = window.innerWidth - 30;
interactive.height = window.innerHeight - 30;
interactive.originX = 0;
interactive.originY = 0;
interactive.border = true;

//PUT YOUR START SCREEN HERE :)