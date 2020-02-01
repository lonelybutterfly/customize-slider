var actualMove=-1; //Don't change!
var reload=1; //Don't change!
var direction = "left"; //Don't change!
var status="open";
var move;

//checking if mouse is on slider
var mouseOnSlider = false;
$( "#companyCarousel" ).hover(function(){mouseOnSlider=true;})
$( "#companyCarousel" ).mouseleave(function(){mouseOnSlider=false;})


function companyCarousel(){
  if(reload==1){ //reloaded carousel
  document.getElementById("companyTrack").style.left="0px";
}
  var carouselWidth = document.getElementById("companyCarousel").offsetWidth;
  var visibleElQty;
  if (window.innerWidth>1350){ //HERE YOU CAN CHANGE THE VALUE WHICH CHANGES THE NUMBER OF DISPLAYED ITEMS
    visibleElQty = 5; //HERE YOU CAN CHANGE THE NUMBER OF SHOWN ITEMS
  }
  else if (window.innerWidth>600){//HERE YOU CAN CHANGE THE VALUE WHICH CHANGES THE NUMBER OF DISPLAYED ITEMS
    visibleElQty = 3; //HERE YOU CAN CHANGE THE NUMBER OF SHOWN ITEMS
  }
  else {
    visibleElQty = 1; //HERE YOU CAN CHANGE THE NUMBER OF SHOWN ITEMS
  }

  var elWidth = carouselWidth / visibleElQty;
  if (actualMove==-1){
  actualMove = 0;
  }
  if(reload!=1){
  var startPosition = actualMove*elWidth;
  document.getElementById("companyTrack").style.left=-startPosition+"px";
}

  //Edit track and elements width - DON'T CHANGE
  $( ".companyCarousel" ).css( "width", elWidth+"px" );
  var elQty = $( ".companyCarousel" ).length;
  var trackWidth = elQty*elWidth;
  document.getElementById("companyTrack").style.width= trackWidth+"px";
  document.getElementById("companyTrack").style.transition="all 1s";
  var moveRange = elQty - visibleElQty;

  clearInterval(move);
  move=false;
  // function moving elements
  move = setInterval(function(){
    if(mouseOnSlider==false){
       if(actualMove==moveRange){
         direction = "right";
        } if (actualMove==0){
         direction = "left";
       }
       if(direction=="right"){
           document.getElementById("companyTrack").style.left=document.getElementById("companyTrack").offsetLeft+elWidth+"px";
          actualMove-=1;
         } else{
           document.getElementById("companyTrack").style.left=document.getElementById("companyTrack").offsetLeft-elWidth+"px";
            actualMove+=1;
         }
       }
     }, 2500);
      status ="open";

      //arrows event
      document.getElementById("leftarrow").onclick = function(){
        if(actualMove>0){
          clearInterval(move);
          move=false;
          document.getElementById("companyTrack").style.left=document.getElementById("companyTrack").offsetLeft+elWidth+"px";
          actualMove-=1;
          reload=0;
          companyCarousel();
       }
      }
      document.getElementById("rightarrow").onclick = function(){
        if (actualMove<moveRange){
          clearInterval(move);
          move=false;
          document.getElementById("companyTrack").style.left=document.getElementById("companyTrack").offsetLeft-elWidth+"px";
          actualMove+=1;
          reload=0;
          companyCarousel();
       }
      }

  }
  //Function making slider responsive (resize)
  function resizedw(){
    clearInterval(move);
    move=false;
    actualMove=-1;
    direction = "left";
    companyCarousel();
 }
   var doit;
   // onresize event
   window.addEventListener("resize", function(){
     clearTimeout(doit);
     reload=1;
     doit = setTimeout(resizedw, 900);
   });

  // if you minimalize site and then go back to it this function will reset interval
  document.addEventListener("visibilitychange",  function() {
    if(document.hidden==true){
      status="closed";
      clearInterval(move);
      move=false;
    }if(document.hidden==false && move==false){
      status = "open";
      direction = "left";
      actualMove=-1;
      reload=1;
      companyCarousel();
    }
  });
companyCarousel();
