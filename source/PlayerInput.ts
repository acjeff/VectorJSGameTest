import {getInteractive} from "./loadGame.js";
import {round} from './Services.js';
import {getView, moveCameraToPlayerCenter} from './Camera.js';
import {getStateEngine, setStateEngineState, triggerJump} from "./Player.js";
import {createPlatform, getPlatforms} from "./Platforms.js";

let scale = 1, drawingPlatform, editingPlatformIndex;

function watchInputs() {
    let interactive = getInteractive();
    // window.addEventListener("wheel", event => {
    //     let scrollAmount = event.deltaY;
    //     if (scrollAmount > 0) scrollAmount = 0.1;
    //     else (scrollAmount) = -0.1;
    //     // resetValues({scale: round(scale + scrollAmount)});
    //     moveCameraToPlayerCenter();
    // });

    interactive.root.onmousedown = event => {
        drawingPlatform = true;
    };

    interactive.root.onmouseup = event => {
        drawingPlatform = false;
        editingPlatformIndex = -1;
    };

    interactive.root.onmousemove = event => {
        let view = getView();
        if (drawingPlatform) {
            createPlatform({
                width: 100,
                o_width: 100,
                height: 100,
                o_height: 100,
                x: round(((event.x + view.viewX) - 5) / scale),
                o_x: round(((event.x + view.viewX) - 5) / scale),
                y: round(((event.y + view.viewY) - 5) / scale),
                o_y: round(((event.y + view.viewY) - 5) / scale)
            }, '#000000', true);
            editingPlatformIndex = getPlatforms().length - 1;
        }

    };

    window.onkeydown = function (event) {
        let stateEngine = getStateEngine();
        if (event.keyCode === 32 && !stateEngine.states.jumping && stateEngine.states.touchingSurface.bottom) triggerJump();
        if (event.keyCode === 65 || event.keyCode === 37) setStateEngineState('movingLeft', true);
        if (event.keyCode === 68 || event.keyCode === 39) setStateEngineState('movingRight', true);
    };

    window.onkeyup = function (event) {
        if (event.keyCode === 65 || event.keyCode === 37) setStateEngineState('movingLeft', false);
        if (event.keyCode === 68 || event.keyCode === 39) setStateEngineState('movingRight', false);
    };
}

function getScale() {
    return scale;
}

export {
    watchInputs,
    getScale
}