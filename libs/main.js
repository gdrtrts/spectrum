// Utility function for drawing the circle arc

function drawCircleArc(elem, angle) {
    var endAngleDeg = angle - 90;
    var endAngleRad = (endAngleDeg * Math.PI) / 180;
    var largeArcFlag = (angle < 180 ? '0' : '1');

    var endX = Math.cos(endAngleRad) * 100;
    var endY = 100 + (Math.sin(endAngleRad) * 100);

    var data = 'M100,100 v-100 a100,100 0 ' + largeArcFlag + ',1 ' +
                endX + ',' + endY + ' z';

    $(elem).attr('d', data);
}

// Code for running the animation

var arcAngle = 0;        // Starts at 0, ends at 360
var arcAngleBy = 10;     // Degrees per frame
var arcAngleDelay = 50;  // Duration of each frame in msec

function updateCircleWipe() {
    arcAngle += arcAngleBy;

    drawCircleArc('#circle-wipe', arcAngle);

    if (arcAngle < 360) {
        setTimeout(function(){ updateCircleWipe(); }, arcAngleDelay);
        
    }
    
     
}


setTimeout(function(){ updateCircleWipe(); }, arcAngleDelay);
