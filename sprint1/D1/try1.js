// new file :)

var t= 0;

let noiseMap = [];

function setup() {
    createCanvas(800,800);
    noLoop();
    background(255);
}

function noiseLine(){
  stroke(0);

  beginShape();
  for (var x = 0; x < width; x++) {
	var nx = map(x, 0, width, 0, 10);
	var y = height * noise(nx);
	vertex(x, y);
  }
  endShape();
}

function noiseCircles() {
    let noiseLevel = 255;
    let noiseScale = 0.009;

    let map = [];
  
    // Iterate from top to bottom.
    for (let y = 0; y < height; y += 10) {
        map[y]= [];
      // Iterate from left to right.
      for (let x = 0; x < width; x += 10) {

        // Scale the input coordinates.
        let nx = noiseScale * x;
        let ny = noiseScale * y;
        let nt = noiseScale * frameCount;
  
        // Compute the noise value.
        let c = noiseLevel * noise(nx, ny, nt);

        stroke(c,100,120);
        strokeWeight(c*c/100);
        point(x, y);
      }
    }
}

function drawBezier() {
    noFill();
  var x1 = width * noise(t + 15);
  var x2 = width * noise(t + 25);
  var x3 = width * noise(t + 35);
  var x4 = width * noise(t + 45);
  var y1 = height * noise(t + 55);
  var y2 = height * noise(t + 65);
  var y3 = height * noise(t + 75);
  var y4 = height * noise(t + 85);

  bezier(x1, y1, x2, y2, x3, y3, x4, y4);

  t += 0.005;

  // clear the background every 500 frames using mod (%) operator
  if (frameCount % 500 == 0) {
	background(255);
  }
}

function draw() {
    noiseCircles();
    
  }