// 2D array grid Demo

// let grid = [[1, 0, 1, 0], 
//             [0, 1, 0, 1],
//             [1, 0, 1, 0],
//             [0, 1, 0, 1]];

let grid;
let cellSize;
const GRID_SIZE = 15;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (height < width){
    cellSize = height/GRID_SIZE;
  }
  else {
    cellSize = width/GRID_SIZE;
  }
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
}

function draw() {
  background(220);
  displayGrid();
  ifClicked(mouseX, mouseY);
}

function ifClicked(xLoc, yLoc){
  let Xlocation = floor(xLoc);
  let Ylocation = floor(yLoc);
  if (grid[Ylocation][Xlocation] === 0){
    grid[Ylocation][Xlocation] = 1;
  }
  else{
    grid[Ylocation][Xlocation] = 0;
  }
}

function keyTyped(){
  if (key === "r"){
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  else if (key === "e"){
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
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

function generateRandomGrid(cols, rows){
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

function displayGrid(){
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