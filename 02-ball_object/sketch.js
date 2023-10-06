// Ball Object notiation demo
// Oct. 5, 2023

let theBall;

function setup() {
  createCanvas(windowWidth, windowHeight);
  theBall = spawnBall();
}

function draw() {
  background(220);
  moveBall();
  displayBall();
}

function keyTyped(){
  if (key === " "){
    theBall = spawnBall();
  }
}

function displayBall(){
  fill(theBall.r, theBall.g, theBall.b);
  circle(theBall.x, theBall.y, theBall.radius*2);
}

function moveBall(){
  theBall.x += theBall.dx;
  theBall.y += theBall.dy;

  //  off the left
  if (theBall.x + theBall.radius < 0){
    theBall.x = windowWidth;
  }
  //  off the right
  else if (theBall.x - theBall.radius > windowWidth){
    theBall.x = 0;
  }
  //  off the top
  else if (theBall.y + theBall.radius < 0){
    theBall.y = windowHeight;
  }
  //  off the bottom
  else if (theBall.y - theBall.radius > windowHeight){
    theBall.y = 0;
  }
}

function spawnBall(){
  let theBall = {
    x: random(width),
    y: random(height),
    radius: random(15, 30),
    dx: random(-5, 5),
    dy: random(-5, 5),
    r: random(0, 255),
    g: random(0, 255),
    b: random(0, 255),
  };
  return theBall;
}

