/**
* @title Control Circle Element
* @description This interactive demonstrates a draggable circle.
* @tags [elements, input]
*/

import {Interactive, getScriptName} from '../../index.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.root.style.border = "1px solid grey";
let control = interactive.controlCircle(100,75);
