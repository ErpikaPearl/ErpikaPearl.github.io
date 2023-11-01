// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// number ker
//  0 = open space
//  1 = obstacle (tree)
//  4 = obstical (water)
//  5 = background 


let gridLayerOne;
let gridLayerTwo;
let cellSize;
let screenMode;
let drawState = 1;
let border;
const GRID_SIZE = 50;

let colourChoiceBox = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
};



function setup() {
  createCanvas(windowWidth, windowHeight);
  if (height < width){
    cellSize = height/GRID_SIZE;
    screenMode = "landscape";
  }
  else {
    cellSize = width/GRID_SIZE;
    screenMode = "portrait";
  }
  gridLayerOne = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  gridLayerTwo = generateEmptyGrid(GRID_SIZE, GRID_SIZE);

  border = cellSize;

  colourChoiceBox.x = border;
  colourChoiceBox.y = GRID_SIZE * cellSize + border ;
  colourChoiceBox.w = (GRID_SIZE - 2) / 4;
  colourChoiceBox.h = 60;

}

function draw() {
  background(220);
  // displayGrid(gridLayerOne);
  displayGrid(gridLayerTwo);
  chooseDrawState();
}

function mousePressed(){
  if (mouseButton === LEFT){
    ifClicked(mouseX, mouseY, gridLayerTwo);
  }
  else if (mouseButton === CENTER){
    floodFill(floor(mouseX/cellSize), floor(mouseY/cellSize), gridLayerTwo);
  }
}

function keyTyped(){
  if (key === "e"){
    gridLayerTwo = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }

  // else if (key === "d"){
  //   drawShape();
  // }
}

function floodFill(x, y, grid){
  if (grid[y][x] !== 1){
    grid[y][x] = 1;
    for (let cols = y - 1; cols < y + 1; y++){
      for (let rows = x - 1; rows < x + 1; x++){
        //  edge case check
        if (rows >= 0 && rows <= GRID_SIZE && cols >= 0 && cols <= GRID_SIZE && grid[cols][rows] !== 1){
          floodFill(rows, cols, grid);
        }
        else{
          break;
        }
      }
    }
  }
}

function ifClicked(xLoc, yLoc, grid){
  let Xlocation = floor(xLoc/cellSize);
  let Ylocation = floor(yLoc/cellSize);
  if (grid[Ylocation][Xlocation] === 0){
    grid[Ylocation][Xlocation] = 1;
  }
  else{
    grid[Ylocation][Xlocation] = 0;
  }
}

function chooseDrawState(){
  rect(colourChoiceBox.x, colourChoiceBox.y, colourChoiceBox.w, colourChoiceBox.h);
}

function generateEmptyGrid(cols, rows){
  let randomArray = [];
  for (let y = 0; y < cols; y++){
    randomArray.push([]);
    for(let x = 0; x < rows; x++){
      randomArray[y].push(0);
    }
  }
  return randomArray;
}

// function drawShape(grid, orginX, orginY){
//   let averageSize = 3;
//   //  place a marker at orgin
//   //  place 1-2 pixel at average size on each side
//   //    if one pixel is on left side, dont on right (same for top and bottom)
//   //  place 1 pixel on each corner
//   //    one pixel out when in bwteen long pxiels, one innside when beside it
//   //  CONNECT IT??????
// }



function toggleCell(x, y, grid){
  //  check that we are within the grid then toggle
  if(x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE){
    if (grid[y][x] === 0){
      grid[y][x] = 1;
    }
    else if (grid[y][x] === 1){
      grid[y][x] = 0;
    }
  }
}

function displayGrid(grid){
  for (let y = 0; y < GRID_SIZE; y++){
    for (let x = 0; x < GRID_SIZE; x++){
      if (grid[y][x] === 1){
        fill("black");
      }
      else{
        fill("white");
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}