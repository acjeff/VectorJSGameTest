function randomColourValue() {
    return Math.floor(Math.random() * 256);
}

function randomColour() { // min and max included
    return 'rgb(' + randomColourValue() + ', ' + randomColourValue() + ', ' + randomColourValue() + ')';
}

function round(val) {
    return Math.round(val * 100) / 100;
}

export{
    round,
    randomColour
}