async function loadSaveFile () {
    let SaveDataReq = await fetch('source/SaveData.json');
    return await SaveDataReq.json();
}

async function saveGame () {

}

export {
    loadSaveFile,
    saveGame
}