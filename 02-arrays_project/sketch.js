// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//  Declaring objects
const partyLeader = {
  hP: 50,
  mP: 25,
  attack: 50,
  defence: 20,
  hitRate: 5,
  abiliies: ["one", "two", "three", "four"]
};

const partyMemberOne = {
  hP: 50,
  mP: 25,
  attack: 50,
  defence: 20,
  hitRate: 5,
  abiliies: ["one", "two", "three", "four"]
};

const partyMemberTwo = {
  hP: 50,
  mP: 25,
  attack: 50,
  defence: 20,
  hitRate: 5,
  abiliies: ["one", "two", "three", "four"]
};

const partyMemberThree = {
  hP: 50,
  mP: 25,
  attack: 50,
  defence: 20,
  hitRate: 5,
  abiliies: ["one", "two", "three", "four"]
};

//  Declaring variables
let borderSize = 10; // Universal border for everything
let midLine = 0;

let screenType = "battle";

let backgroundX = 0;
let backgroundY = 0;
let backgroundWidth = 0;
let backgroundHeight = 0;

let boxWidth = 0;
let boxHeight = 0;
let boxYLocation = 0;
let boxColours = ["red", "red",  "red", "red"];

function setup() {
  createCanvas(windowWidth, windowHeight);

  //  Adding to variables
  backgroundX = width/2;
  backgroundY = height/1.3;
  backgroundWidth = width/1.4;
  backgroundHeight = height/3.5;

  midLine = width/2;
}

function draw() {
  background(220);
  drawBackground();
  drawBattleScreen();
  drawChoiceScreen()

  console.log(screenType)
}

function whileMousePressed(x, y, w, h){
  //  While the mouse is clicking inside the box, return true
  
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h && mouseIsPressed;
}





function drawBattleScreen(){
  if (screenType = "battle"){

    //  Determining size of boxes & where to place
    let boxWidth = backgroundWidth/2.5;
    let boxHeight = backgroundHeight/2.5;
    let boxYLocation = backgroundY;

    //  Left Boxes
    fill(boxColours[0]);
    rect(midLine - boxWidth - borderSize/2, boxYLocation - boxHeight - borderSize, boxWidth, boxHeight);
    fill(boxColours[1]);
    rect(midLine - boxWidth - borderSize/2, boxYLocation, boxWidth, boxHeight);
    //  Right  boxes
    fill(boxColours[2]);
    rect(midLine + borderSize/2, boxYLocation - boxHeight- borderSize, boxWidth, boxHeight);
    fill(boxColours[3]);
    rect(midLine + borderSize/2, boxYLocation, boxWidth, boxHeight);

    // if boxes clicked, turn black
    if  (whileMousePressed(midLine - boxWidth - borderSize/2, boxYLocation - boxHeight - borderSize, boxWidth, boxHeight)){
      boxColours[0] = "black";
      // screenType = "choice"
    }
    else if  (whileMousePressed(midLine - boxWidth - borderSize/2, boxYLocation, boxWidth, boxHeight)){
      boxColours[1] = "black";
    }
    else if  (whileMousePressed(midLine + borderSize/2, boxYLocation - boxHeight- borderSize, boxWidth, boxHeight)){
      boxColours[2] = "black";
    }
    else if  (whileMousePressed(midLine + borderSize/2, boxYLocation, boxWidth, boxHeight)){
      boxColours[3] = "black";
    }
    else{
      boxColours[0] = "red";
      boxColours[1] = "red";
      boxColours[2] = "red";
      boxColours[3] = "red";
    }
  }  
}

function drawBackground(){
  rectMode(CENTER);
  fill("white");
  rect(backgroundX, backgroundY, backgroundWidth, backgroundHeight);
  rectMode(CORNER);
}

function drawChoiceScreen(){
  if (screenType = "choice"){
    fill("green");
    rect(midLine - boxWidth - borderSize, boxYLocation - boxHeight - borderSize*2, boxWidth*2 + borderSize*2, boxHeight*2 + borderSize*3);
  }

}




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