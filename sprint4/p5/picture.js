let img;

function preload() {
  img = loadImage("paluk3.jpg");
}

function setup() {
  createCanvas(img.width, img.height);
  image(img, 0, 0);
}

function draw() {
  let x1 = random(width);
  let y1 = random(height);
  let x2 = round(x1 + random(-10, 10));
  let y2 = round(y1 + random(-10, 10));

  stroke(255,0,0)
  strokeWeight(0.1)
  noFill()
  rect(x2,y2,10,2)
  set(x2, y2, get(x1, y1, 100, 2)); // x,y,obj

  updatePixels();
}