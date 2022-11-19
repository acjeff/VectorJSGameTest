/**
* @title Control Element
* @description This interactive demonstrates a draggable point.
* @tags [elements, input]
*/

import {Interactive, getScriptName} from '../../index.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.root.style.border = "1px solid grey";
let control = interactive.control( 100, 75);
