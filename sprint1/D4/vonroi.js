let points = [];
let numPoints = 50;

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
    noLoop();

  // Generate random points
  for (let i = 0; i < numPoints; i++) {
    points.push(createVector(random(width), random(height)));
  }
}

function draw() {
  background(0);

//   colorMode(HSB);
  
  // Draw Voronoi diagram
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let minDist = dist(width, height, 0, 0); // Maximum possible distance
      let index = -1;
      
      // Find the nearest point
      for (let i = 0; i < points.length; i++) {
        let d = dist(x, y, points[i].x, points[i].y);
        if (d < minDist) {
          minDist = d;
          index = i;
        }
      }
      
      // Set color based on the nearest point's location
      let c = color(map(index, 0, points.length, 0, 100), random(x/5,255), random(y/5,255));
      let pix = (x + y * width) *24;
      pixels[pix] = red(c);
      pixels[pix + 1] = green(c);
      pixels[pix + 2] = blue(c);
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
  
  // Draw the points
  for (let i = 0; i < points.length; i++) {
    stroke(255);
    strokeWeight(4);
    point(points[i].x, points[i].y);
  }
}
