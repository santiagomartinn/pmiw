// TP#Final Parte 2 - Comisión 3, David Bedoian
// Ludmila Prost 119117/5 - Santiago Martin 120340/6
// Película elegida: Intensamente
// Video explicativo: https://youtu.be/O4t6P9qYsKI
let juego;
let img;
let imgInstrucciones; // Imagen para las instrucciones
let imgCursor; 
let sonido;
let mostrarInstrucciones = true; // Variable para controlar la pantalla de instrucciones

function preload() {
  img = loadImage("data/imagenes/intensamente.jpg");
  imgInstrucciones = loadImage("data/imagenes/instrucciones.jpg"); // Carga la imagen de instrucciones
  imgCursor = loadImage("data/imagenes/alegria.png");
  soundFormats('mp3');
  sonido = loadSound('data/intensamentemusica');
}

function setup() {
  createCanvas(640, 480);
  noCursor(); 
  juego = new Juego(); // Crear una instancia de la clase Juego
  juego.setup(); // Llamar al método setup de la clase Juego
}

function draw() {
 if (mostrarInstrucciones) {
    // Mostrar pantalla de instrucciones
    background(255);
    imageMode(CENTER);
    image(imgInstrucciones, width / 2, height / 2, 640, 480); // Muestra la imagen de instrucciones
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(35);
    text("INTENSAMENTE", 10, 20, 300, 150);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Tu misión es coleccionar esferas verdes, mientras evitas las esferas rojas. \n¡Si logras recolectar 20 esferas verdes, ganarás! Pero, ¡ten cuidado! Si llegas a recoger 3 esferas rojas, perderás el juego.", 20, 100, 250, 300);
    fill(74,237,76);
    textSize(15);
    text("Presiona una tecla para comenzar", 30, 265, 250,280);
    fill(0);
    textSize(12);
    text("(Clickear el mouse para comenzar y deterner la musica)", 30, 310, 250,280);
    text("Ludmila Prost 119117/5 \nSantiago Martin 120340/6", 385, 200, 300, 480);
    return; // No seguir con el juego hasta que se presione una tecla
  }

  juego.draw(); // Llamar al método draw de la clase Juego
}

function mousePressed() {
  juego.mousePressed(); // Llamar al método mousePressed de la clase Juego
}

function keyPressed() {
  if (mostrarInstrucciones) {
    mostrarInstrucciones = false; // Ocultar la pantalla de instrucciones
  }
  juego.keyPressed(); // Llamar al método keyPressed de la clase Juego
}

class Juego {
  constructor() {
    this.basura = []; 
    this.cant = 7;
    this.puntos = new Puntos(); // Instanciamos la clase Puntos
    this.vidas = new Vidas(); // Instanciamos la clase Vidas
    this.juegoTerminado = false; 
    this.derrota = false; // Controla si el jugador pierde
  }

  setup() {
    for (let i = 0; i < this.cant; i++) {
      this.basura[i] = new Basura(); // Inicializar las basuras
    }
    sonido.loop(); // Reproducir sonido en bucle
  }

  draw() {
    background(255);
    image(img, 320, 240, width, height);

    if (this.juegoTerminado) {
      if (this.derrota) {
        // Mostrar pantalla de Derrota
        fill(255, 0, 0);
        textAlign(CENTER, CENTER);
        textSize(50);
        text("DERROTA", width / 2, height / 2);
      } else {
        // Mostrar pantalla de Victoria
        fill(0, 255, 0);
        textAlign(CENTER, CENTER);
        textSize(50);
        text("VICTORIA", width / 2, height / 2);
      }

      fill(255);
      textSize(20);
      text("Oprime una tecla para reiniciar", width / 2, height / 2 + 50);
      return; 
    }

    let mouseYFixed = height - 20;

    for (let i = 0; i < this.cant; i++) {
      this.basura[i].actualizar();
    }

    this.puntos.mostrarPuntos(); // Mostrar los puntos utilizando la clase Puntos
    this.vidas.mostrarVidas(); // Mostrar las vidas restantes usando la clase Vidas

    for (let i = 0; i < this.cant; i++) {
      if (this.basura[i].evaluaColision(mouseX, mouseYFixed)) {
        if (this.basura[i].tipo == 0) {
          this.puntos.incrementarPunto(); // Incrementar los puntos si colisiona con una esfera verde
        } else {
          this.vidas.reducirVida(); // Reducir una vida si colisiona con un objeto incorrecto
          if (this.vidas.getVidas() <= 0) {
            this.juegoTerminado = true;
            this.derrota = true; // Marcar derrota
          }
        }
      }
    }

    imageMode(CENTER);
    image(imgCursor, mouseX, mouseYFixed, 100, 100); 

    if (this.puntos.getPuntos() >= 20) {
      this.juegoTerminado = true; 
    }
  }

  mousePressed() {
   if (sonido.isPlaying()) {
    sonido.stop();
  } else {
    sonido.play();
  }
}

  keyPressed() {
    if (this.juegoTerminado) {
      this.reiniciarJuego(); 
    }
  }

  reiniciarJuego() {
    this.puntos.reiniciarPuntos(); // Reiniciar los puntos
    this.vidas.reiniciarVidas(); // Reiniciar las vidas
    this.juegoTerminado = false;
    this.derrota = false;

    for (let i = 0; i < this.cant; i++) {
      this.basura[i].reiniciarUbicacion();
    }
  }
}

class Basura {
  constructor() {
    this.tipo = int(random(0, 2)); 
    this.reiniciarUbicacion();
    this.despX = 0;
    this.despY = 5; 
    this.lado = 60;
    this.img = loadImage("data/imagenes/esfera_" + this.tipo + ".png");
  }

  actualizar() {
    this.mover();
    this.dibujar();
  }

  mover() {
    this.x += this.despX;
    this.y += this.despY;
    if (this.y > height + 50) {
      this.reiniciarUbicacion();
    }
  }

  dibujar() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    image(this.img, 0, 0, this.lado, this.lado);
    pop();
  }

  reiniciarUbicacion() {
    this.x = random(width);
    this.y = -random(50, 200); 
  }

  evaluaColision(x_, y_) {
    if (dist(this.x, this.y, x_, y_) < this.lado / 2) {
      this.reiniciarUbicacion();
      return true;
    } else {
      return false;
    }
  }
}

// Clase Puntos para gestionar los puntos del jugador
class Puntos {
  constructor() {
    this.puntos = 0;
  }

  incrementarPunto() {
    this.puntos++;
  }

  reiniciarPuntos() {
    this.puntos = 0;
  }

  getPuntos() {
    return this.puntos;
  }

  mostrarPuntos() {
    textAlign(LEFT,TOP);
    textSize(20);
    fill(255);
    text("Puntos: " + this.puntos, 20, 30); // Mostrar los puntos
  }
}

// Clase Vidas para gestionar las vidas del jugador
class Vidas {
  constructor() {
    this.vidas = 3;
  }

  reducirVida() {
    this.vidas--;
  }

  reiniciarVidas() {
    this.vidas = 3;
  }

  getVidas() {
    return this.vidas;
  }

  mostrarVidas() {
    textAlign(LEFT,TOP);
    textSize(20);
    fill(255);
    text("Vidas: " + this.vidas, 20, 60); // Mostrar las vidas restantes
  }
}
