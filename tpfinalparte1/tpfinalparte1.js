// TP#Final Parte 1 - Comisión 3, David Bedoian
// Ludmila Prost 119117/5 - Santiago Martin 120340/6
// Película elegida: Intensamente
// Video explicativo: 
let apuntador = 0;
let pantalla = 0;
let textos = [];
let imagenes = [];
let textosEC, parrafos, titulos = [];
let botonSI = "SI";
let botonNO = "NO";
let botonEMP = "COMENZAR";
let botonRESET = "REINICIAR";
let botonSOUND= "SONIDO";
let sonido;

function preload() {
  textosEC = loadStrings("data/textos.txt");
  for (let i = 0; i < 15; i++) {
    imagenes[i] = loadImage("data/imagenes/imagen_" + nf(i+1, 2) + ".jpeg");
    parrafos = loadFont("data/fuentes/BebasNeue-Regular.ttf");
    titulos = loadFont("data/fuentes/LilitaOne-Regular.ttf");
  }
  soundFormats('mp3');
    sonido = loadSound('data/intensamentemusica');
}
function setup() {
  createCanvas(640, 480);
  for (let i = 0; i < textosEC.length; i++) {
    let linea = textosEC[i];
    let lineaArray = split(linea, "#");
    textos[lineaArray[0]] = lineaArray[1];
  }
  sonido.loop();
}

function draw() {
  background(0);
  image(imagenes[pantalla], 0, 0, 640, 480);

  //Mostrar textos
  fill(255);
  stroke(0);
  textSize(30);
  textAlign(CENTER);
  textFont(parrafos);
  text(textos[pantalla], 30, 50, 580, 250);
   //Mostrar botón RESET en las pantallas 7, 13 y 14
  if (pantalla === 7) {
    dibujobotonRESET();
  } else if (pantalla === 13) {
    dibujobotonRESET();
  } else if (pantalla === 14) {
    dibujobotonRESET();
   //Mostrar boton EMP en la pantalla 0
  } else if (pantalla ===0) {
    dibujobotonEMP ();
    //Mostrar titulo 
    fill(213, 214, 0);
    textSize(40);
    textAlign(CENTER);
    textFont (titulos);
    text("INTENSAMENTE", 30, 50, 580, 250);
    //Mostrar creditos
    fill(255);
    stroke(0);
    textSize(25);
    textAlign(CENTER);
    textFont(parrafos);
    text("Prost Ludmila 119117/5\n Martin Santiago 120340/6", 5, 100, 250, 300);
  } else {
    dibujoboton();
  }
}

function dibujoboton() {
  fill(255);
  textSize(20);
  textAlign(CENTER);

  //Botón "SI"
  fill(255);
  rect(150, height - 80, 100, 50); // Botón en la parte inferior
  fill(0);
  text(botonSI, 150 + 50, height - 80 + 35); // Centrar texto en el botón

  //Botón "NO"
  fill(255);
  rect(400, height - 80, 100, 50); // Botón en la parte inferior
  fill(0);
  text(botonNO, 400 + 50, height - 80 + 35); // Centrar texto en el botón
}
function dibujobotonRESET() {
  fill(255);
  textSize(20);
  textAlign(CENTER);

  //Botón "REINICIAR"
  fill(255);
  rect(150, height - 80, 100, 50); // Botón en la parte inferior
  fill(0);
  text(botonRESET, 150 + 50, height - 80 + 35); // Centrar texto en el botón
}
function dibujobotonEMP() {
  fill(255);
  textSize(20);
  textAlign(CENTER);

  //Botón "COMENZAR"
  fill(255);
  rect(150, height - 80, 100, 50); // Botón en la parte inferior
  fill(0);
  text(botonEMP, 150 + 50, height - 80 + 35); // Centrar texto en el botón
}

function mousePressed() {
  if (pantalla === 0) {
    sonido.play();
    //Botón "COMENZAR"
    if (colisionBoton(150, height - 80, 100, 50)) {
      pantalla = 1; 
    }
  } else if (pantalla === 1) {
    //Botón "SI"
    if (colisionBoton(150, height - 80, 100, 50)) {
      pantalla = 2;
    }
    //Botón "NO"
    else if (colisionBoton(400, height - 80, 100, 50)) {
      pantalla = 3; 
    }
  } else if (pantalla === 2) {
    if (colisionBoton(150, height - 80, 100, 50)) {
      pantalla = 5;
    } else if (colisionBoton(400, height - 80, 100, 50)) {
      pantalla = 4;
    }
  } else if (pantalla === 3) {
    if (colisionBoton(150, height - 80, 100, 50)) {
      pantalla = 6;
    } else if (colisionBoton(400, height - 80, 100, 50)) {
      pantalla = 7;
    }
  } else if (pantalla === 4) {
    if (colisionBoton(150, height - 80, 100, 50)) {
      pantalla = 8; 
    } else if (colisionBoton(400, height - 80, 100, 50)) {
      pantalla = 9;
    }
  } else if (pantalla === 5) {
    if (colisionBoton(150, height - 80, 100, 50)) {
      pantalla = 10;
    } else if (colisionBoton(400, height - 80, 100, 50)) {
      pantalla = 6;
    }
  } else if (pantalla === 6) {
    if (colisionBoton(150, height - 80, 100, 50)) {
      pantalla = 11;
    } else if (colisionBoton(400, height - 80, 100, 50)) {
      pantalla = 7;
    }
  } else if (pantalla === 7) {
    //Boton "REINICIAR"
    if (colisionBoton(150, height - 80, 100, 50)) {
      pantalla = 0;
    }
  } else if (pantalla === 8) {
    if (colisionBoton(150, height - 80, 100, 50)) {
      pantalla = 10;
    } else if (colisionBoton(400, height - 80, 100, 50)) {
      pantalla = 11;
    }
  } else if (pantalla === 9) {
    if (colisionBoton(150, height - 80, 100, 50)) {
      pantalla = 12;
    } else if (colisionBoton(400, height - 80, 100, 50)) {
      pantalla = 6;
    }
  } else if (pantalla === 10) {
    if (colisionBoton(150, height - 80, 100, 50)) {
      pantalla = 14;
    } else if (colisionBoton(400, height - 80, 100, 50)) {
      pantalla = 13;
    }
  } else if (pantalla === 11) {
    if (colisionBoton(150, height - 80, 100, 50)) {
      pantalla = 14;
    } else if (colisionBoton(400, height - 80, 100, 50)) {
      pantalla = 12;
    }
  } else if (pantalla === 12) {
    if (colisionBoton(150, height - 80, 100, 50)) {
      pantalla = 14;
    } else if (colisionBoton(400, height - 80, 100, 50)) {
      pantalla = 13;
    }
  } else if (pantalla === 13) {
    if (colisionBoton(150, height - 80, 100, 50)) {
      pantalla = 0;
    }
  } else if (pantalla === 14) {
    if (colisionBoton(150, height - 80, 100, 50)) {
      pantalla = 0;
    }
  }
}

function colisionBoton(x, y, w, h) {
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    return true;
  } else {
    return false;
  }
}
