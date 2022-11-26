import {startGame} from './loadGame.js'
import {Interactive} from './index.js';
import HoverBox from './elements/input/hover-box.js';

let interactive = new Interactive('StartScreen')
interactive.width = window.innerWidth;
interactive.height = window.innerHeight;
interactive.originX = 0;
interactive.originY = 0;
interactive.border = true;

//PUT YOUR START SCREEN HERE :)

let title = interactive.text(0, interactive.height / 2, "SQUART");
title.style.fontSize = '138px';
title.style.textAlign = 'center';
title.style.fontFamily = "monospace";
let textBbox = title.getBoundingBox();
title.x = (interactive.width / 2) - (textBbox.width / 2);

let squareSize = 50;
let squareX = (interactive.width / 2) - (squareSize / 2);
let squareY = (interactive.height / 2) + (textBbox.height / 2);
let animation;

let square = interactive.rectangle(squareX, squareY, squareSize, squareSize);
square.root.onclick = (event) => {
    console.log(event);
    square.fill = 'red';
    let animation = window.requestAnimationFrame(moveSquare);
};

function moveSquare () {
    if (square.y > interactive.height) {
        window.cancelAnimationFrame(animation);
        console.log('Done.');
        return;
    }
    square.y += 10;
    console.log(square.y);
    window.requestAnimationFrame(moveSquare);
}

// let startText = interactive.text(725, 560, "Start Game");
// startText.style.fontSize = '30px'
// startText.textAlign = 'center';
// text.style.fontFamily = "monospace";

// interactive.remove();
// startGame();