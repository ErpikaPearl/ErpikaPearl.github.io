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


let border;
const GRID_SIZE = 50;

let colourChoiceBox1 = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  colour: "green",
  state: 1
};

let drawState = {
  state: 1,
  colour: "green",
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

function floodFillActivation(x, y, grid,){
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

//  THE SAME AS TOGGLECELL
function ifClicked(xLoc, yLoc, grid){
  //  check that the click is within the grid then toggle to whatever the draw state is.  if the same colour as draw state is clicked, erase

  let XLocation = floor(xLoc/cellSize);
  let YLocation = floor(yLoc/cellSize);
  let rows = grid.length;
  let cols = grid[0].length;

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
  if(x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE){
    if (grid[y][x] === drawState.state){
      grid[y][x] = 0;
    }
    else{
      grid[y][x] = drawState.state;
      console.log(drawState, grid[y][x]);
    }
  }
}


function displayGrid(grid){
  //  fills the grid in whatever colour dependent on draw state
  for (let y = 0; y < GRID_SIZE; y++){
    for (let x = 0; x < GRID_SIZE; x++){
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
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}