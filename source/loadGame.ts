/**
 * @title Interactive SVG Clip Path
 * @description This interactive demonstrates how a clip path is applied to another element.
 * @tags [svg]
 */

import {Interactive, getScriptName} from './index.js';

// Initialize the interactive
let interactive = new Interactive(getScriptName())
interactive.width = window.innerWidth - 30;
interactive.height = window.innerHeight - 30;
interactive.originX = 0;
interactive.originY = 0;
interactive.border = true;

let scale: number,
    startingPosX: number,
    startingPosY: number,
    cameraSpeed: number,
    moveSpeed: number,
    jumpingSpeed: number,
    gravity: number,
    playerHeight: number,
    playerWidth: number,
    viewX: number,
    viewY: number,
    viewWidth: number,
    viewHeight: number,
    cameraPadding: number,
    movingCameraToPlayerCenter: boolean,
    drawingPlatform: boolean,
    editingPlatformIndex: number,
    jumpTime: number,
    player,
    o_playerX = 0,
    o_playerY = 0,
    new_playerX = 0,
    new_playerY = 0

function resetValues(newValues?) {
    if (!newValues) newValues = {};
    scale = newValues['scale'] || scale || 1
    startingPosX = newValues['startingPosX'] || startingPosX || 0
    startingPosY = newValues['startingPosY'] || startingPosY || 0
    cameraSpeed = newValues['cameraSpeed'] || round(4 * scale)
    moveSpeed = newValues['moveSpeed'] || round(5 * scale)
    jumpingSpeed = newValues['jumpingSpeed'] || round(20 * scale)
    gravity = newValues['gravity'] || gravity || round(15 * scale)
    playerHeight = newValues['playerHeight'] || round(50 * scale)
    playerWidth = newValues['playerWidth'] || round(50 * scale)
    viewX = newValues['viewX'] || viewX || round(interactive.x)
    viewY = newValues['viewY'] || viewY || round(interactive.y)
    viewWidth = newValues['viewWidth'] || viewWidth || interactive.width
    viewHeight = newValues['viewHeight'] || viewHeight || interactive.height
    cameraPadding = newValues['cameraPadding'] || cameraPadding || 10
    movingCameraToPlayerCenter = newValues['movingCameraToPlayerCenter'] || movingCameraToPlayerCenter || false
    drawingPlatform = newValues['drawingPlatform'] || drawingPlatform || false
    editingPlatformIndex = newValues['editingPlatformIndex'] || editingPlatformIndex || -1
    jumpTime = newValues['jumpTime'] || 100
    if (!player) player = interactive.rectangle(startingPosX, startingPosY, playerWidth, playerHeight);
    else {
        player.width = playerWidth;
        player.height = playerHeight;
        player.x = 0;
        player.y = 0;
    }

    if (_platforms_interactive.length) resetPlatforms();
    else placeInitialPlatforms(_platforms);
}

let _platforms_interactive = [];
let _platforms = [
    {
        width: 2100,
        o_width: 2100,
        height: 50,
        o_height: 50,
        x: 0,
        o_x: 0,
        y: interactive.height,
        o_y: interactive.height,
        beingResized: false,
        selected: false
    },
    {
        o_width: 100,
        width: 100,
        o_height: 150,
        height: 150,
        x: 300,
        o_x: 300,
        y: interactive.height - 150,
        o_y: interactive.height - 150,
        beingResized: false,
        selected: false
    },
    {
        width: 100,
        o_width: 100,
        height: 250,
        o_height: 250,
        x: 500,
        o_x: 500,
        y: interactive.height - 250,
        o_y: interactive.height - 250,
        beingResized: false,
        selected: false
    },
    {
        width: 100,
        o_width: 100,
        height: 300,
        o_height: 300,
        x: 600,
        o_x: 600,
        y: interactive.height - 300,
        o_y: interactive.height - 300,
        beingResized: false,
        selected: false
    },
    {
        width: 100,
        o_width: 100,
        height: 300,
        o_height: 300,
        x: 800,
        o_x: 800,
        y: interactive.height - 300,
        o_y: interactive.height - 300,
        beingResized: false,
        selected: false
    },
    {
        width: 100,
        o_width: 100,
        height: 300,
        o_height: 300,
        x: 1000,
        o_x: 1000,
        y: interactive.height - 300,
        o_y: interactive.height - 300,
        beingResized: false
    }
]

resetValues();
player.style.fill = randomColour();

function round(val) {
    return Math.round(val * 100) / 100;
}

function setPlatforms() {
    _platforms = _platforms.map((p) => {
        p.width = round(p.o_width * scale);
        p.height = round(p.o_height * scale);
        p.x = round(p.o_x * scale);
        p.y = round(p.o_y * scale);
        return p;
    })
}

function resetPlatforms() {
    setPlatforms();
    _platforms_interactive.forEach((p, i) => {
        p.width = round(_platforms[i].width);
        p.height = round(_platforms[i].height);
        p.x = round(_platforms[i].x);
        p.y = round(_platforms[i].y);
    })
}

