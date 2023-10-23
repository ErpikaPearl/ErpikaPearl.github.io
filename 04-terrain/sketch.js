// Terrain generation

let terrain = [];
let xOffset = 0;
let bike;

function preload(){
  bike = loadImage("bike.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnRectangles();
}

function draw() {
  background(220);

  if (keyIsDown(RIGHT_ARROW)){
    if (xOffset <= 10000 - xOffset){
      xOffset += 10;
    }
  }
  else if (keyIsDown(LEFT_ARROW)){
    if (xOffset > 5){ //  Don't fall off the left side
      xOffset -= 10;
    }
  }


  displayRectangles();
}

function spawnRectangles(){
  let time = 0;
  for (let x = 0; x < 10000; x++){
    let h = noise(time)* height;
    let thisRect = {
      x: x,
      height: h
    };
    terrain.push(thisRect);
    time += 0.00413;
  }
}

function displayRectangles(){
  for (let i = xOffset; i < width + xOffset; i++){
    let thisRect = terrain[i];
    rect(thisRect.x - xOffset, height - thisRect.height, 1, thisRect.height);
    image(bike, 50, height - thisRect.height + 1, bike.width *0.1, bike.height *0.1);
  }
}

