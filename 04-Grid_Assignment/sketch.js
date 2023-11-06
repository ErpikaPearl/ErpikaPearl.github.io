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

let colourChoiceBox1 = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  colour: "red",
};

let ChoiceBoxes = [];



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

  colourChoiceBox1.w = GRID_SIZE *cellSize / 8 - border;
  colourChoiceBox1.h = GRID_SIZE *cellSize / 8 - border;

  if (screenMode === "portrait"){
    colourChoiceBox1.x = border;
    colourChoiceBox1.y = GRID_SIZE * cellSize + border ;
    ChoiceBoxes.push(colourChoiceBox1);

    //  MAKE NEATER
    let colourChoiceBox2 = structuredClone(colourChoiceBox1);
    colourChoiceBox2.x += colourChoiceBox1.w + border;
    colourChoiceBox2.colour = "blue";
    ChoiceBoxes.push(colourChoiceBox2);

    let colourChoiceBox3 = structuredClone(colourChoiceBox2);
    colourChoiceBox3.x += colourChoiceBox2.w + border;
    colourChoiceBox3.colour = "green";
    ChoiceBoxes.push(colourChoiceBox3);


    let colourChoiceBox4 = structuredClone(colourChoiceBox3);
    colourChoiceBox4.x += colourChoiceBox3.w + border;
    colourChoiceBox4.colour = "orange";
    ChoiceBoxes.push(colourChoiceBox4);

    let colourChoiceBox5 = structuredClone(colourChoiceBox4);
    colourChoiceBox5.x += colourChoiceBox4.w + border;
    colourChoiceBox5.colour = "purple";
    ChoiceBoxes.push(colourChoiceBox5);
  }

  else if (screenMode === "landscape"){
    colourChoiceBox1.x = border;
    colourChoiceBox1.y = GRID_SIZE * cellSize + border ;
  }
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
    floodFillActivation(floor(mouseX/cellSize), floor(mouseY/cellSize), gridLayerTwo);
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

function floodFillActivation(x, y, grid){
  if (grid[y][x] !== 1){
    floodFill(x, y, grid);
  }
}

function floodFill(x, y, grid){
  let rows = grid.length;
  let cols = grid[0].length;
  
  if (x < 0 || x >= rows || y < 0 || y >= cols || grid[y][x] === 1){
    return;
  }
  else{
    grid[y][x] = 1;
    floodFill(x+1, y, grid);
    floodFill(x, y+1, grid);
    floodFill(x-1, y, grid);
    floodFill(x, y-1, grid);
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

  for (let i of ChoiceBoxes){
    fill(i.colour);
    rect(i.x, i.y, i.w, i.h);
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