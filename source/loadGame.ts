import {Interactive} from './index.js';
import {moveCamera} from './Camera.js'
import {movePlayer} from './Player.js'
import {CreateWorld} from './World.js'
import {checkCollisions} from './Collisions.js'
import {adjustLighting} from './Lights.js'
import {loadSaveFile} from "./FileManager.js";

let interactive, frame_rate = 50, second = 1000, frames_per_second = Math.round(second / frame_rate);

function runFrame() {
    movePlayer();

    checkCollisions();

    moveCamera();

    adjustLighting();

    window.setTimeout(() => {
        window.requestAnimationFrame(runFrame);
    }, frames_per_second);
}

function getInteractive() {
    return interactive;
}

async function startGame() {
    interactive = new Interactive('loadGame')
    interactive.width = window.innerWidth - 30;
    interactive.height = window.innerHeight - 30;
    interactive.originX = 0;
    interactive.originY = 0;
    interactive.border = true;

    let saveData = await loadSaveFile();
    console.log(saveData, ' : save data');

    await CreateWorld(saveData);

    window.requestAnimationFrame(runFrame);
}

export {
    startGame,
    getInteractive
}