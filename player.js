'use strict';

class Player {

    #x;
    #y;
    
    constructor(x, y, sprite, drawTopDown = false) {
        this.#x = x;
        this.#y = y;
        this.directionVector = new Vector(0,-30);
        this.speed = 0;
        this.accelerationTop = 5;
        this.accelerationTop2 = this.accelerationTop**2; 
        //so you dont have to calculate each frame
        this.brakeForce = 10;

        this.sprite = sprite;

        this.controlDict = {
            turnLeft    : 'ArrowLeft',
            turnRight   : 'ArrowRight',
            goForwards  : 'ArrowUp',
            goBackwards : 'ArrowDown'
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
        drawVectorRect(this.x*worldScale, 
            this.y*worldScale, 
            this.directionVector, 
            this.mapSize
        );
    }    

    update() {

        if (this.speed > 0) { //prevents turning if car is stationary
            let turn = (
                keyPresses[this.controlDict.turnRight] - 
                keyPresses[this.controlDict.turnLeft]
            )*Math.PI/40;
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

        let velocityVector = Vector.normalize(this.directionVector);
        velocityVector.scale(this.speed);
        
        this.#x += velocityVector.x;
        this.#y += velocityVector.y;
    }

    acceleration(speed) {
        //f(x) = sqrt(acceleration^2 - (x/10)^2)
        let temp = this.accelerationTop2 - (speed/6)**2;
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