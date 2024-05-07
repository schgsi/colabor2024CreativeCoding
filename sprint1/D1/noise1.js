let grid = [];          // array for grid
let gridWidth;          // defined in setup, width/cellsize
let gridHeight;         // defined in setup, height/cellsize
let cellSize = 100;     // how far apart vectors are set
let offs = 0;           // to use in draw function


function setup() {
    createCanvas(1000,1000); // for 3D space
    angleMode(RADIANS);
    gridWidth = width / cellSize;
    gridHeight = height / cellSize;
    // frameRate(10);
    noLoop();
    fillGrid();         // calls function to set vectors (here so the noise is not redefined again later)

}

// fills points of grid with random vectors
function fillGrid() {
    for (let i = 0; i <= gridWidth; i++) {
        grid[i] = [];
        for (let j = 0; j <= gridHeight; j++) {
            let angle = random() * 2 * PI;
            grid[i][j] = createVector(cos(angle),sin(angle));
        }    
    }
}

// perlin function that will calculate values for every pixel
function perlin2D(x, y) {
    let x0 = floor(x);
    let x1 = x0 + 1;
    let y0 = floor(y);
    let y1 = y0 + 1;
    
    let locX = x - x0;
    let locY = y - y0;

    let topL = grid[x0 % gridWidth][y0 % gridHeight].dot(createVector(locX, locY));
    let topR = grid[x1 % gridWidth][y0 % gridHeight].dot(createVector(locX - 1, locY));
    
    let botL = grid[x0 % gridWidth][y1 % gridHeight].dot(createVector(locX, locY - 1));    
    let botR = grid[x1 % gridWidth][y1 % gridHeight].dot(createVector(locX - 1, locY - 1));    

    let top = lerpy(fade(locX), topL, topR);
    let bot = lerpy(fade(locX), botL, botR);

    return lerpy(fade(locY), top, bot);
}

// interpolation function
function lerpy(t, a, b) {
    return a + t * (b - a);
}

// fade function
function fade(t) {
    return ((6 * t - 15) * t + 10) * t * t * t;
}

function setColor(noiseVal, iNoise, jNoise){
  i = iNoise/5;
  j = jNoise/5;
  if (noiseVal >0.0 && noiseVal <= 0.1) {
    fill(234, 221, 202);
  } else if(noiseVal >0.1 && noiseVal <= 0.15) {
    fill(225, 193, 110);
  } else if(noiseVal >0.15 && noiseVal <= 0.2) {
    fill(205, 127, 50);
  } else if(noiseVal >0.2 && noiseVal <= 0.25) {
    fill(165, 42, 42);
  } else if(noiseVal >0.25 && noiseVal <= 0.3) {
    fill(218, 160, 109);
  } else if(noiseVal >0.3 && noiseVal <= 0.35) {
    fill(128, 0, 32);
  } else if(noiseVal >0.35 && noiseVal <= 0.4) {
    fill(233, 116, 81);
  } else if(noiseVal >0.4 && noiseVal <= 0.45) {
    fill(210, 125, 45);
  } else if(noiseVal >0.45 && noiseVal <= 0.5) {
    fill(193, 154, 107);
  } else if(noiseVal >0.5 && noiseVal <= 0.55) {
    fill(154, 42, 42);
  } else if(noiseVal >0.55 && noiseVal <= 0.6) {
    fill(240, 230, 140);
  } else if(noiseVal >0.6 && noiseVal <= 0.65) {
    fill(128, 0, 0);
  } else if(noiseVal >0.65 && noiseVal <= 0.7) {
    fill(150, 121, 105);
  } else if(noiseVal >0.7 && noiseVal <= 0.75) {
    fill(242, 210, 189);
  } else if(noiseVal >0.75 && noiseVal <= 0.8) {
    fill(74, 4, 4);
  } else if(noiseVal >0.8 && noiseVal <= 0.9){
    fill (128, 70, 27);
  } else if(noiseVal >0.9 && noiseVal <= 1.0){
    fill (210, 180, 140);
  }

}

function draw() {
    background(255);
    for (let i = 0; i < width; i+=1) {
        for (let j = 0; j < height; j+=1) {
            const perl = perlin2D(i/cellSize + offs,j/cellSize + (2*offs)) * 0.5 + 0.5;
            const col = color(perl*255, i/4, j/4);
            noStroke();
            setColor(perl, i, j);
            rect(i,j,1,1);
        }     
    }
    // move same grid over framerate
    offs+=0.1;
}


//-----------function to save gifs and pngs------------

function keyPressed() {
    // when s is pressed, this will download a png of the frame
    if (key === 's') {
        save('perlin');
    }
    // when g is pressed, this will download a gif of the first 4 seconds of the animation
    if (key === 'g') {
      saveGif('perlin', 4);
    }
}

function keyTyped() {
  if (key == 'f') {
    let d=new Date();
    /* ~~~~~~~~~~~~ export SVG */
    save(d+'.svg')
    noLoop();
  }
}