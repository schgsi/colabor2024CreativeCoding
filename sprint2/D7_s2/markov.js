let txt;
let myStrArr = [];
let words = {};
let probs = {};
let cx = 500;
let cy = 250;

let fSize // font size
let ms // text to write
let pts = [] // store path data
let pts2 = [] // store path data
let path

function preload() {
    txt = loadStrings("loveletters.txt");
    font = loadFont('_fonts/titanone-regular.ttf');
}

function setup() {
    createCanvas(1200,700);
    background(0);
    getWords();
    analyseWords();
    getProbs();

    frameRate(10)
    
    fSize = 40
    textFont(font)
    textSize(fSize)
    // msg = generateScentense('you', 12);
    // console.log(msg)
    // pts = font.textToPoints(msg, 0, -100, fSize, {
    //     sampleFactor: 0.8, // increase for more points
    //     simplifyThreshold: 0.0 // increase to remove collinear points
    // })
    
    stroke(255)
    strokeWeight(1)
    noFill();

    // dispSentence();
}

function dispSentence() {
    fSize = 60
    textFont(font)
    textSize(fSize)
    msg2 = generateScentense("love", 10) + "...";
    pts2 = font.textToPoints(msg2, 0, -100, fSize, {
        sampleFactor: 0.4, // increase for more points
        simplifyThreshold: 0.0 // increase to remove collinear points
    })
}

function getWords() {
    console.log(txt[0]);
    for (let i = 0; i < txt.length; i++) {
        let tmp = splitTokens(txt[i], " ");
        for (let j = 0; j < tmp.length; j++) {
            if(tmp[j].endsWith(".")) {
                tmp[j] = tmp[j].replace(".", "");
            }
            myStrArr.push(tmp[j]);
        }
    }
}

function analyseWords(){

    for (let i = 0; i < myStrArr.length -1; i++) {
        const curr = myStrArr[i];
        const next = myStrArr[i+1];

        if(!words.hasOwnProperty(curr)) {
            words[curr] = {};
        }
        if(!words[curr].hasOwnProperty(next)) {
            words[curr][next] = 1;
        }
        else {
            words[curr][next]++;
        }
    }
}

function getProbs() {
    for (const word in words) {
        if (Object.hasOwnProperty.call(words, word)) {
            let count = 0;
            const element = words[word];
            probs[word] = {};
            for (const key in element) {
                if (Object.hasOwnProperty.call(element, key)) {
                    const amount = element[key];
                    count += amount;
                }
            }
            let cummulated = 0; 
            for (const key in element) {
                if (Object.hasOwnProperty.call(element, key)) {
                    const amount = element[key];
                    
                    probs[word][key] = amount/count + cummulated;
                    cummulated = probs[word][key];
                }
            }
        }
    }
}

function getNextWord(curr) {
    let wordProbs = probs[curr];
    let tmp = {};

    for (const key in wordProbs) {
        if (Object.hasOwnProperty.call(wordProbs, key)) {
            const element = wordProbs[key];
            tmp[element] = key;
        }
    }
    let keysOnly = Object.keys(tmp);
    keysOnly.sort();
    var randomNum = Math.random();
    for (const key in keysOnly) {
        if (Object.hasOwnProperty.call(keysOnly, key)) {
            const element = keysOnly[key];
            if (randomNum <= element) return tmp[element];
        }
    }
}

function generateScentense(initial = null, length) {
    if (initial === null) {
        //todo pick random word if non specified
    }
    let gen = getNextWord(initial);
    console.log(initial);
    console.log(gen);
    if (length == 1) {
        return initial;
    }
    return initial + " " + generateScentense(gen, length - 1);
}

function parseAndAdd(text) {
    let currentWord = "";
    for (let i = 0; i < text.length; i++) {
        let currentLetter = text[i];
        let nextLetter = text[i];
        currentWord += currentLetter;

        if (nextLetter === " " || nextLetter === "\n" || nextLetter === "," || nextLetter === ".") {
            words.add(currentWord)
        }
    }
}

function getOffset() {
    return Math.floor(Math.random() * (400+300) - 300);
}
function getOffset2() {
    return Math.floor(Math.random() * (200+150) - 150);
}



function draw() {
    dispSentence()
    // background(0)
    push()
    translate(60, height*5/8)
    fill(255,2)
    stroke(255,10)
    strokeWeight(random(0,5));
    // noStroke();
    beginShape(POINTS)
    // vertex(0, -100)
    for (let i = 0; i < pts2.length; i++) {
        const p = pts2[i]
        // stroke(255,i/5,255)

        vertex(p.x, p.y);

        if(i % (getOffset()) === 0 && i > 0) {
            vertex(p.x+getOffset(),p.y+getOffset())
            i+=20;
        }
    }
    vertex(1200, -100)
    endShape()
    pop()
}

//-----------function to save gifs and pngs------------

function keyPressed() {
    // when s is pressed, this will download a png of the frame
    if (key === 's') {
        save('markov');
    }
    // when g is pressed, this will download a gif of the first 4 seconds of the animation
    if (key === 'g') {
      saveGif('markov', 4);
    }
}