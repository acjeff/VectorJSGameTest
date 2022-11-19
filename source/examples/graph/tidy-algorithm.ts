/**
* @title Tidy Algorithm
* @description Simple example of using the graph.tidy() function to draw a tree.
* @input None
* @tags [graph, tree]
* @weight 1
*/

import {Interactive, getScriptName} from '../../index.js';

let interactive = new Interactive(getScriptName());
interactive.width = 736;
interactive.height = 400;
interactive.border = true;

let graph = interactive.graph({directed:false});
//Secondary example, creates a larger tree. Comment out this code and comment everything
//below it in order to switch examples.

// let root = graph.addNode(0, 0, "root")
// for(let i = 0; i < 5; i++){
//   let parent = graph.addNode(0, 0, i);
//   graph.addEdge(root, parent);
//   for(let j = 0; j < 5; j++){
//     let child = graph.addNode(0, 0, "" + i + " " + j);
//     graph.addEdge(parent, child);
//   }
// }
//
// graph.tidy(root);
// //
// let rect = (graph.root).getBBox();
//
// if(graph.size() == 1)
// {
//   interactive.setViewBox(rect.x-32, rect.y-32, rect.width + 64, rect.height + 64)
// }
// else{
//   interactive.setViewBox(rect.x-8, rect.y-8, rect.width + 16, rect.height + 16)
// }

let node1 = graph.addNode(0, 0, "O");
let node2 = graph.addNode(0, 0, "E");
let node3 = graph.addNode(0, 0, "F");
let node4 = graph.addNode(0, 0, "N");

let node5 = graph.addNode(0, 0, "A");
let node6 = graph.addNode(0, 0, "D");

let node7 = graph.addNode(0, 0, "B");
let node8 = graph.addNode(0, 0, "C");

let node9 = graph.addNode(0, 0, "G");
let node10 = graph.addNode(0, 0, "M");

let node11 = graph.addNode(0, 0, "H");
let node12 = graph.addNode(0, 0, "I");
let node13 = graph.addNode(0, 0, "J");
let node14 = graph.addNode(0, 0, "K");
let node15 = graph.addNode(0, 0, "L");

graph.addEdge(node1, node2)
graph.addEdge(node1, node3)
graph.addEdge(node1, node4)

graph.addEdge(node2, node5)
graph.addEdge(node2, node6)

graph.addEdge(node6, node7)
graph.addEdge(node6, node8)

graph.addEdge(node4, node9)
graph.addEdge(node4, node10)

graph.addEdge(node10, node11)
graph.addEdge(node10, node12)
graph.addEdge(node10, node13)
graph.addEdge(node10, node14)
graph.addEdge(node10, node15)

graph.tidy(node1);
