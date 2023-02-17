'use strict';

class Player {

    #x;
    #y;
    
    constructor(x, y, velocityVector, sprite, drawTopDown = false) {
        this.#x = x;
        this.#y = y;
        this.velocityVector = velocityVector;
        this.sprite = sprite;

        // drawing top down info
        this.drawTopDown = drawTopDown;
        this.mapSize = {
            x : 40,
            y : 70
        }; //40*70 pixels on screen
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    drawSelf() {
        if (this.drawTopDown) {
            let vec = Vector.normalize(this.velocityVector);
            let corners = [];
                let x = mapCtx.width/2;
                let y = mapCtx.height/2;
                x += vec.x*(this.mapSize.x/2);
                y += vec.y*(this.mapSize.y/2);
                vec.rotate2d(math.pi/2);
                x += vec.x*(this.mapSize.x/2);
                y += vec.y*(this.mapSize.y/2);
                corners.push([x, y]);
                for (let i = 0; i < 3; i++) {
                    vec.rotate2d(math.pi/2);
                    x += vec.x*this.mapSize.x;
                    y += vec.y*this.mapSize.y;
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
    }    
}