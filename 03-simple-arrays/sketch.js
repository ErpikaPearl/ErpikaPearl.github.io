/*=============================================================================
*  25/10/2023
*
*  Project: Dancing square!
*  Creator: Erika Johnson
*  Teacher: Mr. Schellenburg
*  
*  Purpose: This project is only visual. The background is a grid of grey cubes 
*  formed from objects in an array. An orangle rectangle moves around the screen
*  randomly. If the rectangle touches the side of the screen, it moves to the 
*  oppisite side of the screen.
*
*  Extra for Experts: The rectangle is moved by vectors, which were calculated
*  without using the vector object.
*=============================================================================*/


//  Declaring global variables
const startSquare = {
  x: 0,
  y: 0,
  w: 40,
  h: 40, 
  colour: 'red'
};

const movingRect = {
  x: 0,
  y: 0,
  w: 90,
  h: 50,
  colour: "orange"
};

const vectorValues = {
  x: 0,
  y: 0,
};

let coloursGrey = [200, 180, 170, 140, 120, 80, 60, 80, 120, 140, 170, 180, 200];
let allBoxes = [];
let borderSize = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);

  //  Editing variables
  startSquare.x = borderSize/2;
  startSquare.y = borderSize/2;
  movingRect.x = width/2;
  movingRect.y = height/2;
  angleMode(DEGREES);

  makeBoxes();
}

function draw() {
  background(220);
  
  drawBoxes();
  drawRect();

  //  For the cooler, much more laggy code uncomment the below lines 
  // makeBoxes();
  // coloursGrey.unshift(coloursGrey.pop());
}

function makeBoxes(){
  //  Makes an array for a grid of boxes

  let colourSpace = 0;
  let backwards = 0
  for (let x = 0; x <= width; x += startSquare.w + borderSize){
    for (let y = 0; y <= height; y += startSquare.h + borderSize){
      let newBox = structuredClone(startSquare);
      newBox.x = x;
      newBox.y = y;
      newBox.colour = coloursGrey[colourSpace];
      allBoxes.push(newBox);
      newBox = {};
      colourSpace += 1;
      if (colourSpace === coloursGrey.length){
       colourSpace = 0;
      }
    }
  } 
}

function drawBoxes(){
  //  Draws a background of boxes from the array

  for (let x in allBoxes){
    fill(allBoxes[x].colour);
    rect(allBoxes[x].x + borderSize/2, allBoxes[x].y + borderSize/2, allBoxes[x].w, allBoxes[x].h);
  }
}

function drawRect(){
  //  Draws a rectangle that moves randomly

  //  Declare local variables
  let vectorDirection = random(-360, 360);
  let vectorDistance = random(2, 80);
  vectorValues.x = 0;
  vectorValues.y = 0;
  calculateVector(vectorDirection, vectorDistance);
  
  //  Draw and move rectangle
  fill(movingRect.colour);
  rect(movingRect.x, movingRect.y, movingRect.w, movingRect.h);
  
  moveVector();
}

function calculateVector(direction, distance){
  //  Calculates the x and y values of the vector from the direction and distance given

  vectorValues.y = distance * sin(direction);
  vectorValues.x = distance * cos(direction);
}

function moveVector(){
  //  Moves the rectangle depending on the vector, moves rectangle through the wall if touched

  movingRect.x += vectorValues.x;
  movingRect.y += vectorValues.y;
  
  if (movingRect.x < 0){ //  left wall
    movingRect.x = width -  movingRect.w;
  }
  else if  (movingRect.x + movingRect.w >= width){ //  right wall
    movingRect.x = 0;
  }
  if (movingRect.y <= 0){ //  top wall
    movingRect.y = height - movingRect.h;
  }
  else if  (movingRect.y >= height){ //  bottom wall
    movingRect.y = 0;
  }
}