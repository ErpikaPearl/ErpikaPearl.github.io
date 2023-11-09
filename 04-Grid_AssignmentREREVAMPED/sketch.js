// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//  saveJSON
//  Save Local storage
//  https://cs30.wmcicompsci.ca/reference/strings.html

// number key
//  0, white = open space
//  1, green = obstacle (tree)
//  4, blue = obstacle (water)
//  5, black = wall (concrete) 
//  6, aqua = wall (ice) 
//  7, brown = wall (grass/dirt) 


let gridLayerOne;
let gridLayerTwo;
let cellSize;
let screenMode;
let horizontal = true;
let xOffset = 0;


let border;
const GRID_WIDTH = 120;
const GRID_HEIGHT = 60;

let colourChoiceBox1 = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  colour: "green",
  state: 1
};

let DirectionDrawBox = {
  x: 0,
  y: 0,
  w: 0,
  h: 0
};

let drawState = {
  state: 1,
  colour: "green",
};

let ChoiceBoxes = [];
let finalBox = {};

function setup() {
  createCanvas(windowWidth, windowHeight);
  // if (height < width){
  //   cellSize = height/GRID_SIZE;
  //   screenMode = "landscape";
  // }
  // else {
  //   cellSize = width/GRID_SIZE;
  //   screenMode = "portrait";
  // }

  cellSize = 10;

  gridLayerOne = generateEmptyGrid(GRID_WIDTH, GRID_HEIGHT);
  gridLayerTwo = generateEmptyGrid(GRID_WIDTH, GRID_HEIGHT);

  border = cellSize;

  colourChoiceBox1.w = GRID_WIDTH *cellSize / 16 - border;
  colourChoiceBox1.h = GRID_HEIGHT *cellSize / 8 - border;

  colourChoiceBox1.x = border;
  colourChoiceBox1.y = GRID_HEIGHT * cellSize + border ;
  ChoiceBoxes.push(colourChoiceBox1);

  //  MAKE NEATER
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

  DirectionDrawBox.x = colourChoiceBox6.x + colourChoiceBox6.w + border;
  DirectionDrawBox.y = colourChoiceBox6.y + colourChoiceBox6.h/3;
  DirectionDrawBox.w = colourChoiceBox6.w;
  DirectionDrawBox.h = colourChoiceBox6.h/3;

  finalBox = structuredClone(colourChoiceBox6);

  document.addEventListener("contextmenu", event => event.preventDefault());
}

function draw() {
  background(220);
  // displayGrid(gridLayerOne);
  displayGrid(gridLayerTwo);
  chooseDrawState();
  DirectionChoice();

  if (keyIsDown(RIGHT_ARROW)){
    if (xOffset <= GRID_WIDTH * cellSize - xOffset){
      xOffset += 10;
      console.log("RIGHT!!!!!!!");
    }
  }
  else if (keyIsDown(LEFT_ARROW)){
    if (xOffset > 5){ //  Don't fall off the left side
      xOffset -= 10;
    }
  }
}

function mousePressed(){
  if (mouseButton === LEFT){
    ifClicked(mouseX + xOffset, mouseY, gridLayerTwo);
  }
  else if (mouseButton === RIGHT){
    drawLineActivation(floor(mouseX/cellSize) , floor(mouseY/cellSize), gridLayerTwo, drawState.state, horizontal);
  }
  else if (mouseButton === CENTER){
    floodFillActivation(floor(mouseX/cellSize), floor(mouseY/cellSize), gridLayerTwo, drawState.state);
  }
}

function keyTyped(){
  if (key === "e"){
    gridLayerTwo = generateEmptyGrid(GRID_WIDTH, GRID_HEIGHT);
  }
}

function drawLineActivation(x, y, grid, state, verticalOrHorizontal){
  if (grid[y][x] !== state){
    drawLine(x, y, grid, state, verticalOrHorizontal);
  }
}

function drawLine(x, y, grid, state, verticalOrHorizontal){
  let rows = grid.length;
  let cols = grid[y].length;
  
  if (x < 0 || x >= rows || y < 0 || y >= cols || grid[y][x] === state){
    return;
  }
  else if (verticalOrHorizontal === true){
    grid[y][x] = state;
    drawLine(x+1, y, grid, state, verticalOrHorizontal);
    drawLine(x-1, y, grid, state, verticalOrHorizontal);
  }
  else {
    grid[y][x] = state;
    drawLine(x, y+1, grid, state, verticalOrHorizontal);
    drawLine(x, y-1, grid, state, verticalOrHorizontal);
  }
}

function floodFillActivation(x, y, grid, state){
  if (grid[y][x] !== state){
    floodFill(x, y, grid, state);
  }
}

function floodFill(x, y, grid, state){
  let rows = grid.length;
  let cols = grid[y].length;
  
  if (x < 0 || x >= rows || y < 0 || y >= cols || grid[y][x] === state){
    return;
  }
  else{
    grid[y][x] = state;
    floodFill(x+1, y, grid, state);
    floodFill(x, y+1, grid, state);
    floodFill(x-1, y, grid, state);
    floodFill(x, y-1, grid, state);
  }
}

function DirectionChoice(){
  fill("black");
  if (whileMousePressed(DirectionDrawBox.x, DirectionDrawBox.y, DirectionDrawBox.w, DirectionDrawBox.h)){
    horizontal = !horizontal;
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
  }

  rect(DirectionDrawBox.x, DirectionDrawBox.y, DirectionDrawBox.w, DirectionDrawBox.h);

}

//  THE SAME AS TOGGLECELL
function ifClicked(xLoc, yLoc, grid){
  //  check that the click is within the grid then toggle to whatever the draw state is.  if the same colour as draw state is clicked, erase

  let XLocation = floor(xLoc/cellSize);
  let YLocation = floor(yLoc/cellSize);
  let cols = grid.length;
  let rows = grid[YLocation].length;

  if (XLocation > 0 && XLocation < cols && YLocation > 0 && YLocation < rows){
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
  //  Draws the coloured boxes, if the boxes are clicked, set the colour and state values to the colour of box clicked
  for (let i of ChoiceBoxes){
    fill(i.colour);
    rect(i.x, i.y, i.w, i.h);
    if (whileMousePressed(i.x, i.y, i.w, i.h)){
      drawState.state = i.state;
      drawState.colour = i.colour;
    }
  }
}

function generateEmptyGrid(cols, rows){
  //  Generates an empty grid
  let randomArray = [];
  for (let y = 0; y < cols; y++){
    randomArray.push([]);
    for(let x = 0; x < rows; x++){
      randomArray[y].push(0);
    }
  }
  return randomArray;
}


function toggleCell(x, y, grid){
  //  check that the click is within the grid then toggle to whatever the draw state is.  if the same colour as draw state is clicked, erase
  if(x >= 0 && x < GRID_WIDTH && y >= 0 && y < GRID_HEIGHT){
    if (grid[y][x] === drawState.state){
      grid[y][x] = 0;
    }
    else{
      grid[y][x] = drawState.state;
    }
  }
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