/**
* @title SVG Coordinate System
* @description This interactive demonstrates the properties of the SVG coordinate system.
* @date July 11, 2019
* @author Kurt Bruns
* @tags [svg]
* @ignore true
*/

import {Interactive, getScriptName} from '../../index.js';

let width = 736;
let height = 300;
let interactive = new Interactive(getScriptName());
let margin = 0;
interactive.width = width + 2*margin;
interactive.height = height + 2*margin;
interactive.originX = interactive.width/2;
interactive.originY =  interactive.height/2;
interactive.root.style.overflow = 'visible';
interactive.root.style.marginLeft = '6px';

let rectangle = interactive.rectangle( -width/2, -height/2, width, height);
rectangle.classList.add('default');
rectangle.style.fill = '#f8f8f8';

// rect.root.style.stroke = 'cornflowerblue';
let xAxis = interactive.line(-width/2, 0, width/2, 0);
let yAxis = interactive.line(0,-height/2,0, height/2);
let originDot = interactive.circle(0,0,3);
originDot.root.style.fill = '#333333';

let control = interactive.control( 100, 100);
control.constrainWithin(rectangle);

let xCoordinate = interactive.line( 0,0,0,0);
xCoordinate.root.style.strokeDasharray = '3';
xCoordinate.addDependency(control);
xCoordinate.update = function() {
  this.y1 = control.y;
  this.x2 = control.x;
  this.y2 = control.y;
};
xCoordinate.update();

let yCoordinate = interactive.line( 0,0,0,0);
yCoordinate.root.style.strokeDasharray = '3';
yCoordinate.addDependency(control);
yCoordinate.update = function() {
  this.x1 = control.x;
  this.x2 = control.x;
  this.y2 = control.y;
};
yCoordinate.update();

let text = interactive.text(100, 100, "(100,100)");
text.addDependency(control);
text.update = function() {
  this.x = control.x + 15;
  this.y = control.y + 15;
  this.contents = `( ${control.x}, ${control.y})`;
};
text.update();

let marker = interactive.marker(10, 5, 10, 10);
marker.path('M 0 0 L 10 5 L 0 10 z').style.fill = '#404040';
marker.setAttribute('orient', 'auto-start-reverse');
xAxis.setAttribute('marker-end', `url(#${marker.id})`);
xAxis.setAttribute('marker-start', `url(#${marker.id})`);
yAxis.setAttribute('marker-end', `url(#${marker.id})`);
yAxis.setAttribute('marker-start', `url(#${marker.id})`);
