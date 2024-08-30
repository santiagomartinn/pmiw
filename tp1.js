let img;
let cantX = 2;
let cantY = 2;
let colorRect1 = 255;
let colorRect2 = 0;

function preload() {
  img = loadImage("data/F_24.png" );
}

function setup() {
  createCanvas(800, 400);
  rectMode(CENTER);
}

function draw() {
  background(0);
  image(img, 0, 0, 400, 400);
  for (let x = 0; x < cantX; x++) {
    for (let y = 0; y < cantY; y++) {
      dibujarRect(y, x);
      dibujarRectMedio();
    }
  }
}

function dibujarRect( posY,  posX) {
  for (let i = 3; i > 0; i--) {
   fill(calcularColor(i));
    rect(490 + posX * 190, 105 + posY * 190, 55 * i, 55 * i);
  }
}

function dibujarRectMedio() {
  for (let i = 5; i > 0; i--) {
    if (i % 2 == 0) {
      fill(colorRect1);
    } else {
      fill(colorRect2);
    }
    rect(580, 200, 42 * i, 42 * i);
  }
}

function calcularColor( i) {
  if (i % 2 == 0) {
    return colorRect2;
  } else {
    return colorRect1;
  }
}

function mousePressed() {
  colorRect1 = color(map(mouseX, 0, width, 0, 255), map(mouseY, 0, height, 0, 255), 0);
  colorRect2 = color(map(mouseX, 0, width, 255, 0), map(mouseY, 0, height, 255, 0), 255);
}

function keyPressed() {
  colorRect1 = 255;
  colorRect2 = 0;
}
