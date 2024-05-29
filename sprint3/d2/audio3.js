let mic;
let midi_out;
let midi_enabled = false

let soundFile;

let offs=0;

function preload() {
  soundFormats('mp3');
  soundFile = loadSound('song');
}


function setup() {
  let cnv = createCanvas(innerWidth, innerHeight - 10,WEBGL);
  cnv.mousePressed(canvasPressed);
  textAlign(CENTER);
  mic = new p5.AudioIn();
  mic.start();
  soundFile.loop()
  colorMode(HSB)


  fft = new p5.FFT(0.8, 512);
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
  background(200,10,10);
  translate(0,-100,-0)

  lights();
  ambientLight(200,100,100);
  // normalMaterial()
    
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
    ambientMaterial(120,100,20+i/5);
    // specularMaterial(100,i/2,50);
    // stroke(300,60,100)
    noStroke();
    translate(i*width/spectrum.length,0,0)
    // sphere(1+h/10, 8, 4)
    ellipsoid(1+h/5, 16, 16)
    rotateX(5)
    rotateY(5)
    // box(2+h/10)
    rotateZ(5)
    translate(-i*width/spectrum.length,sin(i*8+offs)*100,sin(i*8+offs)*50)
  }
  
  

  offs+=0.01;
}


function send_cc(value, cc) {
  const val = parseInt(abs(value)) % 128
  midi_out.sendControlChange(cc, value);
  // console.log(`send midi cc: ${val}`);
}
function send_note(note, duration) {
  midi_out.playNote(note, { duration });
  // console.log(`send midi note: ${note}`);
}


// ******************************************
// ******************************************
// MIDI FUNCTIONS!
function init_midi() {
  WebMidi
  .enable()
  .then(onEnabled)
  .catch(err => alert(err));
  
  function onEnabled() {
    // Display available MIDI input devices
    if (WebMidi.outputs.length < 1) {
      console.log("No device detected.");
    } else {
      WebMidi.outputs.forEach((device, index) => {
        console.log(`${index}: ${device.name}`);
      });
      // midi_out = WebMidi.outputs[0].channels[1]
      create_buttons()
    }
  }
}

function create_buttons() {
  for (let i = 0; i < WebMidi.outputs.length; i++) {
    const midi = WebMidi.outputs[i];
    let btn = createButton(midi.name);
    btn.position(50, 40 * (i + 1));
    btn.mousePressed(() => {
      midi_out = midi.channels[1];
      console.log(`midi port selected: ${midi.name}`);
      removeElements()
      midi_enabled = true
    })
  }
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