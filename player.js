'use strict';

class Player {

    #x;
    #y;
    
    constructor(x, y, spriteSheet, drawTopDown = false) {
        this.#x = x;
        this.#y = y;
        this.directionVector = new Vector(0,-30);
        this.speed = 0;

        this.impulseVector = new Vector(100,0);
        
        this.accelerationTop = 5;
        this.accelerationTop2 = this.accelerationTop**2; 

        this.brakeForce = 10;

        this.spriteSheet = spriteSheet;

        this.controlDict = {
            turnLeft    : 'a',
            turnRight   : 'd',
            goForwards  : 'w',
            goBackwards : 's'
        }

        // drawing top down info
        this.drawTopDown = drawTopDown; //bool
        this.mapSize = [2*worldScale, 4*worldScale];
         //2*4 meters on screen
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    drawToMiniMap() {
        ctxMap.fillStyle = "black";
        ctxMap.fillRect(WIDTH / 2 - this.mapSize[0] / 2, HEIGHT / 2 - this.mapSize[1] / 2, this.mapSize[0], this.mapSize[1]);
        // ctxMap.beginPath();
        // ctxMap.moveTo(WIDTH / 2, HEIGHT / 2);
        // ctxMap.lineTo(WIDTH / 2 - this.directionVector.x * this.speed, HEIGHT / 2 + this.directionVector.y * this.speed);
        // ctxMap.stroke();
        ctxMap.closePath();
    }    

    update() {

        //code for inertial impulse after a crash
        this.#x += this.impulseVector.x*hz;
        this.#y += this.impulseVector.y*hz;

        let impulseStop = 2;
        this.impulseVector.scale(0.8);
        if (this.impulseVector.length < impulseStop)

        if (this.speed > 0) { //prevents turning if car is stationary
            let turn = (
                keyPresses[this.controlDict.turnRight] - 
                keyPresses[this.controlDict.turnLeft]
            )*Math.PI/100;
            // console.log(keyPresses[this.controlDict.turnLeft])
            this.directionVector.rotate2d(turn);
        }

        let acc = (
            keyPresses[this.controlDict.goForwards] 
        )*this.acceleration(this.speed);
        
        this.speed += acc;

        if (keyPresses[this.controlDict.goBackwards]) {
            this.speed -= this.deceleration();
        }
        
        preOutput.innerHTML = this.speed;
        preOutput.innerHTML += "\nx: " + Math.round(this.x*100)/100 + "\ty: " + Math.round(this.y*100)/100;

        let velocityVector = Vector.normalize(this.directionVector);
        velocityVector.scale(this.speed);
        
        this.#x += velocityVector.x*hz;
        this.#y += velocityVector.y*hz;
    }

    acceleration(speed) {
        //f(x) = sqrt(acceleration^2 - (x/10)^2)
        let temp = this.accelerationTop2 - (speed/12)**2;
        if (temp > 0) {
            return Math.sqrt(temp)*hz;
        } else {return 0;}
    }

    deceleration() {
        if (this.speed - this.brakeForce*hz < 0) {
            return this.speed;
        } else {return this.brakeForce*hz;}
    }
}