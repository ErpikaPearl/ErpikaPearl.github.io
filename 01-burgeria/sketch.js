/*==========================================================================
*  29/09/2023
*
*  Project: Mama's Burgeria
*  Creator: Erika Johnson
*  Teacher: Mr. Schellenburg
*  
*  Purpose: This project is based off of the game "Papa's Burguria." Each
*  box on the left are toppings or buns that the user can move. The user 
*  should be able to put the toppings together to form a burger. Pressing
*  the sauce bottle in the top will make sauce fall to the plate. Clicking
*  the left arrow key will change the bottle to yellow, and the left arrow
*  key will turn it red. Pressing D will change the background to flash 
*  rainbow, and pressing N will change it back to grey.
*
*  Extra for Experts: Objects are defined in the code, and their values
*  are changed from other parts of the code.
*=========================================================================*/

//  Defining variables and objects
let lastDrawTime = 0;
let waitTime = 2;
let mode = "normal";
let spacer = 5;
let spacefromside = 30;

const bunBottom = {
  xCord: spacefromside,
  yCord: -8,  
  hValue: 80,
  wValue: 75,
  colour: "beige",
};
const patty = {
  xCord: spacefromside,
  yCord: bunBottom.yCord + bunBottom.hValue + spacer + 10,
  hValue: 70,
  wValue: 75,
  colour: "brown",
};
const cheeseSlice = {
  xCord: spacefromside,
  yCord: patty.yCord + patty.hValue + spacer,
  hValue: 60,
  wValue: 75,
  colour: "yellow",
};
const lettuce = {
  xCord: spacefromside,
  yCord: cheeseSlice.yCord + cheeseSlice.hValue + spacer,
  hValue: 50,
  wValue: 75,
  colour: "green",
};
const tomato = {
  xCord: spacefromside,
  yCord: lettuce.yCord + lettuce.hValue + spacer,
  hValue: 40,
  wValue: 75,
  colour: "red",
};
const bunTop = {
  xCord: spacefromside,
  yCord: tomato.yCord + tomato.hValue + spacer + 20,
  hValue: 70,
  wValue: 75,
  colour: "beige",
};
const plate = {
  xCord: 0,
  yCord: 0,
  hValue: 60,
  wValue: 160,
  colour: "gray",
};
const sauce = {
  xCord: 0,
  yCord: 0,
  hValue: 50,
  wValue: 5,
};
const sauceBottle = {
  yCord: 0,
  xCord: 0,
  wValue: 30,
  hValue: 70,
  colour: "red",
};


//  Setup and Draw loops
function setup() {
  createCanvas(600, 400);

  //  Defining any variables dependent on height or width
  sauce.xCord = width/2;
  plate.xCord = width/2;
  plate.yCord = height - 100;
}

function draw() {
  //  Change backgrounds depending on mode
  if (mode === "normal"){
    background(220);  
  }
  else if (mode === "disco"){
    background(220);
    drawGradient(0, 0);
  }
  
  //  Draws everything in the scene
  drawPlate(plate);

  makeFood(bunBottom, "bottom");
  makeFood(patty, "no");
  makeFood(cheeseSlice, "no");
  makeFood(lettuce, "no");
  makeFood(tomato, "no");
  makeFood(bunTop, "top");
  
  spawnSauce();
  drawSauceBottle();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    sauceBottle.colour = "yellow";
  }
  if (keyCode === RIGHT_ARROW) {
    sauceBottle.colour = "red";
  }
  if (keyCode === 68){  //  D
    mode = "disco";
  }
  if (keyCode === 78){  //  N
    mode = "normal";
  }
}


//  Defining functions
function spawnSauce(){
//  Spawn sauce if the bottle is clicked
  
  if (whileMousePressed(sauceBottle.xCord, sauceBottle.yCord, sauceBottle.wValue, sauceBottle.hValue)){
    //  Every few seconds, draw a box 
    if (millis() > lastDrawTime + waitTime) {
      fill(sauceBottle.colour);
      noStroke();
      rect(width/2 - 2.5, sauce.yCord, sauce.wValue, sauce.hValue);
      sauce.yCord = sauce.yCord + 5;
      lastDrawTime = millis();
      
      //  Delete sauce once it touches plate
      if(sauce.yCord >= plate.yCord - plate.wValue/4){
        sauce.yCord = 0;
      }
    }
  }
}

function whileMousePressed(x, y, w, h){
  //  While the mouse is clicking inside the box, return true
  
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h && mouseIsPressed;
}

function makeFood(object,isBun) {
  //  Make rectangle objects aka "food" that the user can move
  
  // Define variables
  let x = object.xCord;
  let y = object.yCord;
  let w = object.wValue;
  let h = object.hValue;
  let colour = object.colour;
  let button = whileMousePressed(x, y, w, h);
  
  //  If shape is pressed, follow it
  if (button) {
    stroke("orange");
    object.xCord = mouseX - w / 2; //  Follow mouse
    object.yCord = mouseY - h / 2;
  }
  else {
    stroke(0);
  }
  
  fill(colour); 
  if (isBun === "no"){
    rect(x, y, w, h);
  }
  //  If it is a bun, move the bun up or down
  else if (isBun === "bottom"){
    rect(x, y + 10, w, h);
  }
  else if (isBun === "top"){
    rect(x, y - 20, w, h);
    rect(x, y - 20, w, h - 10);
  }
}

function drawPlate(object) {
  // Draw a plate
  
  // Define variables
  let x = object.xCord;
  let y = object.yCord;
  let w = object.wValue;
  let h = object.hValue;
  let colour = object.colour;
  
  ellipseMode(CENTER);
  fill(colour);
  stroke(0);
  ellipse(x, y, w, h);
  ellipse(x, y, w - 7, h - 7);
}

function drawSauceBottle() {
  // Draws a bottle and lid with whatever colour selected

  // Keeps bottle in middle
  sauceBottle.xCord = width/2 - sauceBottle.wValue / 2;
  
  // Draws the bottle
  fill(sauceBottle.colour);
  stroke(0);
  rect(
    sauceBottle.xCord,
    sauceBottle.yCord,
    sauceBottle.wValue,
    sauceBottle.hValue
  );

  // Draws the lid of the bottle
  fill("white");
  triangle(
    sauceBottle.xCord,
    sauceBottle.hValue,
    width / 2,
    sauceBottle.hValue + 30,
    width / 2 + sauceBottle.wValue / 2,
    sauceBottle.hValue
  );
}

function drawGradient(x, y) {
  // Makes the background flash rainbow
  
  colorMode(HSB, 360, 100, 100);
  let theHue = random(0, 360);
  for (let w = width; w > 0; w = w - 2) {
    fill(theHue, 90, 90);
    noStroke();
    rect(x, y, w, height);
    theHue = (theHue + 1) % 360;
  }
  colorMode(RGB);
}