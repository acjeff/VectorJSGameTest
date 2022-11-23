import {loadPlatforms} from './Platforms.js'
import {loadLights} from './Lights.js'
import {createPlayer} from "./Player.js";

export async function CreateWorld(saveData) {
    let WorldDataReq = await fetch('source/world.json');
    let WorldData = await WorldDataReq.json();
    let LevelToLoad = WorldData.levels.find((l => l.Level = saveData.Player.Level));

    await loadPlatforms(LevelToLoad.Platforms);
    await loadLights(LevelToLoad.Lights);

    createPlayer(saveData.Player.x, saveData.Player.y, 50, 50);
}