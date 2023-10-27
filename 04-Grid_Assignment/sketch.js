// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gridLayerOne;
let gridLayerTwo;
let cellSize;
const GRID_SIZE = 50;


function setup() {
  createCanvas(windowWidth, windowHeight);
  if (height < width){
    cellSize = height/GRID_SIZE;
  }
  else {
    cellSize = width/GRID_SIZE;
  }
  gridLayerOne = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  gridLayerTwo = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
}

function draw() {
  background(220);
  // displayGrid(gridLayerOne);
  displayGrid(gridLayerTwo);
}

function mousePressed(){
  // ifClicked(mouseX, mouseY, gridLayerTwo);
  floodFill(mouseX, mouseY, gridLayerTwo);
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

function keyTyped(){
  // if (key === "r"){
  //   grid = generateObstacles(GRID_SIZE, GRID_SIZE);
  // }
  if (key === "e"){
    gridLayerOne = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  else if (key === "d"){
    drawShape();
  }
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

function drawShape(grid, orginX, orginY){
  let averageSize = 3;
  //  place a marker at orgin
  //  place 1-2 pixel at average size on each side
  //    if one pixel is on left side, dont on right (same for top and bottom)
  //  place 1 pixel on each corner
  //    one pixel out when in bwteen long pxiels, one innside when beside it
  //  CONNECT IT??????
}

function floodFill(x, y, grid){
  if (grid[y][x] !== 1){
    grid[y][x] === 1;
    for (let cols = y - 1; cols > y + 1; y++){
      for (let rows = x - 1; rows > x + 1; x++){
        if (grid[cols][rows] !== 1){
          //pANIN
        }
      }
    }
  }
  //fill orgin as black
  //if sides are not black, fill as black
  // as long as the pixels are not black, call function again
}

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

function generateObstacles(cols, rows){
  let randomArray = [];
  for (let y = 0; y < cols; y++){
    randomArray.push([]);
    for(let x = 0; x < rows; x++){
      if (random(100) < 50) {
        randomArray[y].push(0);
      }
      else{
        randomArray[y].push(1);
      }
    }
  }
  return randomArray;
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