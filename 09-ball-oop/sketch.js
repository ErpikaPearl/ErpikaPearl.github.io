// Ball OOP Demo

class Ball {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.radius = random(15, 30);
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }

  move(){
    this.x += this.dx;
    this.y += this.dy;

    if (this.x - this.radius < 0 || this.x + this.radius > width){
      this.dx = -this.dx;
    }
    else if ( this.y - this.radius < 0 || this.y + this.radius > height){
      this.dy = -this.dy;
    }
  }

  display(){
    noStroke();
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.radius*2);
  }

  collide(otherball){
    let radiisum = this.radius + otherball.radius;
    let distanceApart = dist(this.x, this.y, otherball.x, otherball.y);
    if (distanceApart <= radiisum){
      let tempx = this.dx;
      let tempy = this.dy;

      this.dx = otherball.dx;
      this.dy = otherball.dy;

      otherball.dx = tempx;
      otherball.dy = tempy;

    }
  }

}

let ballarray = [];


function setup() {
  createCanvas(windowWidth, windowHeight);

  let theBall = new Ball(width/2, height/2);
  ballarray.push(theBall);
}

function draw() {
  background(220);
  for (let someBall of ballarray){
    someBall.move();
    for (let otherball of ballarray){
      if (someBall !== otherball){
        someBall.collide(otherball);
      }
    }
    someBall.display();  
  }
}

function mousePressed(){
  let theBall = new Ball(mouseX, mouseY);
  ballarray.push(theBall);
}
