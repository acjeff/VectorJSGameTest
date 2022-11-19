/**
 * @title Interactive SVG Clip Path
 * @description This interactive demonstrates how a clip path is applied to another element.
 * @tags [svg]
 */

import {Interactive, getScriptName} from './index.js';

// Initialize the interactive
let interactive = new Interactive(getScriptName()),
    scale = 0.1,
    startingPosX = 0,
    startingPosY = 0,
    cameraSpeed = 4 * scale,
    moveSpeed = 5 * scale,
    jumpingSpeed = 20 * scale,
    gravity = 15 * scale,
    playerHeight = 50 * scale,
    playerWidth = 50 * scale,
    viewX = interactive.x,
    viewY = interactive.y,
    viewSize = 300,
    cameraPadding = 10,
    player = interactive.rectangle(startingPosX, startingPosY, playerHeight, playerWidth);

interactive.border = true;
interactive.width = window.innerWidth - 100;
interactive.height = window.innerHeight - 100;
interactive.originX = 0;
interactive.originY = 0;

player.style.fill = 'red';

let _platforms = [
    {
        width: 200,
        height: 50,
        x: 0,
        y: interactive.height - 50
    },
    {
        width: 100,
        height: 150,
        x: 300,
        y: interactive.height - 150
    },
    {
        width: 100,
        height: 250,
        x: 500,
        y: interactive.height - 250
    },
    {
        width: 100,
        height: 300,
        x: 600,
        y: interactive.height - 300
    },
    {
        width: 100,
        height: 300,
        x: 800,
        y: interactive.height - 300
    },
    {
        width: 100,
        height: 300,
        x: 1000,
        y: interactive.height - 300
    }
]

_platforms = _platforms.map((p) => {
    p.width *= scale;
    p.height *= scale;
    p.x *= scale;
    p.y *= scale;
    return p;
})

window.addEventListener("wheel", event => {
    viewSize+=event.deltaY;
    console.info(event.deltaY)
});

let stateEngine = {
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
}

function placePlatforms(platforms) {
    platforms.forEach((platform) => {
        let platformRectangle = interactive.rectangle(platform.x, platform.y, platform.width, platform.height);
        platformRectangle.style.fill = 'green';
    });
}

function checkCollisions(onGround) {
    let onLeft = _platforms.find((p) => player.x + -1 <= (p.x + p.width) && player.x + -1 > p.x && (player.y + (playerHeight / 2)) >= p.y);
    let onRight = _platforms.find((p) => (player.x + playerWidth) >= p.x + -1 && (player.y + (playerHeight / 2)) >= p.y && ((player.x + playerWidth) <= (p.x + -1 + (p.width))));
    let onBottom = _platforms.find((p) => ((player.y + playerHeight) >= p.y + -1) && ((player.x + playerWidth) >= (p.x)) && (player.x <= (p.x + p.width))) || onGround;
    if (onRight && (player.x + playerWidth) >= onRight.x && (player.x + playerWidth) <= (onRight.x + onRight.width)) player.x = (onRight.x - playerWidth) - 1;
    if (onLeft && player.x <= (onLeft.x + onLeft.width) && player.x >= onLeft.x) player.x = (onLeft.x + onLeft.width) + 1;
    if (onBottom && (player.y + playerHeight) >= onBottom.y && (player.y + playerHeight) <= (onBottom.y + onBottom.height)) player.y = (onBottom.y - playerHeight) - 1;

    stateEngine.states.touchingSurface.right = !!(onRight);
    stateEngine.states.touchingSurface.left = !!(onLeft);
    stateEngine.states.touchingSurface.bottom = !!(onBottom);
}

function moveCamera() {
    let camera = interactive.viewBox.split(' '),
        cameraX = parseInt(camera[0]), cameraY = parseInt(camera[1]), cameraWidth = parseInt(camera[2]),
        cameraHeight = parseInt(camera[3]),
        middleCameraX = cameraX + (cameraWidth / 2),
        middleCameraY = cameraY + (cameraHeight / 2),
        middlePlayerX = player.x + (player.width / 2),
        middlePlayerY = player.y + (player.height / 2);
    if (middlePlayerX > middleCameraX + cameraPadding) viewX += cameraSpeed;
    if (middlePlayerX < middleCameraX - cameraPadding) viewX -= cameraSpeed;
    if (middlePlayerY > middleCameraY + cameraPadding) viewY += cameraSpeed;
    if (middlePlayerY < middleCameraY - cameraPadding) viewY -= cameraSpeed;

    interactive.setViewBox(viewX, viewY, viewSize, viewSize);
}

function triggerJump() {
    stateEngine.states.jumping = true;
    window.setTimeout(() => {
        stateEngine.states.jumping = false;
    }, 100);
}

function movePlayer(onGround) {
    let jumpingForce = stateEngine.states.jumping ? 10 * scale : 0;

    if (onGround) player.y = interactive.height - playerHeight;

    if (stateEngine.states.jumping) player.y -= jumpingSpeed;
    //Fall from Gravity
    if (!onGround && !stateEngine.states.jumping && !stateEngine.states.touchingSurface.bottom) player.y += gravity;
    //Move Left
    if (!(player.x <= 0) && !stateEngine.states.touchingSurface.left) if (stateEngine.states.movingLeft) player.x -= (moveSpeed + jumpingForce);
    //Move Right
    if (!(player.x >= (interactive.width - playerWidth)) && !stateEngine.states.touchingSurface.right) if (stateEngine.states.movingRight) player.x += (moveSpeed + jumpingForce);

}

function runFrame() {
    let onGround = (player.y >= (interactive.height - playerHeight));

    checkCollisions(onGround);

    movePlayer(onGround);

    moveCamera()

    window.requestAnimationFrame(runFrame);
}

placePlatforms(_platforms);

window.requestAnimationFrame(runFrame);

window.onkeydown = function (event) {
    if (event.keyCode === 32 && !stateEngine.states.jumping && stateEngine.states.touchingSurface.bottom) triggerJump();
    if (event.keyCode === 65 || event.keyCode === 37) stateEngine.states.movingLeft = true;
    if (event.keyCode === 83 || event.keyCode === 40) stateEngine.states.movingDown = true;
    if (event.keyCode === 68 || event.keyCode === 39) stateEngine.states.movingRight = true;
};

window.onkeyup = function (event) {
    if (event.keyCode === 65 || event.keyCode === 37) stateEngine.states.movingLeft = false;
    if (event.keyCode === 83 || event.keyCode === 40) stateEngine.states.movingDown = false;
    if (event.keyCode === 68 || event.keyCode === 39) stateEngine.states.movingRight = false;
};