// Images and sounds demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let mario;
let moonLightSonata;
let battleTheme;

function preload(){
  mario = loadImage("Mario.png");
  moonLightSonata = loadSound("SONG.mp3");
  battleTheme = loadSound("battleTheme.mp3");

  battleTheme.setVolume(0.5);
  moonLightSonata.setVolume(1.0);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);

  image(mario, mouseX, mouseY, mario.width *0.1, mario.height *0.1);
  // circle(mouseX, mouseY, 50);
}

function mousePressed(){
  moonLightSonata.play();
  
  if(!battleTheme.isPlaying()){
    battleTheme.loop();
  }
}