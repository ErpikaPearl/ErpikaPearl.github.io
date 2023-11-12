/*==========================================================================
*  12/11/2023
*
*  Project: Level Creator
*  Creator: Erika Johnson
*  Teacher: Mr. Schellenburg
*  
*  Purpose: This project is to make level creation for my final project 
*  easier. The purpose of this project is to be able to fill a grid with 
*  various numbers. In my final project, the numbers will represent various 
*  states a cell could have (Eg: ice, water, open space). In this project, 
*  the states are differentiated by colour (listed below). Left clicking
*  inside the grid will draw one square, right clicking will draw either
*  a horizontal or vertical line, and middle clicking will fill the whole 
*  grid. By clicking the coloured boxes, you can change the colour drawn in.
*  By clicking the rectangle, you can change if right clicking draws a 
*  vertical or horizontal line. The left and right arrow keys will move the
*  canvas left or right (More useful if you can't see th whole canvas).
*
*  Extra for Experts: Recursive functions are use in the flood fill and
*  draw line functions.
*=========================================================================*/

// Number Key:
//  0, white = open space
//  1, green = non solid object 1
//  4, blue = non solid object (water)
//  5, black = solid object (concrete) 
//  6, aqua = solid object (ice) 
//  7, brown = solid object (dirt) 
//  numbers 2 and 3 are gonna be used later for the player and enemies


//  Declaring variables
let gridLayerTwo; //  called layer two because i might be planning to add a grid underneath this for the final project
let cellSize;
let screenMode;
let horizontal = true;
let xOffset = 0;
let border;
let paintBrush;

//  Code is made for when witdh is greater than length
const GRID_WIDTH = 120; 
const GRID_HEIGHT = 60;

//  Declaring objects
let colourChoiceBox1 = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  colour: "green",
  state: 1,
};

let DirectionDrawBox = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
};

let drawState = {
  state: 1,
  colour: "green",
};

//  Declaring containers
let ChoiceBoxes = [];
let finalBox = {};

