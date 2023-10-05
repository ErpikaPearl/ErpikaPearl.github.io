// Ball Object notiation demo
// Oct. 5, 2023

let theBall = {
  x: 100,
  y: 100,
  radius: 25,
  dx: -4,
  dy: 3,
  r: 225,
  g: 0,
  b: 0,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  moveBall();
  displayBall();
}

function displayBall(){
  fill(theBall.r, theBall.g, theBall.b);
  circle(theBall.x, theBall.y, theBall.radius*2);
}

function moveBall(){
  theBall.x += theBall.dx;
  theBall.y += theBall.dy;

  
  if (theBall.x < 0){
    theBall.x = windowWidth;
  }
  else if (theBall.x > windowWidth){
    theBall.x = 0;
  }
  else if (theBall.y > windowHeight){
    theBall.y = 0;
  }
  else if (theBall.y < 0){
    theBall.y = windowHeight;
  }
}
