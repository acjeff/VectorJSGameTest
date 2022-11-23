import {getInteractive} from "./loadGame.js";
import {getScale} from "./PlayerInput.js";
import {round, randomColour} from './Services.js';

let player,
    jumpTime = 100,
    stateEngine = {
        states: {
            movingUp: false,
            movingDown: false,
            movingLeft: false,
            movingRight: false,
            jumping: false,
            touchingSurface: {
                bottom: false,
                top: false,
                left: false,
                right: false
            }
        }
    },
    new_playerY = 0,
    new_playerX = 0,
    moveSpeed = 10,
    gravity = 10,
    jumpingSpeed = 15;

function getPlayer() {
    return {
        player: player,
        new_playerY: new_playerY,
        new_playerX: new_playerX
    };
}

function triggerJump() {
    stateEngine.states.jumping = true;
    window.setTimeout(() => {
        stateEngine.states.jumping = false;
    }, jumpTime);
}

function movePlayer() {
    let jumpingForce = stateEngine.states.jumping ? 10 * getScale() : 0;

    if (stateEngine.states.jumping) new_playerY = player.y - (jumpingSpeed * getScale());
    //Fall from Gravity
    if (!stateEngine.states.jumping && !stateEngine.states.touchingSurface.bottom) new_playerY = player.y + (gravity * getScale());
    //Move Left
    if (!stateEngine.states.touchingSurface.left) if (stateEngine.states.movingLeft) new_playerX = player.x - ((moveSpeed * getScale()) + jumpingForce);
    //Move Right
    if (!stateEngine.states.touchingSurface.right) if (stateEngine.states.movingRight) new_playerX = player.x + ((moveSpeed * getScale()) + jumpingForce);

}

function createPlayer(startingPosX, startingPosY, playerWidth, playerHeight) {
    player = getInteractive().rectangle(startingPosX, startingPosY, round(playerWidth * getScale()), round(playerHeight * getScale()));
    player.style.fill = randomColour();
}

function getStateEngine() {
    return stateEngine;
}

function setStateEngineState(state, value) {
    stateEngine.states[state] = value;
}

export {
    getPlayer,
    createPlayer,
    setStateEngineState,
    getStateEngine,
    triggerJump,
    movePlayer
}