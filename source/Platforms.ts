import {round, randomColour} from './Services.js'
import {getScale} from './PlayerInput.js'
import {getInteractive} from "./loadGame.js";

let _platforms_interactive = [], interactive, _platforms = [];

function setPlatforms() {
    let scale = getScale();
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

function placeInitialPlatforms(platforms) {
    setPlatforms();
    platforms.forEach((platform) => {
        createPlatform(platform)
    });
}

function createPlatform(platform, col?, freshy?) {
    if (!interactive) interactive = getInteractive();
    if (freshy) {
        _platforms.push(platform);
        setPlatforms();
        platform = _platforms[_platforms.length - 1];
    }
    _platforms_interactive.push(interactive.rectangle(platform.x, platform.y, platform.width, platform.height));
    _platforms_interactive[_platforms_interactive.length - 1].style.fill = col || randomColour();
}

function getPlatforms() {
    return _platforms_interactive;
}

export {
    placeInitialPlatforms,
    resetPlatforms,
    getPlatforms,
    createPlatform
}