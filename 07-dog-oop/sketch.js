// Dog OOP Demo

class Dog {
  constructor(name, colour, breed, age, size){
    this.name = name; 
    this.colour = colour;
    this.breed = breed;
    this.age = age;
    this.size = size;
  }

  bark(){
    console.log("arf! says " + this.name);
  }
}

let spot = new Dog("apot", "brown", "poodle", 4, "huge");
let rover = new Dog("rover", "white", "german shepherd", 5, "big");


function setup() {
  createCanvas(windowWidth, windowHeight);
  spot.bark();
  rover.bark();
}

function draw() {
  background(220);
}
