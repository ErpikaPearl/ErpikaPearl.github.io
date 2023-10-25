// Neighbors

let CellSize;
let grid;
const GRID_SIZE = 10;

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
}

function mousePressed(){
  let y = floor(mouseY/CellSize);
  let x = floor(mouseX/CellSize);

  toggleCell(x, y); //  current cell
  toggleCell(x, y-1); //  north
  toggleCell(x+1, y); //  east
  toggleCell(x, y+1); //  south
  toggleCell(x-1, y); //  west

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
