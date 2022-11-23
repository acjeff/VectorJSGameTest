let _lights;

async function loadLights() {
    let lightsDataReq = await fetch('source/world.json');
    let lightsData = await lightsDataReq.json();
    _lights = lightsData.Lights;
}

function adjustLighting() {

}

export {
    loadLights,
    adjustLighting
}