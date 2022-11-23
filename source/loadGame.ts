import {Interactive} from './index.js';
import {watchInputs} from './PlayerInput.js'
import {moveCamera} from './Camera.js'
import {createPlayer, movePlayer} from './Player.js'
import {CreateWorld} from './World.js'
import {checkCollisions} from './Collisions.js'

// Initialize the interactive
let interactive;

function runFrame() {
    movePlayer();

    checkCollisions();

    moveCamera();

    window.requestAnimationFrame(runFrame);
}

function getInteractive() {
    return interactive;
}

function startGame() {
    interactive = new Interactive('loadGame')
    interactive.width = window.innerWidth - 30;
    interactive.height = window.innerHeight - 30;
    interactive.originX = 0;
    interactive.originY = 0;
    interactive.border = true;

    CreateWorld();

    createPlayer(0, 0, 50, 50);

    watchInputs();

    window.requestAnimationFrame(runFrame);
}

export {
    startGame,
    getInteractive
}