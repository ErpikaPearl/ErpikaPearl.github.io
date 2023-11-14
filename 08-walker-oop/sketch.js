// Walker oop

class Walker {
  constructor(x, y, colour){
    this.x = x;
    this.y = y;
    this.colour = colour;
    this.speed = 5;
    this.size = 5;
  }

  display(){
    noStroke();
    fill(this.colour);
    circle(this.x, this.y, this.size);
  }

  move(){
    let theCoice = random(100);
    if (theCoice < 25){
      //down
      this.y += this.speed;
    }
    else if (theCoice < 50){
      //up
      this.y -= this.speed;
    }
    else if (theCoice < 75){
      //left
      this.x -= this.speed;
    }
    else {
      //right
      this.x += this.speed;
    }
  }
}

let allTheWalkers = [];

let gabe;
// let emma;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("white");
  //  Instantiate
  gabe = new Walker(width/2, height/2, "blue");
  allTheWalkers.push(gabe);
  // emma = new Walker(200, 400, "red");

}

function draw() {
  for (let person of allTheWalkers){
    person.move();
    person.display();
  }
}

function mousePressed(){
  gabe = new Walker(mouseX, mouseY, "blue");
  allTheWalkers.push(gabe);
}