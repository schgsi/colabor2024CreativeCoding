// CIRCULAR SPECTOGRAM
//
// https://youtu.be/8B3GzZo-z9A?si=TyFUVfkKrl_nKTqD
//
// followed tutorial


function preload() {
  soundFile = loadSound('pal2.mp3');
  playing = false;
  soundFile.onended(() => {playing = false;
    document.getElementById("audio").innerText = "Play"; a = 0})
  fr = 60;
}


function setup() {
  createCanvas(800, 800);
  background(255);

  fft = new p5.FFT(0.9, 1024);
  
  a = 360/((soundFile.duration()) * fr);
  b = a;

  fft.setInput(soundFile)
  
  frameRate(fr);
}

function draw() {
    var spectrumA = fft.analyze();
    var spectrumB = spectrumA.reverse();

    spectrumB.splice(0,240)
    
    push();
    noFill();
      translate(width/2, height/2);
      rotate(radians(a));
    // translate(-200,0)
    
    for (let i = 0; i < spectrumB.length; i++) {
      strokeWeight(0.016 * spectrumB[i]);
      stroke(238,42,53, spectrumB[i]);
      line(0,i/2,0,i/2);     
    }
    
    pop();
    
    a+=b;
  }

function toggleAudio(){
    if(!playing) {
        soundFile.play();
        document.getElementById("audio").innerText = "Pause"
    } else {
        soundFile.pause();
        document.getElementById("audio").innerText = "Play"
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