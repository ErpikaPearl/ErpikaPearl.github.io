// Inheritence Demo

let theParticle;
let SomeConfetti;

function setup() {
  createCanvas(windowWidth, windowHeight);
  theParticle = new Particle(width/2, height/2);
  SomeConfetti = new Confetti(width/2, height/2);
}

function draw() {
  background(0);
  theParticle.update();
  theParticle.display();

  SomeConfetti.update();
  SomeConfetti.display();
}


class Particle {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.size = 30;
  }

  update() {
    this.x += random(-5, 5);
    this.y += random(-5, 5);
  }

  display() {
    circle(this.x, this.y, this.size);
  }
}

class Confetti extends Particle {
  constructor(x, y){
    super(x, y);
  }

  update() {
    super.update();
    this.size += random(-3, 3);
  }

  display() {
    square(this.x, this.y, this.size);
  }
}