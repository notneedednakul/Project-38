var PLAY = 1;
var END = 0;
var gameState = PLAY;
var COMPLETE= 2;



var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score= 0;
var gameOver,restart




function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
}

function setup() {
  createCanvas(displayWidth-20,displayHeight-10);
  trex = createSprite(50,680,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,680,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,690,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  
 gameOver = createSprite(displayWidth/2,displayHeight/2);
gameOver.addImage(gameOverImage);

restart = createSprite(displayWidth/2,(displayHeight/2)+100);
restart.scale=0.7
restart.addImage(restartImage);


gameOver.visible = false;
restart.visible = false;
}


 function draw() {
  background("white");
  textFont("Bodini MT")
  textSize(20)
  fill("GREY")
  text("Score: "+ score, displayWidth-200, displayHeight-600);
 camera.position.x=displayWidth/2;
  
  if(gameState === PLAY){
    ground.velocityX = -5
  
    score = score + Math.round(getFrameRate()/60);
    
 
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space") && trex.y >= 159){
      trex.velocityY = -12 ;
  
    }
  
    if(score>=1000){
      gameState=COMPLETE;
    }
 
    trex.velocityY = trex.velocityY + 0.8;
    
    
    spawnClouds();
  
    
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
    }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
   
    trex.addImage("collided",trex_collided);
    
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    
  }  else if(gameState === COMPLETE){
  
    textSize(70);
    fill("GREY");
    text("Y O U    W I N", (displayWidth/2)-200,displayHeight/2);

    restart.visible = true;
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);

  }

  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  
  trex.collide(invisibleGround);
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}


function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(displayWidth,620,40,10);
    cloud.y = Math.round(random(280,620));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 450;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(displayWidth,665,10,40);
    obstacle.velocityX = -4;
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    obstacle.scale = 0.5;
    obstacle.lifetime = 350;
    obstaclesGroup.add(obstacle);
  }
}