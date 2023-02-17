'use strict';

let spriteData = {
    'spriteSheets/amogus.png' : {
        animationFrames : {
            driving : 3,
            crashed : 2
        },
        spriteWidth     : 100,
        spriteHeight    : 100,
        vertical        : false
    }
}

class Sprite {

    #spriteURL;
//  spriteURL example "amogus.png"
    constructor(spriteURL) {
        // need to put data about how to animate the sprite, 
        // we fix later
        this.#spriteURL = "spriteSheets/" + spriteURL;
    }

    drawSprite(x,y) {
        // function to draw a sprite to the screen
        // in the correct animation frame
    }
}