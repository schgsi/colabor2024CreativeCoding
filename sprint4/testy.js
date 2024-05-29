// CIRCULAR SPECTOGRAM
//
// https://youtu.be/8B3GzZo-z9A?si=TyFUVfkKrl_nKTqD
//
// followed tutorial

function preload() {
  soundFile = loadSound('catsong.mp3');
  playing = false;
  soundFile.onended(() => {playing = false;
    document.getElementById("audio").innerText = "Play"; a = 0})
  fr = 60;
}


function setup() {
  createCanvas(800, 800);

  soundFile.loop()
  
  fft = new p5.FFT();
  fft.setInput(soundFile)

  a = 360/(soundFile.duration()) * fr;
  
  frameRate(fr);
  background(0);
}

function draw() {
    // background(0);
    noFill();

    var spectrumA = fft.analyze();
    var spectrumB = spectrumA.reverse();

    push();
    translate(width /2, height/2);
    rotate(radians(a));
    for (let i = 0; i < spectrumB.length; i++) {
        strokeWeight(0.008 * spectrumB[i]);
        stroke(255,255,255, spectrumB[i]/60);
        line(0,i/4,0,i/4);     
    }

    pop();
}

function toggleAudio(){
    if(!playing) {
        soundFile.play();

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