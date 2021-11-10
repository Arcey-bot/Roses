//Reference: https://en.wikipedia.org/wiki/Rose_(mathematics)#/media/File:Rose-rhodonea-curve-7x9-chart-improved.svg
const TIMEOUTINMS = 10000;
const RANDOMROSERATE = 3000;
let rSlider;
let gSlider;
let bSlider;
let numSlider;
let denomSlider;
let sizeSlider;
let timeoutId;
let randomRose;

function setup() {
    createCanvas((window.innerWidth * 0.9), (window.innerHeight * .9));
    rSlider = createSlider(0, 255, random(255), 1);
    gSlider = createSlider(0, 255, random(255), 1);
    bSlider = createSlider(0, 255, random(255), 1);
    numSlider = createSlider(1, 7, 5, 1);
    denomSlider = createSlider(1, 9, 8, 1);
    sizeSlider = createSlider(200, 500, 200, 20);
    rSlider.input(run);
    gSlider.input(run);
    bSlider.input(run);
    numSlider.input(run);
    denomSlider.input(run);
    sizeSlider.input(run);
    startTimer();
    strokeWeight(3);
    noFill();
    frameRate(15);
}

function draw() {
    let numerator = numSlider.value();
    let denominator = denomSlider.value();
    let outcome = numerator / denominator;
    let lined = false; //False = dotted, true = lined
    let rainbow = false; //False = RGB sliders in use, true = Completely random

    background('#1E1E1E');
    stroke(rSlider.value(), gSlider.value(), bSlider.value());
    translate(width/2, height/2); //Center origin

    lined == true ? beginShape() : beginShape(POINTS);
    for (var i = 0; i < TWO_PI * denominator; i += 0.05) {
        if (rainbow) {
            stroke(random(255), random(255), random(255));
        }
        let rose = sizeSlider.value() * cos(outcome * i);
        let xPos = rose * cos(i);
        let yPos = rose * sin(i);
        vertex(xPos, yPos);
    }
    endShape();
}

function startTimer() {
    timeoutId = window.setTimeout(userIdle, TIMEOUTINMS);
}

function userIdle() {
    console.log('User is inactive');
    randomizeRose(); //Just to have it randomize immediately before it repeats
    randomRose = window.setInterval(randomizeRose, RANDOMROSERATE); //Creates new rose every 3 seconds while inactive
}

function randomizeRose() {
    console.log('Randomizing rose');
    numSlider.value(random(1, 8));
    denomSlider.value(random(1, 10));
    rSlider.value(random(255));
    gSlider.value(random(255));
    bSlider.value(random(255));
    sizeSlider.value(random(125, 401));
}

function resetTimer() {
    console.log('User is active again');
    window.clearTimeout(timeoutId);
    window.clearInterval(randomRose);
    startTimer();
}

function run() {
    draw();
    resetTimer();
}