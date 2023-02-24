'use strict';

class Player {

    #x;
    #y;
    
    constructor(x, y, sprite, drawTopDown = false) {
        this.#x = x;
        this.#y = y;
        this.directionVector = new Vector(0,-30);
        this.speed = 4;
        this.accelerationTop = 10;
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
        this.drawTopDown = drawTopDown;
        this.mapSize = [40, 70];
         //40*70 pixels on screen
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    drawToMiniMap() {
        let vec = Vector.normalize(this.directionVector);
        let corners = [];
            let x = this.x;
            let y = this.y;
            x += vec.x*(this.mapSize[1]/2);
            y += vec.y*(this.mapSize[1]/2);
            vec.rotate2d(Math.PI/2);
            x += vec.x*(this.mapSize[0]/2);
            y += vec.y*(this.mapSize[0]/2);
            corners.push([x, y]);
            for (let i = 0; i < 3; i++) {
                vec.rotate2d(Math.PI/2);
                x += vec.x*this.mapSize[!(i % 2)*1];
                y += vec.y*this.mapSize[!(i % 2)*1];
                corners.push([x, y]);
            }

        ctxMap.fillStyle = "black";
        ctxMap.beginPath();
        ctxMap.moveTo(corners[3][0], corners[3][1]);
        for (let i = 0; i < corners.length; i++) {
            ctxMap.lineTo(corners[i][0], corners[i][1]);
        }
        ctxMap.closePath();
        ctxMap.fill();
    }    

    update() {
        let turn = (
            keyPresses[this.controlDict.turnRight] - 
            keyPresses[this.controlDict.turnLeft]
        )*Math.PI/40;
        // console.log(keyPresses[this.controlDict.turnLeft])
        this.directionVector.rotate2d(turn);

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