// List things

let offs = 0;
let list1 = ['house ', 'pain ', 'love ', 'feeling ', 'life ', 'time ' ];
let list2 = ['end ', 'seize ', 'flourish ', 'be ', 'come ', 'burn' ];

let nouns = ['truth ', 'tree ', 'book ', 'love ', 'park ', 'guest ', 'pleasure ', 'faith ', 'boy ', 'girl ', 'accident ', 'town ', 'thing ', 'media ', 'internet ']
let adjec = ['wild ', 'scary ', 'smiling ', 'shy ', 'kind ', 'evil ', 'turbulent ', 'calm ', 'dead ', 'sweet ', 'cute ']

function setup() {
  createCanvas(800, 800);
  frameRate(0.5);
}

function draw() {
    background(255);
    fill(10);
    textSize(24);
    textFont('monospace');
    textAlign(LEFT);
    // text("When will this " + list1[floor(random(6))] + list2[floor(random(6))], 200,200,windowWidth, windowHeight)
    text(nouns[floor(random(15))] + "of " + adjec[floor(random(11))] + nouns[floor(random(15))], 200,200,windowWidth, windowHeight)
    offs+=0.05;
    // text("8===D",300,300);
    translate(100,100)

}
