//var i=0;
var cards,timerVar;
var flag=0;
var tileGroup1 = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"];
var shuffledTiles = shuffle(tileGroup1);

var shuffledTiles1 = shuffledTiles.slice(0,8);
var shuffledTiles2 = shuffledTiles.slice(8,16);
var opencard;
var opencard_check=0;

for(var j=0 ; j<8 ; j++){
document.getElementById(shuffledTiles1[j]).setAttribute("src",(j+1)+".png");
document.getElementById(shuffledTiles2[j]).setAttribute("src",(j+1)+".png");
}

var score=0;
var moves=0;
document.getElementById("score").innerHTML=score;
document.getElementById("moves").innerHTML=moves;


function addCardclickEvents1(cardno){
  cards = document.querySelectorAll(".card.effect__click");
  cards[shuffledTiles1[cardno]].addEventListener( "click", function() {
    var c = this.classList;
    moves++;
    c.add("flipped");
    if(opencard_check==0){
        opencard = c;
        opencard_check=1;
    }
    else if(opencard_check==1){
          if((cards[shuffledTiles2[cardno]].classList).contains("flipped")!=true){
            backflip(c);
          }
          else{
            flag=1;
            score++;
            backflip(c);
        }
    }
    document.getElementById("score").innerHTML=score;
    document.getElementById("moves").innerHTML=moves;
  });
}

function addCardclickEvents2(cardno){
  cards[shuffledTiles2[cardno]].addEventListener( "click", function() {
    var c = this.classList;
    moves++;
    c.add("flipped");
    if(opencard_check==0){
        opencard = c;
        opencard_check=1;
    }
    else if(opencard_check==1){
          if((cards[shuffledTiles1[cardno]].classList).contains("flipped")!=true){
            backflip(c);
          }
          else{
            flag=1;
            score++;
            backflip(c);
        }
    }
  document.getElementById("score").innerHTML=score;
  document.getElementById("moves").innerHTML=moves;
  });
}

(function() {
  for(i=0; i<8; i++){
    addCardclickEvents1(i);
    addCardclickEvents2(i);
  }     
})();

function finishMessage(moves){
    if(moves<=24){
        document.getElementById("comment").innerHTML = "Congratulations\nExcellent!!!";
    }else if(moves>24 && moves<=30){
        document.getElementById("comment").innerHTML = "Congratulations\nWell Done!!";
    }else if(moves>30 && moves<=38){
        document.getElementById("comment").innerHTML = "Congratulations\nGood Job!...Better luck next time ^_^";
    }else if(moves>38 && moves<=46){
        document.getElementById("comment").innerHTML = "Congratulations\nWell Played, but can be played even better...";
    }else if(moves>46){
        document.getElementById("comment").innerHTML = "Congratulations\nTry harder next time :)";
    }
}

function backflip(c){
   setTimeout(function(){   
       if(flag==0){
           c.remove("flipped"); 
           opencard.remove("flipped");
        }else{
            flag=0;
            if(score>7){
                document.getElementById("comment").style.display="block";
                finishMessage(moves);
            }
        }
        opencard_check=0;
    },500);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}