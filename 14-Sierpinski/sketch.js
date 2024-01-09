// Sierpinski Triangle Recursion Demo

let initialTriangle = [
  {x: 400, y: 50},
  {x: 50, y: 550},
  {x: 750, y: 550}
];

let depth = 0;
let theColors = ["black", "red", "blue", "yellow", "brown", "purple"];

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);
  sierpinski(initialTriangle, depth);
}

function sierpinski(points, depth){
  if (depth < theColors.length){
    fill(theColors[depth]);
  }

  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);
  //  Draw Upper Triangle
  if (depth > 0){
    sierpinski([points[0],
                getMidPoints(points[0], points[1]),
                getMidPoints(points[0], points[2])], 
                depth - 1);
  }
  //  Draw Left Triangle
  if (depth > 0){
    sierpinski([points[1],
                getMidPoints(points[0], points[1]),
                getMidPoints(points[1], points[2])], 
                depth - 1);
  }
  //  Draw Right Triangle
  if (depth > 0){
    sierpinski([points[2],
                getMidPoints(points[0], points[2]),
                getMidPoints(points[1], points[2])], 
                depth - 1);
  }
  // else{
  //   return;
  // }
}

function getMidPoints(point1, point2){
  let newX = (point1.x + point2.x)/2;
  let newY = (point1.y + point2.y)/2;
  return {x: newX, y: newY};
}

function mousePressed(){
  depth++;
}