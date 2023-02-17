'use strict';
let canvasGfx = document.getElementById("canvasGfx");
let canvasMap = document.getElementById("canvasMap");
let pre = document.getElementById("console");
let buttonRun = document.getElementById("buttonRun");
let buttonReset = document.getElementById("buttonReset");
let ctx = canvasGfx.getContext("2d");
let ctxMap = canvasMap.getContext("2d");
const WIDTH = 1280;
const HEIGHT = 800;

let playerList = [];

let keyPresses = {
    'Escape' : false
};

for (let i = 0; i < playerList.length; i++) {
    keyPresses.playerList[i].controlDict.turnLeft = false;
    keyPresses.playerList[i].controlDict.turnRight = false;
    keyPresses.playerList[i].controlDict.goForwards = false;
    keyPresses.playerList[i].controlDict.goBackwards = false;
}

document.onkeydown = function(event) {
    keyPresses[event.key] = true;
}

document.onkeyup = function(event) {
    keyPresses[event.key] = false;
}

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
