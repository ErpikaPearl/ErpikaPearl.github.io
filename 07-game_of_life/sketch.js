// Game of life

let CellSize;
let grid;
const GRID_SIZE = 30;
let autoPlay = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateGrid(GRID_SIZE, GRID_SIZE);
  if (height > width){
    CellSize = width/GRID_SIZE;
  }
  else{
    CellSize = height/GRID_SIZE;
  }
}

function draw() {
  background(220);
  displayGrid();
  if (autoPlay && frameCount % 10 === 0){
    grid = nextTurn();
  }
}

function keyTyped(){
  if (key === "r"){
    grid = generateGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "e"){
    grid = generateEmpty(GRID_SIZE, GRID_SIZE);
  }
  else if (key === " "){
    grid = nextTurn();
  }
  else if (key === "a"){
    autoPlay = !autoPlay;
  }
}

function mousePressed(){
  let y = floor(mouseY/CellSize);
  let x = floor(mouseX/CellSize);

  toggleCell(x, y); //  current cell
}

function nextTurn(){
  let nextTurnGrid = generateEmpty(GRID_SIZE, GRID_SIZE);

  //  Look at every cell
  for (let y = 0; y < GRID_SIZE; y++){
    for (let x = 0; x < GRID_SIZE; x++){
      //  Count neighbors
      let neighbors = 0;

      //  look at cells around a 3x3 grid
      for (let i = -1; i <=1; i++){
        for (let j = -1; j <= 3; j++){
          //  Detect edge cases
          if (y+i >= 0 && y+i < GRID_SIZE && x+j >= 0 && x+j <GRID_SIZE){
            neighbors += grid[y+i][x+j];
          }
         
        }
      }
      //  Dont count the middle 
      neighbors -= grid[y][x];

      //  Apply rules
      if (grid[y][x] === 1){  //  Alive
        if (neighbors === 2 || neighbors === 3){ //  Stay alive
          nextTurnGrid[y][x] = 1;
        }
        else{ //  Die
          nextTurnGrid[y][x] = 0;
        }
      }
      if (grid[y][x] === 0){  //  Dead
        if (neighbors === 3){ //  Be born
          nextTurnGrid[y][x] = 1;
        }
        else{ //  Stay dead
          nextTurnGrid[y][x] = 0;
        }
      }
    }
  }
  return nextTurnGrid;
}

function toggleCell(x, y){
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

function displayGrid(){
  for (let y = 0; y < GRID_SIZE; y++){
    for (let x = 0; x < GRID_SIZE; x++){
      if (grid[y][x] === 0){
        fill("white");
      }
      else{
        fill("black");
      }
      rect(x*CellSize, y*CellSize, CellSize, CellSize);
    }
  }
}

function generateGrid(cols, rows){
  let randomArray = [];
  for (let y = 0; y < rows; y ++){
    randomArray.push([]);
    for (let x = 0; x < cols; x++){
      if (random(100) < 50){
        randomArray[y].push(0);
      }
      else{
        randomArray[y].push(1);
      }
    }
  }
  return randomArray;
}

function generateEmpty(cols, rows){
  let randomArray = [];
  for (let y = 0; y < rows; y ++){
    randomArray.push([]);
    for (let x = 0; x < cols; x++){
      randomArray[y].push(0);
    }
  }
  return randomArray;
}
