/**
 * @title Interactive SVG Clip Path
 * @description This interactive demonstrates how a clip path is applied to another element.
 * @tags [svg]
 */

import {Interactive, getScriptName} from './index.js';

// Initialize the interactive
let interactive = new Interactive(getScriptName()),
    scale: number = 0.1,
    startingPosX: number = 0,
    startingPosY: number = 0,
    cameraSpeed: number = Math.round((4 * scale) * 100) / 100,
    moveSpeed: number = Math.round((5 * scale) * 100) / 100,
    jumpingSpeed: number = Math.round((20 * scale) * 100) / 100,
    gravity: number = Math.round((15 * scale) * 100) / 100,
    playerHeight: number = Math.round((50 * scale) * 100) / 100,
    playerWidth: number = Math.round((50 * scale) * 100) / 100,
    viewX: number = Math.round(interactive.x),
    viewY: number = Math.round(interactive.y),
    viewSize: number = 100,
    cameraPadding: number = 10,
    movingCameraToPlayerCenter: boolean = false,
    player = interactive.rectangle(startingPosX, startingPosY, playerWidth, playerHeight);

interactive.border = true;
interactive.width = window.innerWidth - 100;
interactive.height = window.innerHeight - 100;
interactive.originX = 0;
interactive.originY = 0;

player.style.fill = 'red';

let _platforms = [
    {
        width: 1000,
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
    let scrollAmount = event.deltaY;
    if (scrollAmount > 0) scrollAmount = 10;
    else (scrollAmount) = -10;
    let newView = viewSize + scrollAmount;
    if (newView > 500) newView = 500;
    else if (newView < 30) newView = 30;
    viewSize = Math.round(newView);
    console.log(viewSize, ' : new view');
    moveCameraToPlayerCenter();
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
    let onLeft = _platforms.find((p) => player.x + -scale <= (p.x + p.width) && player.x + -scale > p.x && (player.y + (playerHeight / 2)) >= p.y);
    let onRight = _platforms.find((p) => (player.x + playerWidth) >= p.x + -scale && (player.y + (playerHeight / 2)) >= p.y && ((player.x + playerWidth) <= (p.x + -scale + (p.width))));
    let onBottom = _platforms.find((p) => ((player.y + playerHeight) >= p.y + -scale) && ((player.x + playerWidth) >= (p.x)) && (player.x <= (p.x + p.width))) || onGround;
    if (onRight && (player.x + playerWidth) >= onRight.x && (player.x + playerWidth) <= (onRight.x + onRight.width)) player.x = (onRight.x - playerWidth) - scale;
    if (onLeft && player.x <= (onLeft.x + onLeft.width) && player.x >= onLeft.x) player.x = (onLeft.x + onLeft.width) + scale;
    if (onBottom && (player.y + playerHeight) >= onBottom.y && (player.y + playerHeight) <= (onBottom.y + onBottom.height)) player.y = (onBottom.y - playerHeight) - scale;

    stateEngine.states.touchingSurface.right = !!(onRight);
    stateEngine.states.touchingSurface.left = !!(onLeft);
    stateEngine.states.touchingSurface.bottom = !!(onBottom);
}

function moveCameraToPlayerCenter() {
    movingCameraToPlayerCenter = true;
}

function moveCamera() {
    let camera = interactive.viewBox.split(' '),
        cameraX = Math.round(parseInt(camera[0])), cameraY = Math.round(parseInt(camera[1])), cameraWidth = Math.round(parseInt(camera[2])),
        cameraHeight = Math.round(parseInt(camera[3])),
        middleCameraX = Math.round(cameraX + (cameraWidth / 2)),
        middleCameraY = Math.round(cameraY + (cameraHeight / 2)),
        middlePlayerX = Math.round(player.x + (player.width / 2)),
        middlePlayerY = Math.round(player.y + (player.height / 2));
    if (middlePlayerX > middleCameraX + (!movingCameraToPlayerCenter ? cameraPadding : 0)) viewX += (!movingCameraToPlayerCenter ? cameraSpeed : Math.round(cameraSpeed * 3));
    if (middlePlayerX < middleCameraX - (!movingCameraToPlayerCenter ? cameraPadding : 0)) viewX -= (!movingCameraToPlayerCenter ? cameraSpeed : Math.round(cameraSpeed * 3));
    if (middlePlayerY > middleCameraY + (!movingCameraToPlayerCenter ? cameraPadding : 0)) viewY += (!movingCameraToPlayerCenter ? cameraSpeed : Math.round(cameraSpeed * 3));
    if (middlePlayerY < middleCameraY - (!movingCameraToPlayerCenter ? cameraPadding : 0)) viewY -= (!movingCameraToPlayerCenter ? cameraSpeed : Math.round(cameraSpeed * 3));

    if (Math.round(middleCameraX) === Math.round(middlePlayerX) && Math.round(middleCameraY) === Math.round(middlePlayerY)) movingCameraToPlayerCenter = false;
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