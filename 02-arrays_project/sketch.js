// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//  Declaring objects



//  Declaring variables
let borderSize = 10; // Universal border for everything
let midLine = 0;
let screenType = "battle";

let backgroundX = 0;
let backgroundY = 0;
let backgroundWidth = 0;
let backgroundHeight = 0;


const boxParent = {
  x: borderSize*4,
  y: 0,
  w: 0,
  h: 0,
  colour: "white",
};

const boxChild0 = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  colour: "red",
};
let boxChild1 = {};
let boxChild2 = {};
let boxChild3 = {};

function setup() {
  createCanvas(windowWidth, windowHeight);

  //  Adding to variables
  midLine = width/2;

  boxParent.y = height/1.5;
  boxParent.w = width - borderSize*8;
  boxParent.h = height/3 - borderSize*2;

  boxChild0.x = boxParent.x + borderSize;
  boxChild0.y = boxParent.y + borderSize;
  boxChild0.w = boxParent.w/2 - borderSize*2;
  boxChild0.h = boxParent.h/2 - borderSize*2;
  boxChild1 = structuredClone(boxChild0);
  boxChild2 = structuredClone(boxChild0);
  boxChild3 = structuredClone(boxChild0);

  boxChild1.x = boxChild0.x + borderSize;
  boxChild1.y = boxChild0.y + borderSize;
  boxChild2.x = boxChild0.x;
  boxChild2.y = boxChild0.y + borderSize + boxChild0.h;
  boxChild3.x = boxChild2.x + borderSize + boxChild2.w;
  boxChild3.y = boxChild2.y + borderSize + boxChild0.h;

}

function draw() {
  background(220);
  fill(boxParent.colour);
  rect(boxParent.x, boxParent.y, boxParent.w, boxParent.h);
  rect(boxChild0.x, boxChild0.y, boxChild0.w, boxChild0.h);
  rect(boxChild1.x, boxChild1.y, boxChild1.w, boxChild1.h);
  rect(boxChild2.x, boxChild2.y, boxChild2.w, boxChild2.h);
  rect(boxChild3.x, boxChild3.y, boxChild3.w, boxChild3.h);
}

function whileMousePressed(x, y, w, h){
  //  While the mouse is clicking inside the box, return true
  
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h && mouseIsPressed;
}

// function drawBattleScreen(){
//   if (screenType === "battle"){

//     //  Determining size of boxes & where to place
//     let boxWidth = backgroundWidth/2.5;
//     let boxHeight = backgroundHeight/2.5;
//     let boxYLocation = backgroundY;

//     //  Left Boxes
//     fill(boxColours[0]);
//     rect(midLine - boxWidth - borderSize/2, boxYLocation - boxHeight - borderSize, boxWidth, boxHeight);
//     fill(boxColours[1]);
//     rect(midLine - boxWidth - borderSize/2, boxYLocation, boxWidth, boxHeight);
//     //  Right  boxes
//     fill(boxColours[2]);
//     rect(midLine + borderSize/2, boxYLocation - boxHeight- borderSize, boxWidth, boxHeight);
//     fill(boxColours[3]);
//     rect(midLine + borderSize/2, boxYLocation, boxWidth, boxHeight);

//     // if boxes clicked, turn black
//     if  (whileMousePressed(midLine - boxWidth - borderSize/2, boxYLocation - boxHeight - borderSize, boxWidth, boxHeight)){
//       boxColours[0] = "black";
//       screenType = "attack";
//     }
//     else if  (whileMousePressed(midLine - boxWidth - borderSize/2, boxYLocation, boxWidth, boxHeight)){
//       boxColours[1] = "black";
//       screenType = "run";
//     }
//     else if  (whileMousePressed(midLine + borderSize/2, boxYLocation - boxHeight- borderSize, boxWidth, boxHeight)){
//       boxColours[2] = "black";
//       screenType = "ability";
//     }
//     else if  (whileMousePressed(midLine + borderSize/2, boxYLocation, boxWidth, boxHeight)){
//       boxColours[3] = "black";
//       screenType = "heal";
//     }
//     else{
//       boxColours[0] = "red";
//       boxColours[1] = "red";
//       boxColours[2] = "red";
//       boxColours[3] = "red";
//     }
//   }  
// }



// function drawChoiceScreen(){
//   if (screenType === "ability"){
//     let boxWidth = backgroundWidth;
//     let boxHeight = backgroundHeight;
//     let boxYLocation = backgroundY;

//     fill("green");
//     rect(midLine - background, boxYLocation - boxHeight - borderSize*3, boxWidth, boxHeight); //  THING
//   }

// }




//  JUST IN CASE I NEED
// function drawBattleScreen(){
//   if (screenType = "battle"){

//     //  Left Boxes
//     fill(boxColours[0]);
//     rect(midLine - boxWidth - borderSize/2, boxYLocation - boxHeight - borderSize, boxWidth, boxHeight);
//     fill(boxColours[1]);
//     rect(midLine - boxWidth - borderSize/2, boxYLocation, boxWidth, boxHeight);
//     //  Right  boxes
//     fill(boxColours[2]);
//     rect(midLine + borderSize/2, boxYLocation - boxHeight- borderSize, boxWidth, boxHeight);
//     fill(boxColours[3]);
//     rect(midLine + borderSize/2, boxYLocation, boxWidth, boxHeight);

//     // if boxes clicked, turn black
//     if  (whileMousePressed(midLine - boxWidth - borderSize/2, boxYLocation - boxHeight - borderSize, boxWidth, boxHeight)){
//       boxColours[0] = "black";
//     }
//     else if  (whileMousePressed(midLine - boxWidth - borderSize/2, boxYLocation, boxWidth, boxHeight)){
//       boxColours[1] = "black";
//     }
//     else if  (whileMousePressed(midLine + borderSize/2, boxYLocation - boxHeight- borderSize, boxWidth, boxHeight)){
//       boxColours[2] = "black";
//     }
//     else if  (whileMousePressed(midLine + borderSize/2, boxYLocation, boxWidth, boxHeight)){
//       boxColours[3] = "black";
//     }
//     else{
//       boxColours[0] = "red";
//       boxColours[1] = "red";
//       boxColours[2] = "red";
//       boxColours[3] = "red";
//     }
//   }  
// }