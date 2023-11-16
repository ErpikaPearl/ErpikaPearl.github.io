// Connected Nodes OOP Demo

let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for (let aPoint of points) {
    aPoint.display();
    aPoint.update();
    aPoint.connectTo(points);
  }
}

function mousePressed() {
  let thePoint = new MovingPoint(mouseX, mouseY);
  points.push(thePoint);
}

class MovingPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.colour = color(random(255), random(255), random(255));
    this.raduis = 15;
    this.XTime = random(1000);
    this.YTime = random(1000);
    this.deltaTime = 0.01;
    this.reach = 150;
  }

  display() {
    noStroke();
    fill(this.colour);
    circle(this.x, this.y, this.raduis*2);
  }

  update() {
    //  move point
    let dx = noise(this.XTime);
    this.dx = map(dx, 0, 1, -5, 5);
    let dy = noise(this.YTime);
    this.dy = map(dy, 0, 1, -5, 5);

    this.x += this.dx;
    this.y += this.dy;

    this.XTime += this.deltaTime;
    this.YTime += this.deltaTime;

    //  wrap around screen
    if (this.x < 0){
      this.x += width;
    }
    if (this.x > width){
      this.x -= width;
    }
    if (this.y < 0){
      this.y += height;
    }
    if (this.y > height){
      this.y -= height;
    }
  }

  connectTo(pointsArray){
    for (let otherPoint of pointsArray) {
      if (this !== otherPoint) {
        if (dist(this.x, this.y, otherPoint.x, otherPoint.y) < this.reach){
          stroke(this.colour);
          line(this.x, this.y, otherPoint.x, otherPoint.y);
        }
      }
    }
  }
}
