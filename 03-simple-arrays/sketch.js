// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

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
}

colours = ["red", "orange", "yellow", "green", "aqua", "blue", "violet"]

coloursGrey = [200, 180, 170, 140, 120, 80, 60, 80, 120, 140, 170, 180, 200]

let allBoxes = [];

let borderSize = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);

  startSquare.x = borderSize/2;
  startSquare.y = borderSize/2;
  movingRect.x = width/2
  movingRect.y = height/2
  angleMode(DEGREES)
  
  
  makeBoxes();
}

function draw() {
  background(220);
  
  drawBoxes();
  drawRect()
}

function makeBoxes(){
  let colourSpace = 0;
  let backwards = 0
  for (let x = 0; x <= width; x += startSquare.w + borderSize){
    for (let y = 0; y <= height; y += startSquare.h + borderSize){
      let newBox = structuredClone(startSquare);
      newBox.x = x;
      newBox.y = y;
      newBox.colour = coloursGrey[colourSpace];
      allBoxes.push(newBox);
      newbox = {};
      colourSpace += 1;
      if (colourSpace === coloursGrey.length){
         colourSpace = 0;
}
      }
    } 
}

function drawBoxes(){
  for (let x in allBoxes){
    fill(allBoxes[x].colour);
    rect(allBoxes[x].x + borderSize/2, allBoxes[x].y + borderSize/2, allBoxes[x].w, allBoxes[x].h);
  }
}

function drawRect(){
  let vectorDirection = random(-360, 360);
  let vectorDistance = random(2, 5);
  let vectorSpeed = random(1, 5);
  vectorValues.x = 0;
  vectorValues.y = 0;
  calculateVector(vectorDirection, vectorDistance);
  
  fill(movingRect.colour);
  rect(movingRect.x, movingRect.y, movingRect.w, movingRect.h);
  
  moveVector(vectorSpeed);
}

function calculateVector(direction, distance){
  vectorValues.y = distance * sin(direction);
  vectorValues.x = distance * cos(direction);
  console.log(vectorValues.x + "\t\t" + vectorValues.y)
  // console.log(vectorValues.x)
}

function moveVector(speed){
  movingRect.x += vectorValues.x;
  movingRect.y += vectorValues.y;
  
  
  
  // let startingPosX = 0;
  // let startingPosY = 0;
  // let rateOfChange = 2;
  



  // if (startingPosX <= vectorValues.x && movingRect.x > 0){
  //   if (vectorValues.x < 0  ){
  //     movingRect.x -= speed;
  //   }
  //   if (vectorValues.x >= 0 && movingRect.x + movingRect.w < width){
  //     movingRect.x += speed;
  //   }
  //   startingPosX += rateOfChange;
  // }
  
  // if (startingPosY <= vectorValues.y && movingRect.x > 0){
  //   if (vectorValues.y < 0){
  //     movingRect.y -= speed;
  //   }
  //   if (vectorValues.y >= 0 && movingRect.y + movingRect.w < height){
  //     movingRect.y += speed;
  //   }
  //   startingPosY += rateOfChange;
  // }  
}