window.addEventListener("wheel", event => {
    let scrollAmount = event.deltaY;
    if (scrollAmount > 0) scrollAmount = 0.1;
    else (scrollAmount) = -0.1;
    resetValues({scale: round(scale + scrollAmount)});
    moveCameraToPlayerCenter();
});

interactive.root.onmousedown = event => {
    drawingPlatform = true;
};

interactive.root.onmouseup = event => {
    drawingPlatform = false;
    editingPlatformIndex = -1;
};

interactive.root.onmousemove = event => {
    if (drawingPlatform) {
        createPlatform({
            width: 100,
            o_width: 100,
            height: 100,
            o_height: 100,
            x: round(((event.x + viewX) - 5) / scale),
            o_x: round(((event.x + viewX) - 5) / scale),
            y: round(((event.y + viewY) - 5) / scale),
            o_y: round(((event.y + viewY) - 5) / scale)
        }, '#000000', true);
        editingPlatformIndex = _platforms_interactive.length - 1;
    }

};

window.onkeydown = function (event) {
    if (event.keyCode === 32 && !stateEngine.states.jumping && stateEngine.states.touchingSurface.bottom) triggerJump();
    if (event.keyCode === 65 || event.keyCode === 37) stateEngine.states.movingLeft = true;
    if (event.keyCode === 68 || event.keyCode === 39) stateEngine.states.movingRight = true;
};

window.onkeyup = function (event) {
    if (event.keyCode === 65 || event.keyCode === 37) stateEngine.states.movingLeft = false;
    if (event.keyCode === 68 || event.keyCode === 39) stateEngine.states.movingRight = false;
};

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

function randomColourValue() {
    return Math.floor(Math.random() * 256);
}

function randomColour() { // min and max included
    return 'rgb(' + randomColourValue() + ', ' + randomColourValue() + ', ' + randomColourValue() + ')';
}

function createPlatform(platform, col?, freshy?) {
    if (freshy) {
        _platforms.push(platform);
        setPlatforms();
        platform = _platforms[_platforms.length - 1];
    }
    _platforms_interactive.push(interactive.rectangle(platform.x, platform.y, platform.width, platform.height));
    _platforms_interactive[_platforms_interactive.length - 1].style.fill = col || randomColour();
}

function placeInitialPlatforms(platforms) {
    setPlatforms();
    platforms.forEach((platform) => {
        createPlatform(platform)
    });
}

function checkCollisions() {
    let onBottom = _platforms_interactive.find((p) => {
        return (new_playerY + playerHeight >= p.y && player.y + playerHeight <= p.y) && ((player.x + playerWidth) >= (p.x)) && (player.x <= (p.x + p.width));
    });
    if (onBottom) player.y = onBottom.y - playerHeight;
    else player.y = new_playerY;

    let onRight = _platforms_interactive.find((p) => {
        return (new_playerX + playerWidth >= p.x && player.x + playerWidth <= p.x && ((player.y > p.y && player.y < p.y + p.height) || (player.y + playerHeight > p.y && player.y + playerHeight < p.y + p.height)));
    });

    let onLeft = _platforms_interactive.find((p) => {
        return (new_playerX <= p.x + p.width && player.x >= p.x + p.width && ((player.y > p.y && player.y < p.y + p.height) || (player.y + playerHeight > p.y && player.y + playerHeight < p.y + p.height)));
    });
    if (onRight) player.x = onRight.x - playerWidth;
    else if (onLeft) player.x = onLeft.x + onLeft.width;
    else player.x = new_playerX;

    stateEngine.states.touchingSurface.right = !!(onRight);
    stateEngine.states.touchingSurface.left = !!(onLeft);
    stateEngine.states.touchingSurface.bottom = !!(onBottom);
}

function moveCameraToPlayerCenter() {
    movingCameraToPlayerCenter = true;
}

function moveCamera() {
    let camera = interactive.viewBox.split(' '),
        cameraX = Math.round(parseInt(camera[0])), cameraY = Math.round(parseInt(camera[1])),
        cameraWidth = Math.round(parseInt(camera[2])),
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
    interactive.setViewBox(viewX, viewY, viewWidth, viewHeight);
}

function triggerJump() {
    stateEngine.states.jumping = true;
    window.setTimeout(() => {
        stateEngine.states.jumping = false;
    }, jumpTime);
}

function movePlayer() {
    let jumpingForce = stateEngine.states.jumping ? 10 * scale : 0;

    if (stateEngine.states.jumping) new_playerY = player.y - jumpingSpeed;
    //Fall from Gravity
    if (!stateEngine.states.jumping && !stateEngine.states.touchingSurface.bottom) new_playerY = player.y + gravity;
    //Move Left
    if (!stateEngine.states.touchingSurface.left) if (stateEngine.states.movingLeft) new_playerX = player.x - (moveSpeed + jumpingForce);
    //Move Right
    if (!stateEngine.states.touchingSurface.right) if (stateEngine.states.movingRight) new_playerX = player.x + (moveSpeed + jumpingForce);

}

function runFrame() {
    movePlayer();

    checkCollisions();

    moveCamera();

    window.requestAnimationFrame(runFrame);
}

window.requestAnimationFrame(runFrame);