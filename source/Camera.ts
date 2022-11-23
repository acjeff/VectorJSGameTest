import {round} from './Services.js';
import {getScale} from './PlayerInput.js';
import {getInteractive} from './loadGame.js';
import {getPlayer} from './Player.js';

let movingCameraToPlayerCenter,
    cameraPadding = 100,
    viewX = 0,
    viewY = 0,
    interactive,
    player;

function moveCameraToPlayerCenter() {
    movingCameraToPlayerCenter = true;
}

function moveCamera() {
    if (!interactive) interactive = getInteractive();
    if (!player) player = getPlayer();

    let cameraSpeed = round(7 * getScale());

    let camera = interactive.viewBox.split(' '),
        cameraX = round(parseInt(camera[0])),
        cameraY = round(parseInt(camera[1])),
        o_viewX = viewX,
        o_viewY = viewY,
        cameraWidth = round(parseInt(camera[2])),
        cameraHeight = round(parseInt(camera[3])),
        middleCameraX = round(cameraX) + round(cameraWidth / 2),
        middleCameraY = round(cameraY) + round(cameraHeight / 2),
        middlePlayerX = round(player.player.x) + round(player.player.width / 2),
        middlePlayerY = round(player.player.y) + round(player.player.height / 2);
    if (round(middlePlayerX) > round(middleCameraX) + (!movingCameraToPlayerCenter ? (round(cameraPadding * getScale())) : 0)) viewX += (!movingCameraToPlayerCenter ? round(cameraSpeed) : round(cameraSpeed * 3));
    if (round(middlePlayerX) < round(middleCameraX) - (!movingCameraToPlayerCenter ? (round(cameraPadding * getScale())) : 0)) viewX -= (!movingCameraToPlayerCenter ? round(cameraSpeed) : round(cameraSpeed * 3));
    if (round(middlePlayerY) > round(middleCameraY) + (!movingCameraToPlayerCenter ? (round(cameraPadding * getScale())) : 0)) viewY += (!movingCameraToPlayerCenter ? round(cameraSpeed) : round(cameraSpeed * 3));
    if (round(middlePlayerY) < round(middleCameraY) - (!movingCameraToPlayerCenter ? (round(cameraPadding * getScale())) : 0)) viewY -= (!movingCameraToPlayerCenter ? round(cameraSpeed) : round(cameraSpeed * 3));

    if (round(middleCameraX) === round(middlePlayerX) && round(middleCameraY) === round(middlePlayerY)) movingCameraToPlayerCenter = false;
    if (round(o_viewX) !== round(viewX) || round(o_viewY) !== round(viewY)) {
        interactive.setViewBox(viewX, viewY, interactive.width, interactive.height);
    }
}

function getView() {
    return {viewX: viewX, viewY: viewY}
}

export {
    moveCameraToPlayerCenter,
    moveCamera,
    getView
}