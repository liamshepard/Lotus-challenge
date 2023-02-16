'use strict';
let canvasGfx = document.getElementById("canvasGfx");
let pre = document.getElementById("console");
let buttonRun = document.getElementById("buttonRun");
let buttonReset = document.getElementById("buttonReset");
let ctx = canvasGfx.getContext("2d");
const WIDTH = 1280;
const HEIGHT = 800;
const WIDTH2 = WIDTH*2;
const HEIGHT2 = HEIGHT*2;

function loop() {
    
    if (buttonPressed == true) {
        update(progress);
    }

    window.requestAnimationFrame(loop);
}

buttonRun.onclick = function () {
    if (buttonPressed == false) {
        buttonPressed = true;
        buttonRun.innerHTML = "Stop";
        if (started == false) {
            started = true;
            window.requestAnimationFrame(loop);
        }
    } else {
        buttonPressed = false;
        buttonRun.innerHTML = "Start";
    }
}

buttonReset.onclick = function() {reset();}

let started = false;
let buttonPressed = false;
// reset();
