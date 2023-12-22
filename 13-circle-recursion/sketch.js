// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  recursiveCircle(width/2, mouseY, mouseX);
}

function recursiveCircle(x, y, radius){
  let gray = map(radius, 30, height/2, 0, 255);
  fill(gray, mouseX/255, mouseY/255);
  circle(x, y ,radius*2);
  if (radius <= 30){
    return;
  }
  else{
    recursiveCircle(x-radius/2, y, radius/2);
    recursiveCircle(x+radius/2, y, radius/2);
    recursiveCircle(x, y-radius/2, radius/2);
    recursiveCircle(x, y+radius/2, radius/2);
  }
  
}