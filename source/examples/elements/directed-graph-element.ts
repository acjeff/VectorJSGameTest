/**
* @title Directed Graph Element
* @description This interactive demonstrates the directed graph element.
* @tags [elements]
*/

import {Interactive, getScriptName} from '../../index.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.border = true;
let graph = interactive.graph({directed:true});
let a = graph.addNode( 75, 75, 'a');
let b = graph.addNode( 200, 75, 'b');
graph.addEdge( a, b);
