var END=0;
var PLAY=1;
var gstate=PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime=0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  obstacleGroup=new Group();
  FoodGroup=new Group();
}



function setup() {
  createCanvas(600,400);
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,20);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  obstacleGroup=new Group();
  FoodGroup=new Group();
 
}


function draw() {
  background(255);
  if (gstate===PLAY){
  if(ground.x<0){
    ground.x=ground.width/2;
  }
   
  if(keyDown("space")){
    monkey.velocityY=-12;  
  }
  monkey.velocityY=monkey.velocityY+0.8;

  
  
  
  spawnbanana();
  
  spawnobstacle();
  
  
  if(obstacleGroup.isTouching(monkey)){
    gstate=END;
  }
  } else if(gstate===END){
    
    monkey.VelocityY=0;
    ground.velocityX=0;
    banana.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);

  }
  monkey.collide(ground);
  drawSprites();

  var survivalTime=0;
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time :"+ survivalTime,10,100);
  }
  


function spawnbanana(){
  if (frameCount%60===0){
    banana=createSprite(400,20,0,0);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-3;
    banana.y=Math.round(random(10 ,60));
    banana.lifetime=100;
  }
}

function spawnobstacle(){
  if (frameCount%60===0){
    obstacle=createSprite(600,325,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-5;
    obstacle.lifetime=150;
    obstacleGroup.add(obstacle);
  }
}
