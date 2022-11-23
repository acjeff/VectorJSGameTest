import {placeInitialPlatforms} from './Platforms.js'
import {getInteractive} from "./loadGame.js";

export function CreateWorld() {
    let interactive = getInteractive();
    let _platforms  = [
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
    placeInitialPlatforms(_platforms);
}