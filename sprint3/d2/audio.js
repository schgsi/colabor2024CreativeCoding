let mic;
let midi_out;
let midi_enabled = false

let img

function preload(){
    img = loadImage('picture.png')
}

function setup() {
    let cnv = createCanvas(innerWidth, innerHeight - 20, WEBGL);
    cnv.mousePressed(userStartAudio);
    textAlign(CENTER);
    mic = new p5.AudioIn();
    mic.start();
    // ******************************************
    // ******************************************
    // ATTENTION IT CAN CREATE FEEDBACK!!!!!!
    // mic.connect();
    // ******************************************
    // ******************************************
    fft = new p5.FFT(0.8, 16);
    fft.setInput(mic)


    // ******************************************
    // ******************************************
    // initialize midi 
    // init_midi()
    // ******************************************
    // ******************************************

    createEasyCam();

    document.oncontextmenu = function () {
        return false;
    }
    document.onmousedown = function () {
        return false;
    }
}


function draw() {
    background(0);

    // ******************************************
    // ******************************************
    // MIDI
    // if (midi_enabled) {
    //   // within this if statement you can 
    //   // send midi notes and cc values
    //   if (frameCount % 10 === 0) {
    //     const value = round(random(127))
    //     send_cc(value, 0);
    //     send_note(value, 500)
    //   }
    // }
    // ******************************************
    // ******************************************

    //   strokeWeight(1)
    lights();
    ambientLight(255, 255, 0);
    noStroke()
    // normalMaterial();
    // ambientMaterial(255, 0, 225);
    specularMaterial(255, 255, 0);
    //   text('tap to start', width / 2, 20);
    micLevel = mic.getLevel();
    //   let y = height - micLevel * height * 20;
    //   ellipse(width / 2, y, 10, 10);

    //***************************************
    // spectrum analysis, array with  16 - 1024 values
    let spectrum = fft.analyze();
    let val1 = spectrum[0]; 
    let val2 = spectrum[4]; 
    let val3 = spectrum[8]; 
    let val4 = spectrum[12]; 


    //***************************************
    // 3D elements
    texture(img);
    push();
    // box(val1,val2,val3)
    // translate(25, 100 * micLevel, 0)
    rotateX(map(val1,0,255,0, 2*PI));
    rotateY(map(val2,0,255,0, 2*PI));
    // rotateZ(map(val3,0,255,0, 2*PI));
    sphere(map(val4,0,255,50,250));
    box(200,map(val4,0,255,190,210),200)
    // rotateY(frameCount * 0.01)
    // rotateZ(frameCount * 0.035)
    // box(150)
    pop();
    // push();
    // translate(-100, 0, 0);
    // rotateY(frameCount * 0.01)
    // box(100, 200, 50);
    // pop();

    // ******************************************
    // ******************************************
    // FFT analysis
    //   let spectrum = fft.analyze();
    //   let waves = fft.waveform();
    //   noStroke();
    //   fill('#3f3');
    //   for (let i = 0; i < spectrum.length; i++) {
    //     let x = map(i, 0, spectrum.length, 0, width);
    //     let h = -height + map(spectrum[i], 0, 255, height, 0);
    //     rect(x, height, width / spectrum.length, h)
    //   }

    //   beginShape();
    //   noFill();
    //   stroke('#f3f') //line, "tap"
    //   strokeWeight(3)
    //   for (let i = 0; i < waves.length; i++) {
    //     let x = map(i, 0, waves.length, 0, width);
    //     let y = map(waves[i], -1, 1, 0, height)
    //     vertex(x, y)
    //   }
    //   endShape()
    // ******************************************
    // ******************************************
}


function send_cc(value, cc) {
    const val = parseInt(abs(value)) % 128
    midi_out.sendControlChange(cc, value);
    // console.log(`send midi cc: ${val}`);
}
function send_note(note, duration) {
    midi_out.playNote(note, { duration });
    // console.log(`send midi note: ${note}`);
}


// ******************************************
// ******************************************
// MIDI FUNCTIONS!
function init_midi() {
    WebMidi
        .enable()
        .then(onEnabled)
        .catch(err => alert(err));

    function onEnabled() {
        // Display available MIDI input devices
        if (WebMidi.outputs.length < 1) {
            console.log("No device detected.");
        } else {
            WebMidi.outputs.forEach((device, index) => {
                console.log(`${index}: ${device.name}`);
            });
            // midi_out = WebMidi.outputs[0].channels[1]
            create_buttons()
        }
    }
}

function create_buttons() {
    for (let i = 0; i < WebMidi.outputs.length; i++) {
        const midi = WebMidi.outputs[i];
        let btn = createButton(midi.name);
        btn.position(50, 40 * (i + 1));
        btn.mousePressed(() => {
            midi_out = midi.channels[1];
            console.log(`midi port selected: ${midi.name}`);
            removeElements()
            midi_enabled = true
        })
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