function preload(){
  paintBrush = loadImage('PaintBursh-HQ.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //  Declaring variables
  cellSize = 10;
  border = cellSize;

  //  Generate the empty grid
  gridLayerTwo = generateEmptyGrid(GRID_WIDTH, GRID_HEIGHT);

  //  Create the boxes underneath grid, and then add them to the array
  colourChoiceBox1.w = GRID_WIDTH *cellSize / 16 - border;
  colourChoiceBox1.h = GRID_HEIGHT *cellSize / 8 - border;
  colourChoiceBox1.x = border;
  colourChoiceBox1.y = GRID_HEIGHT * cellSize + border ;
  ChoiceBoxes.push(colourChoiceBox1);

  let colourChoiceBox2 = structuredClone(colourChoiceBox1);
  colourChoiceBox2.x += colourChoiceBox1.w + border;
  colourChoiceBox2.colour = "blue";
  colourChoiceBox2.state = 4;
  ChoiceBoxes.push(colourChoiceBox2);

  let colourChoiceBox3 = structuredClone(colourChoiceBox2);
  colourChoiceBox3.x += colourChoiceBox2.w + border;
  colourChoiceBox3.colour = "black";
  colourChoiceBox3.state = 5;
  ChoiceBoxes.push(colourChoiceBox3);

  let colourChoiceBox4 = structuredClone(colourChoiceBox3);
  colourChoiceBox4.x += colourChoiceBox3.w + border;
  colourChoiceBox4.colour = "aqua";
  colourChoiceBox4.state = 6;
  ChoiceBoxes.push(colourChoiceBox4);

  let colourChoiceBox5 = structuredClone(colourChoiceBox4);
  colourChoiceBox5.x += colourChoiceBox4.w + border;
  colourChoiceBox5.colour = "brown";
  colourChoiceBox5.state = 7;
  ChoiceBoxes.push(colourChoiceBox5);

  let colourChoiceBox6 = structuredClone(colourChoiceBox5);
  colourChoiceBox6.x += colourChoiceBox5.w + border;
  colourChoiceBox6.colour = "white";
  colourChoiceBox6.state = 0;
  ChoiceBoxes.push(colourChoiceBox6);

  //Create the direction box, defult to horizontal  
  DirectionDrawBox.x = colourChoiceBox6.x + colourChoiceBox6.w + border;
  DirectionDrawBox.y = colourChoiceBox6.y + colourChoiceBox6.h/3;
  DirectionDrawBox.w = colourChoiceBox6.w;
  DirectionDrawBox.h = colourChoiceBox6.h/3;

  //  A referance of the final box drawn, used to switch DirectionDrawBox from vertical to horizontal
  finalBox = structuredClone(colourChoiceBox6);

  document.addEventListener("contextmenu", event => event.preventDefault());  //  Disables right click menu
  noCursor();
}

function draw() {
  
  background(150);
  displayGrid(gridLayerTwo);
  chooseDrawState();
  DirectionChoice();

  //  Moves the grid left or right
  if (keyIsDown(RIGHT_ARROW)){
    if (xOffset <= GRID_WIDTH * cellSize - xOffset){
      xOffset += 10;
    }
  }
  else if (keyIsDown(LEFT_ARROW)){
    if (xOffset > 5){ 
      xOffset -= 10;
    }
  }
  
  image(paintBrush, mouseX - 37, mouseY - 37, 40, 40);  //  Adds a paint brush instead of cursor
  
}


//  Detecting imputs

function mousePressed(){
  if (mouseX > DirectionDrawBox.x && mouseX < DirectionDrawBox.x + DirectionDrawBox.w && mouseY > DirectionDrawBox.y && mouseY < DirectionDrawBox.y + DirectionDrawBox.h){
    horizontal = !horizontal;
  }
  else if (mouseButton === LEFT){
    ifClicked(mouseX + xOffset, mouseY, gridLayerTwo);
  }
  else if (mouseButton === RIGHT){
    drawLineActivation(floor((xOffset + mouseX)/cellSize), floor(mouseY/cellSize), gridLayerTwo, drawState.state, horizontal);
  }
  else if (mouseButton === CENTER){
    floodFillActivation(floor((xOffset + mouseX)/cellSize), floor(mouseY/cellSize), gridLayerTwo, drawState.state);
  }
  
}

function keyTyped(){
  if (key === "e"){
    gridLayerTwo = generateEmptyGrid(GRID_WIDTH, GRID_HEIGHT);
  }
}


//  Declaring functions

function drawLineActivation(x, y, grid, state, verticalOrHorizontal){
  //  Activates the DrawLine fucntion, but only if you clicked an empty space

  if (grid[y][x] !== state){
    drawLine(x, y, grid, state, verticalOrHorizontal);
  }
}

function drawLine(x, y, grid, state, verticalOrHorizontal){
  //  Draws a vertical or horizontal line

  //  Get size of grid
  let rows = grid.length;
  let cols = grid[y+1].length;
  
  // Base case: outside of grid or the square is already coloured 
  if (x < 0 || x >= rows || y < 0 || y >= cols || grid[y][x] === state){
    return;
  }
  else if (verticalOrHorizontal === true){  //  Horizontal line
    grid[y][x] = state;
    drawLine(x+1, y, grid, state, verticalOrHorizontal);
    drawLine(x-1, y, grid, state, verticalOrHorizontal);
  }
  else {
    grid[y][x] = state;
    drawLine(x, y+1, grid, state, verticalOrHorizontal);  //  Vertical line
    drawLine(x, y-1, grid, state, verticalOrHorizontal);
  }
}

function floodFillActivation(x, y, grid, state){
  //  Activates floodFill function, but only if you clicked an empty space

  if (grid[y][x] !== state){
    floodFill(x, y, grid, state);
  }
}

function floodFill(x, y, grid, state){
  //  Fills the grid in a colour 

  //  Get size of grid
  let rows = grid.length;
  let cols = grid[y+1].length;

  // Base case: outside of grid or the square is already coloured 
  if (x < 0 || x >= rows || y < 0 || y >= cols || grid[y][x] === state){
    return;
  }
  else{
    grid[y][x] = state;
    floodFill(x+1, y, grid, state);
    floodFill(x-1, y, grid, state);
    floodFill(x, y-1, grid, state);
    floodFill(x, y+1, grid, state);
  }

}

function DirectionChoice(){
  //  Draws a horizontal or vertical rectangle

  fill("black");
  if (horizontal){
    DirectionDrawBox.x = finalBox.x + finalBox.w + border;
    DirectionDrawBox.y = finalBox.y + finalBox.h/3;
    DirectionDrawBox.w = finalBox.w;
    DirectionDrawBox.h = finalBox.h/3;
  }
  else{
    DirectionDrawBox.x = finalBox.x + finalBox.w + border + finalBox.h/3;
    DirectionDrawBox.y = finalBox.y;
    DirectionDrawBox.w = finalBox.h/3;
    DirectionDrawBox.h = finalBox.w;
  }

  rect(DirectionDrawBox.x, DirectionDrawBox.y, DirectionDrawBox.w, DirectionDrawBox.h);

}

function ifClicked(xLoc, yLoc, grid){
  //  check that the click is within the grid then toggle to whatever the draw state is. If the same colour as draw state is clicked, erase

  //  Declaring variables
  let XLocation = floor(xLoc/cellSize);
  let YLocation = floor(yLoc/cellSize);
  let cols = grid.length;
  let rows = grid[YLocation].length;

  if (XLocation > 0 && XLocation < cols && YLocation > 0 && YLocation < rows){  //  Edge case
    if (grid[YLocation][XLocation] === drawState.state){
      grid[YLocation][XLocation] = 0;
    }
    else{
      grid[YLocation][XLocation] = drawState.state;
    }
  }
}

function whileMousePressed(x, y, w, h){
  //  While the mouse is clicking inside the box, return true
  
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h && mouseIsPressed;
}

function chooseDrawState(){
  //  Draws the coloured boxes, if the boxes are clicked, set the state value to the state of box clicked

  for (let i of ChoiceBoxes){
    fill(i.colour);
    rect(i.x, i.y, i.w, i.h);
    if (whileMousePressed(i.x, i.y, i.w, i.h)){
      drawState.state = i.state;
    }
  }
}

function generateEmptyGrid(cols, rows){
  //  Generates an empty grid in size given

  let randomArray = [];
  for (let y = 0; y < cols; y++){
    randomArray.push([]);
    for(let x = 0; x < rows; x++){
      randomArray[y].push(0);
    }
  }
  return randomArray;
}

function displayGrid(grid){
  //  fills the grid in whatever colour dependent on draw state
  
  for (let y = 0; y < GRID_HEIGHT; y++){
    for (let x = 0; x < GRID_WIDTH; x++){
      if (grid[y][x] === 1){
        fill("green");
      }
      else if (grid[y][x] === 4){
        fill("blue");
      }
      else if (grid[y][x] === 5){
        fill("black");
      }
      else if (grid[y][x] === 6){
        fill("aqua");
      }
      else if (grid[y][x] === 7){
        fill("brown");
      }
      else{
        fill("white");
      }
      rect(x*cellSize - xOffset, y*cellSize, cellSize, cellSize);
    }
  }
}