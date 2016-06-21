
//GLOBAL EXECUTION CONTEXT
var  fbc_array;

(function() {

//FUNCTION EXECUTION CONTEXT
var container;
var audio = new Audio();
audio.src = 'voice.mp3';
audio.controls = false;
audio.loop = true;
audio.autoplay = true;
var angle;
var sides = 180;
var radius = 205;
var  ctx, ctx2, source, audioContext, analyser, bars, bar_x, bar_width, bar_height, bar_y;
    
//Arrays that hold symmetric spectrum
var tempArray, reverseArray, normalArray, wholeSpectrum;
    
    
    



function init() {
    
	
		var canvas = document.getElementById('canvas');
        var canvas2 = document.getElementById('canvas2');
        
		ctx = canvas.getContext('2d');
        //if using this make sure to add canvas2 to index
        //ctx2 = canvas2.getContext('2d');

		audioContext = new AudioContext(); 
      
		analyser = audioContext.createAnalyser(); 
        analyser.fftSize = 512;
        analyser.maxDecibels = 20;
		source = audioContext.createMediaElementSource(audio); 
		source.connect(analyser);
		analyser.connect(audioContext.destination);
    
    
        //Mute scene but still get audio spectrum
        var gainNode = audioContext.createGain();  
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        //gainNode.gain.value = -1;
  
		changeScene();
}



window.onload = function() {

	init();
}



//--------------------> DONT NEED THIS

function leftSide() {
     
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle="#FFF";
	ctx.save();
	ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2);
    
	for (var i = 0; i < sides ; i++) {
        
        //NEGATIVE ANGLE IS LEFTSIDE
        angle = ((i/sides) * Math.PI * -1) ;
        bar_x = radius/2 ;
        bar_y =  0;      
		bar_width = 2;
		bar_height = (fbc_array[i +20] / 3);
		ctx.save();
		ctx.rotate(angle - 0.030 - Math.PI/2);
		ctx.fillRect(bar_x, bar_y, bar_height, bar_width );
		ctx.restore(); 
	} 
	ctx.restore();   
}
    
    
    
function rightSide() {
          
        ctx2.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx2.fillStyle="#FFF";
        ctx2.save();
        ctx2.translate(ctx2.canvas.width/2, ctx2.canvas.height/2);
        for (var i = 0; i < sides ; i++) {
            //POSITIVE ANGLE IS RIGHTSIDE
            angle = ((i/sides) * Math.PI * 1) ;
            bar_x = radius/2 ;
            bar_y =  0;
            bar_width = 2;
            //add 20 to array to skip frequencies that are not being displayed
            bar_height = (fbc_array[i + 20] / 3);
            //save and restore
            ctx2.save();
            //ROTATE EVERY SINGLE BAR AROUND CIRCLE AND ROTATE THIS -90DEG
            ctx2.rotate(angle - Math.PI/2);
            //NOTICE X AND Y WIDTH ARE SWAPPED BECAUSE BARS ARE ROTATED 90DEG (0, 2PI)
            ctx2.fillRect(bar_x, bar_y, bar_height, bar_width );
            ctx2.restore();	
        }

        ctx2.restore();
        
        
    }
    
//-------------------->
    
    
    

function changeScene() {
    
	window.requestAnimationFrame(changeScene);
	fbc_array = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(fbc_array);
    
    //SLICE OR SPLICE DOES NOT WORK WITH UIINT8ARRAYS SO USE SUBARRAY
    tempArray = fbc_array.subarray(10, fbc_array.length / 2 );
    
    normalArray = [];
    for (var i=0; i < tempArray.length; i++ ) {
        normalArray.push(tempArray[i]);
    }
    
    reverseArray = [];
    //REVERSE TEMP ARRAY CAUSE REVERSE() DOES NOT WORK ON ANALYSER.FREQUENCYBINCOUNT
    for (var i = tempArray.length - 20; i >= 0; i--) {  
        reverseArray.push(tempArray[i]);
        
    }
    
    //CONCAT PUTS TWO ARRAYS TOGETHER 
    wholeSpectrum = reverseArray.concat(normalArray);
    
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle="#FFF";
	ctx.save();
	ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2);
    
	for (var i = 0; i < sides ; i++) {

        angle = (i/sides ) * Math.PI * 2 ;
        bar_x = radius/2 ;
        bar_y =  0;
		bar_width = 2;
		bar_height = (wholeSpectrum[i] / 1.5);
		ctx.save();
		ctx.rotate(angle + 71.6 * Math.PI/180 );
		ctx.fillRect(bar_x, bar_y, bar_height, bar_width );
		ctx.restore();

	}
	ctx.restore();

   // OR USE 2 CANVASES
   // leftSide();
   // rightSide();

}

})();