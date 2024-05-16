let txt;
let myStrArr = [];
let words = {};
let probs = {};
let cx = 400;
let cy = 400;

//let font = "fonts/FiraSansMedium.woff"; // opentype.js font object
let fSize // font size
let ms // text to write
let pts = [] // store path data
let pts2 = [] // store path data
let path

function preload() {
    // txt = loadStrings("theSunIsAlsoAStar.txt");
    txt = loadStrings("palestine.txt");
    // font = loadFont('Futurafuturisblackc.otf');
    font = loadFont('_fonts/AnonymousPro-Regular.ttf');
}

function setup() {
    createCanvas(800,800);
    background(0);
    getWords();
    analyseWords();
    getProbs();

    colorMode(HSB, 100);
    frameRate(10)
    // noLoop();
    
    fSize = 30
    textFont(font)
    textSize(fSize)
    msg = generateScentense('he', 100);
    console.log(msg)
    pts = font.textToPoints(msg, 0, -100, fSize, {
        sampleFactor: 0.4, // increase for more points
        simplifyThreshold: 0.0 // increase to remove collinear points
    })
    //console.log(pts) // { x, y, path angle }

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
        //console.log(myStrArr);
    }
}

function analyseWords(){
    // need key 1st word
    // need value following word
    // need probability amount of following word is same
    // now how tf do i do that

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
    return Math.floor(Math.random() * (200+150) - 150);
}
function getOffset2() {
    return Math.floor(Math.random() * (200+150) - 150);
}

function textCircle(rotation, word) {
    let cx = 400;
    let cy = 400;
    let r;
    let texty = generateScentense(word, 200);
    let textArr = texty.split("");
    print(textArr);
    angleMode(DEGREES);
    let j=0;
    for (let a = 0; a < 10; a++) {
        r = Math.floor(Math.random() * (80-30)+30); 
        textSize(r/2)
        for (let i = 0; i < 360; i+=2) {
            x = r * cos(i) + cx;
            y = r * sin(i) + cy; 
            fill(i/4, 100, 100)
            translate (400, 400);
            rotate(rotation);
            translate (-400, -400);
            text(textArr[j], x, y);
            j++;
        }
        cx = x-r;
        cy = y-r;
    }
}

function textLine(word,wordCount, yCor, len) {
    let cx = 400;
    let cy = 400;
    let r;
    let texty = generateScentense(word, wordCount);
    let textArr = texty.split("");
    print(textArr);
    angleMode(DEGREES);
    let j=0;
    for (let a = 0; a < len; a++) {
        r = Math.floor(Math.random() * (10-2.5)+2.5); 
        textSize(30)
        for (let i = 50; i < 750; i+=20) {
            x = i;
            y = yCor+a*25; 
            fill(100, 0, 100,10)
            // translate(0,r);
            // rotate(r/1000)
            text(textArr[j], x, y);
            // translate(-0,-r);
            j++;
        }
        cx = x-r;
        cy = y-r;
    }
}

function draw() {
    // background(0)
    // noLoop();
    textLine("no", 10, 100, 2);
    textLine("freedom", 10, 150, 2);
    textLine("no", 10, 200, 2);
    textLine("justice", 10, 250, 2);
    // textLine("in", 10, 300, 2);
    textLine("for", 10, 350, 2);
    textLine("Palestine", 10, 400, 2);
    // textLine("why", 10, 450, 2);
    // textLine("do", 10, 500, 2);
    // textLine("you", 10, 550, 2);
    // textLine("not", 10, 600, 2);
    // textLine("believe", 10, 650, 2);
    // textLine("in", 10, 700, 2);
    // textLine("god", 10, 750, 2);
    textSize(50);
    // text("amen", 50, 70);
    // textCircle(2.005, "you");

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