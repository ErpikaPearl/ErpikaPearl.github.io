// character in grid demo

let CellSize;
let grid;
const GRID_SIZE = 40;

let playerX = 0;
let playerY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateGrid(GRID_SIZE, GRID_SIZE);

  //  put plater in grid
  grid[playerY][playerX] = 9;

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
}

function keyTyped(){
  if (key === "r"){
    grid = generateGrid(GRID_SIZE, GRID_SIZE);
  }
  else if (key === "e"){
    grid = generateEmpty(GRID_SIZE, GRID_SIZE);
  }
  else if (key === "s"){ //  move down
    movePlayer(0, 1);
  }
  else if (key === "w"){ //  move up
    movePlayer(0, -1);
  }
  else if (key === "a"){ //  move left
    movePlayer(-1, 0);
  }
  else if (key === "d"){ //  move right
    movePlayer(1, 0);
  }
}

function movePlayer(x, y){
  //  edge case check
  if (playerX + x >= 0 && playerX + x <= GRID_SIZE && playerY + y >= 0 && playerY + y <= GRID_SIZE){
    //  Check if hitting wall
    if (grid[playerY + y][playerX + x] === 0){
      let tempX = playerX;
      let tempY = playerY;
      
      playerX += x;
      playerY += y;

      //  update grid
      grid[playerY][playerX] = 9;
      grid[tempY][tempX] = 0;
    }
  }
}

function mousePressed(){
  let y = floor(mouseY/CellSize);
  let x = floor(mouseX/CellSize);

  toggleCell(x, y); //  current cell
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
      else if (grid[y][x] === 1){
        fill("black");
      }
      else if (grid[y][x] === 9){
        fill("green");
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
