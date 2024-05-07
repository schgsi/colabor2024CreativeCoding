// new file :)

offsX = 0;
offsY = 0;
let x = 0;

let noiseMap = [];

function setup() {
    createCanvas(800,800);
    // frameRate(20);
    // noLoop();
    colorMode(HSB);
    angleMode(RADIANS);
    
    background(255);

    getNoise();
}

function sinSquare(x,y,radius) {
    let rad = radius;
    let mid_point = createVector(x,y);

    for (let i = 0; i < 360; i+=2) {   
        let x = rad*sin(radians(i))+mid_point.x +offsX;
        let y = rad*cos(radians(i))+mid_point.y +offsY;
        fill(random(20),random(50,100),i/4);
        // strokeWeight(1);
        noStroke();
        ellipse(x,y,10);
    }
}

function newThingy(){
    for (let i = 100; i < 1000; i+=200) {
        for (let j = 100; j < 800; j+=200) {
            // fill(i/4,j/4,100);
            noFill();
            stroke(100);
            strokeWeight(0.1);
            bezier(i+offsY/4, j-offsX/10, i+offsX, j*cos(i), i*sin(i),j+50-offsY,i,j);
        }
    }
}

function newZwei(){
    bezier(10,10,800-mouseX,800-mouseY,mouseX,mouseY,790,790)
    bezier(790,10,800-mouseX,800-mouseY,mouseX,mouseY,10,790)
}

function getNoise() {
    for (let i = 0; i < 800; i++) {
        noiseMap[i] = [];
        for (let j = 0; j < 800; j++) {
            noiseMap[i][j] = noise(i,j);
        }      
    }
}

function funny() {
    fill(offsX/2.5%360,100,100);
    strokeWeight(0.5);
    ellipse(offsX,offsY,noiseMap[x][Math.floor(offsY.y)],noiseMap[Math.floor(offsX.x)][Math.floor(offsY.y)]);
    fill(offsX/2.5%360,40,100);
    noStroke()
    ellipse(offsX-25,offsY-25,20,20);

    offsX=(offsX+(sin(random(-400,400))*random(20))+10)%800;
    offsY=(offsY+(sin(random(-400,400))*random(20))+6)%800;
    x = Math.floor(offs);
}

function draw() {
    // background(0);
    // newThingy();
    
    for (let i = 0; i < 800; i+=10) {
        for (let j = 0; j < 800; j+=10) {
            fill(0)
            ellipse(i,j,(noiseMap[i][j])*(noiseMap[i][j])*10)
            
        }
        
    }

    funny();

    // for (let i = 0; i < 600; i+=20) {   
    //     sinSquare(400,400,i)
    // }
    // offsY+=sin(a*10);
    // offsX+=sin(a*10);
    // a+=0.01;
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