let mic;
let midi_out;
let midi_enabled = false

let soundFile;

let offs=0;

function preload() {
  soundFormats('mp3');
  soundFile = loadSound('code');
}


function setup() {
  let cnv = createCanvas(innerWidth, innerHeight - 10,WEBGL);
  cnv.mousePressed(canvasPressed);
  textAlign(CENTER);
  mic = new p5.AudioIn();
  mic.start();
  soundFile.loop()
  colorMode(HSB)

  background(200,10,10);
  // frameRate(10);



  fft = new p5.FFT(0.8, 1024);
  fft.setInput(soundFile)


  createEasyCam();
    document.oncontextmenu = function () {
        return false;
    }
    document.onmousedown = function () {
        return false;
    }
}

function canvasPressed() {
  // playing a sound file on a user gesture
  // is equivalent to `userStartAudio()`
  // soundFile.play();
}


function draw() {
  translate(-100,-0,-300);
  rotateX(60)

  lights();
  ambientLight(255,0,0);
  normalMaterial()
    
  // ******************************************
  // ******************************************
  
  strokeWeight(0.5)
  text('tap to start', width / 2, 20);
  micLevel = mic.getLevel();
  let y = height - micLevel * height * 10;
  
  
  let spectrum = fft.analyze();
  let waves = fft.waveform()
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    // noFill()
    fill(offs*10%360,100,100,0.05)
    // ambientMaterial(120,100,100-(i/10));
    // specularMaterial(255,i/2,100);
    // stroke(300,60,100)
    noStroke();
    translate(i*width/spectrum.length,0,0)
    // sphere(1+h/10, 8, 4)
    // ellipsoid(1+h/10, 8, 8)
    box(2+h/20)
    rotateX(0.5)
    rotateY(0.01)
    rotateZ(0.2)
    translate(-i*width/spectrum.length,sin(i*0.9+offs)*10, sin(i*0.6+offs)*10)
  }
  
  
  offs+=0.02;
  // translate(sin(offs*200), cos(offs*200), sin(offs*100))
}

// ******************************************
// ******************************************

function keyPressed() {
  // when s is pressed, this will download a png of the frame
  if (key === 's') {
      save('sprint3');
  }
  // when g is pressed, this will download a gif of the first 4 seconds of the animation
  if (key === 'g') {
      saveGif('sprint3', 4);
  }
}