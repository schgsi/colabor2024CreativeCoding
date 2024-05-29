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
  let cnv = createCanvas(innerWidth, innerHeight);
  cnv.mousePressed(canvasPressed);
  textAlign(CENTER);
  mic = new p5.AudioIn();
  mic.start();
  soundFile.loop()
  colorMode(HSB)

  background(200,10,10);



  fft = new p5.FFT(0.8, 1024);
  fft.setInput(soundFile)

}

function canvasPressed() {
  // playing a sound file on a user gesture
  // is equivalent to `userStartAudio()`
  // soundFile.play();
}


function draw() {
  background(200,10,10);
    
  // ******************************************
  // ******************************************
    
  let spectrum = fft.analyze();
  
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    
  }
  
  

  offs+=0.02;
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