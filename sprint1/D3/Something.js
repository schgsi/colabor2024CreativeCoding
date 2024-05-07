// new file :)

function setup() {
    createCanvas(800,800);
    frameRate(10);
    // noLoop();
    colorMode(HSB);
    
    background(255);

}

function sinCircle(x,y){
    let rad = 200;
    let mid_point = createVector(x,y);

  for (let a=0; a<=360; a+=2)
    {
        stroke(random(360),a/3,a/3);
        strokeWeight(10);
        let x = rad*sin(radians(a))+mid_point.x;
        let y = rad*cos(radians(a))+mid_point.y;
        point(x+random(-10,10),y+random(-10,10));
    }
}

function draw() {
    for (let i = 0; i < 800; i+=100) { 
        sinCircle(i,400);
    }

}