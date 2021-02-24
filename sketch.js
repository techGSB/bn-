const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var ball,b1;
var bg;
var database, position;



function preload(){
  bg = loadImage("1.png");
  b1 = loadAnimation("2.png","3.png","4.png");
 


  
}


function setup() {
  createCanvas(1350,640);
  database = firebase.database();

  ball = createSprite(200,300,50,50);
  ball.addAnimation("balloon",b1);
  
  var locPosition = database.ref("ball/position");
  locPosition.on("value",readPosition,showError);
 
 

  
}
  


function draw() {
  background(bg);  
if(keyDown(LEFT_ARROW)){
  writePosition(-1,0);
}
else if(keyDown(RIGHT_ARROW)){
  writePosition(1,0);
}
else if(keyDown(UP_ARROW)){
  writePosition(0,-1);
  balloon.scale = balloon.scale -0.01;
}
else if(keyDown(DOWN_ARROW)){
  writePosition(0,+1);
  balloon.scale = balloon.scale+0.01;
}
fill("black");
textSize(20);
strokeWeight(4);
stroke("red");
text("USE ARROW KEYS TO MOVE ",500,50,100,100);
text("THE HOT AIR BALLOON",500,150,100,100);

  drawSprites();
}

function writePosition(x,y){
  database.ref("ball/position").set({
    'x': position.x+x,
    'y': position.y+y

})
  
    //balloon.x = balloon.x+x;
    //balloon.y = balloon.y+y;


  }

  
function readPosition(data){
  position = data.val();
  ball.x = position.x;
  ball.y = position.y;
}

function showError(){
  console.log("Invalid");
}


