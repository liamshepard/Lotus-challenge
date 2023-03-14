'use strict';

function drawScreen() {
    //draws the main screen

}

function drawMiniMap() {
    //draws the minimap
    ctxMap.fillStyle = "green";
    ctxMap.fillRect(0, 0, WIDTH, HEIGHT);
    
    let roadSegmentList = [
        {
            pos   : new Vector(WIDTH/(2*worldScale), HEIGHT/(2*worldScale) - 50),
            vector: new Vector(0,-1)
        },
        {
            pos   : new Vector(WIDTH/(2*worldScale) + 50, HEIGHT/(2*worldScale) - 50),
            vector: new Vector(1,-1)
        }
    ]

    let renderDistance = 100; //100 meters

    for (let i = 0; i < roadSegmentList.length; i++) {
        if (
            Math.abs(roadSegmentList[i].pos.x - playerList[0].x) < renderDistance &&
            Math.abs(roadSegmentList[i].pos.y - playerList[0].y) < renderDistance
            ) {

            drawRelativeVectorRect(
                playerList[0], 
                roadSegmentList[i].pos, 
                roadSegmentList[i].vector, 
                [8*worldScale,100*worldScale], 
                'gray'
            );

            drawRelativeVectorRect(
                playerList[0], 
                roadSegmentList[i].pos, 
                roadSegmentList[i].vector, 
                [0.2*worldScale, 3*worldScale], 
                'yellow'
            );
        } 
    }

    let stoneCenterPos = new Vector(WIDTH/(2*worldScale) - 10, HEIGHT/(2*worldScale) - 20);
    let stoneRadius = 2;
    drawRelativeCircle(playerList[0], stoneCenterPos, stoneRadius, 'black');

    playerList[0].drawToMiniMap();
}

function drawRelativeVectorRect(player, centerVector, directionVectorOriginal, size, color) {
    let directionVector = Vector.copy(directionVectorOriginal);
    let diffVector = Vector.subtract( 
        centerVector,
        new Vector(player.x, player.y)
    );
    diffVector.rotate2d(player.directionVector.angle);
    directionVector.rotate2d(player.directionVector.angle);

    drawVectorRect(WIDTH/2 - diffVector.x*worldScale, HEIGHT/2 - diffVector.y*worldScale, 
        directionVector, 
        size, 
        color
    );
}

function drawRelativeCircle(player, centerVector, size, color) {
    let diffVector = Vector.subtract( 
        centerVector,
        new Vector(player.x, player.y)
    );
    diffVector.rotate2d(player.directionVector.angle);

    ctxMap.fillStyle = color;
    ctxMap.beginPath();
    ctxMap.arc(
        WIDTH/2 - diffVector.x*worldScale, 
        HEIGHT/2 - diffVector.y*worldScale,
        size*worldScale, 0, 2*Math.PI
    );
    ctxMap.fill();
}

function drawVectorRect(centerX, centerY, directionVector, size, color) {
   // example:
   // centerX = 100
   // centerY = 100
   // directionVector = Vector(10,0)
   // size = [20,40]
   let vec = Vector.normalize(directionVector);
       let corners = [];
           let x = centerX;
           let y = centerY;
           x += vec.x*(size[1]/2);
           y += vec.y*(size[1]/2);
           vec.rotate2d(Math.PI/2);
           x += vec.x*(size[0]/2);
           y += vec.y*(size[0]/2);
           corners.push([x, y]);
           for (let i = 0; i < 3; i++) {
               vec.rotate2d(Math.PI/2);
               x += vec.x*size[!(i % 2)*1];
               y += vec.y*size[!(i % 2)*1];
               corners.push([x, y]);
           }

       ctxMap.fillStyle = color;
       ctxMap.beginPath();
       ctxMap.moveTo(corners[3][0], corners[3][1]);
       for (let i = 0; i < corners.length; i++) {
           ctxMap.lineTo(corners[i][0], corners[i][1]);
       }
       ctxMap.closePath();
       ctxMap.fill();
}

