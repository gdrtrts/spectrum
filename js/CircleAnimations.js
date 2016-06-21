(function() {    
		
        //black fade when ready     
        $(document).ready(function() {
      $('.background-image').on('webkitAnimationEnd', function(e) {
        $(this).addClass('visible');
      });
    });

	
		
   var canvas = document.getElementById('myCanvas');
   var context = canvas.getContext('2d');
   var x = canvas.width/ 2;
   var y = canvas.height / 2;

   var angles = {
       startAngle: 0,
       endAngle: 0,
       radius: 90
    }
    var counterClockwise = false;

    var d = document.getElementById('myCanvas');  	
    var c1 = document.getElementById('circleZero');
    var c2 = document.getElementById('circleOne');
    var c3 = document.getElementById('pupil');
    var c4 =  document.getElementById('canvas');


    init();
    animate();
      
    function init() {    


            this.startAngle = 2 * Math.PI /180;
            this.endAngle = 2 * Math.PI /180;	
            window.addEventListener( 'resize', resizeW, false ); 	

        }



    function placeDiv() {

            d.style.position = "absolute";
            d.style.left = window.innerWidth/2 - d.width/2 + 'px';
            d.style.top = window.innerHeight/2 - d.width/2 + 'px';

            c1.style.position = "absolute";
            c1.style.left = window.innerWidth /2 - c1.width/2 + 'px';
            c1.style.top = window.innerHeight /2 - c1.width/2 + 'px';

            c2.style.position = "absolute";
            c2.style.left = window.innerWidth /2 - c2.width/2 + 'px';
            c2.style.top = window.innerHeight /2 - c2.width/2 + 'px';

            c3.style.position = "absolute";
            c3.style.left = window.innerWidth /2 - c3.width/2 + 'px';
            c3.style.top = window.innerHeight /2 - c3.width/2 + 'px';

            c4.style.position = "absolute";
            c4.style.left = window.innerWidth /2 - c4.width/2 + 'px';
            c4.style.top = window.innerHeight /2 - c4.width/2 + 'px';

          

        }

				


    function resizeW() {

                        placeDiv();
     }

              var w = 0;

     function wait() {
                    w = 1;
     }


    setTimeout(function(){
        wait();
    }, 1000);
		
		
        

    function animate() {

        requestAnimationFrame( animate );          
        drawContext();
        placeDiv();

    }




        
    //create different freq variables the objects can use
    var freq = 0, freq1 = 0, freq2 = 0, freq3 = 0;
        

    function createSvgAnimations() {


                      $('#circleZero').css({
          '-webkit-transform' : 'scale(' + freq1 + ')',
          '-moz-transform'    : 'scale(' + freq1 + ')',
          '-ms-transform'     : 'scale(' + freq1 + ')',
          '-o-transform'      : 'scale(' + freq1 + ')',
          'transform'         : 'scale(' + freq1 + ')',

        });


                              $('#circleOne').css({
          '-webkit-transform' : 'scale(' + freq2 + ')',
          '-moz-transform'    : 'scale(' + freq2 + ')',
          '-ms-transform'     : 'scale(' + freq2 + ')',
          '-o-transform'      : 'scale(' + freq2 + ')',
          'transform'         : 'scale(' + freq2 + ')',

        });


                              $('#pupil').css({
          '-webkit-transform' : 'scale(' + freq3 + ')',
          '-moz-transform'    : 'scale(' + freq3 + ')',
          '-ms-transform'     : 'scale(' + freq3 + ')',
          '-o-transform'      : 'scale(' + freq3 + ')',
          'transform'         : 'scale(' + freq3 + ')',

        });



          $('#circleZero').css('transition-duration','0.3s');
          $('#circleZero').css('transition-timing-function' , 'ease-out');
          $('#circleOne').css('transition-duration','0.3s');
          $('#circleOne').css('transition-timing-function' , 'ease-out');
          $('#pupil').css('transition-duration','0.5s');
          $('#pupil').css('transition-timing-function' , 'ease-out');

    }

        
    function radialWipeAnimations() {
    
          TWEEN.update(); 
          context.clearRect(0, 0, canvas.width, canvas.height);
    	      for (var i = 1; i < 9; i++) {	
 
                  
                
					   	new TWEEN.Tween(this).to ( {
						  startAngle: 0.7 -(15 * i) *   freq/80 * Math.PI, 
						  endAngle: 1.2 -(1 * i) *   freq/80 * Math.PI,
                          radius:  ((30 * i) *   freq/80*1000) }, 1000)
						 .easing( TWEEN.Easing.Elastic.Out).start();
				  
				        
                        //lower circle opacity and remove radial wipes when there's nobody talking
                        //the timeOut waits 1 sec before removing them when the page is loaded
						if ( freq < 1 && w === 1 ) {

								new TWEEN.Tween(this).to ( {
								startAngle: 0, 
							    endAngle: 0 }, 1000)
							    .easing( TWEEN.Easing.Elastic.Out).start();
								$('#circleZero').css('opacity','0.2');
								$('#circleOne').css('opacity','0.1');
							
							
						}
                  
                  
              context.translate(canvas.width/2, canvas.width/2);
              context.rotate(Math.PI/1000) + i/1000;
              context.translate(-canvas.width/2, -canvas.width/2);
              context.beginPath();  
              context.arc(x, y, angles.radius-(i*6)  , this.startAngle-(i*10), this.endAngle -(i*10), counterClockwise);
              context.lineWidth = 3;
              context.strokeStyle = 'white';
              context.stroke();
                  
			  }
}

function drawContext() {
        
 
        //IF THIS HAS A VALUE
        if (fbc_array) {
        
            //higher opacity states when talking
            $('#circleZero').css('opacity','0.7');
            $('#circleOne').css('opacity','0.4');
            $('#pupil').css('opacity','0.7');

            //don't take index [0] because circles will move when he\she is not speaking
            freq = fbc_array[4]/200 + 0.5;
            freq1 = fbc_array[6]/500 + 0.8;
            freq2 = fbc_array[6]/300 + 0.8;
            freq3 = fbc_array[4]/600 + 0.1;

            radialWipeAnimations();
            createSvgAnimations();
            
      }
    }
    
})();
