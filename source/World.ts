import {loadPlatforms} from './Platforms.js'
import {loadLights} from './Lights.js'
import {createPlayer} from "./Player.js";
import {watchInputs} from "./PlayerInput.js";

export async function CreateWorld() {
    await loadPlatforms();
    await loadLights();
    createPlayer(0, 0, 50, 50);
    watchInputs();
}