import {getPlatforms} from "./Platforms.js";
import {getPlayer, getStateEngine} from "./Player.js";
import {getScale} from "./PlayerInput.js";

function checkCollisions() {
    let platforms = getPlatforms();
    let player = getPlayer();
    let scale = getScale();
    let stateEngine = getStateEngine();

    let onBottom = platforms.find((p) => {
        return (player.new_playerY + player.player.height >= p.y && player.player.y + player.player.height <= p.y) && ((player.player.x + player.player.width) >= (p.x)) && (player.player.x <= (p.x + p.width));
    });

    let onTop = platforms.find((p) => {
        return (player.new_playerY <= p.y + p.height && player.player.y >= p.y + p.height) && ((player.player.x + player.player.width) >= (p.x)) && (player.player.x <= (p.x + p.width));
    });

    if (onBottom) player.player.y = onBottom.y - player.player.height;
    else if (onTop) {
        player.player.y = onTop.y + onTop.height + scale;
        stateEngine.states.jumping = false;
    } else player.player.y = player.new_playerY;

    let onRight = platforms.find((p) => {
        return (player.new_playerX + player.player.width >= p.x && player.player.x + player.player.width <= p.x && ((player.player.y > p.y && player.player.y < p.y + p.height) || (player.player.y + player.player.height > p.y && player.player.y + player.player.height < p.y + p.height)));
    });

    let onLeft = platforms.find((p) => {
        return (player.new_playerX <= p.x + p.width && player.player.x >= p.x + p.width && ((player.player.y > p.y && player.player.y < p.y + p.height) || (player.player.y + player.player.height > p.y && player.player.y + player.player.height < p.y + p.height)));
    });

    if (onRight) player.player.x = onRight.x - player.player.width;
    else if (onLeft) player.player.x = onLeft.x + onLeft.width;
    else player.player.x = player.new_playerX;

    stateEngine.states.touchingSurface.right = !!(onRight);
    stateEngine.states.touchingSurface.left = !!(onLeft);
    stateEngine.states.touchingSurface.bottom = !!(onBottom);
}

export {
    checkCollisions
}