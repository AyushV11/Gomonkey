var PLAY=1
var END=0
var gameState=PLAY     
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score
var invisibleGround
var scenery
var score=0
var gameOver

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  sadMonkeyImg=loadAnimation("monkey.png")

   bananaImage = loadImage("banana.png");
   obstacleImage = loadImage("obstacle.png");
   sceneryImage = loadImage("jungle background.png")
   gameOverImg=loadImage("gameover.png")


}



function setup() {
createCanvas(600,600)
scenery = createSprite(300,300,40,40)
scenery.addImage(sceneryImage)
scenery.scale=2 
scenery.velocityX=-(4 + score/6)
ground = createSprite(90,450,400,20)
ground.velocityX=-4 
monkey = createSprite(90,420,20,20) 
monkey.addAnimation("running",monkey_running)
monkey.addAnimation("sad",sadMonkeyImg)
monkey.scale=0.15

invisibleGround = createSprite(90,460,600,20)
obstaclesGroup = new Group()
foodGroup = new Group()
}


function draw() {
background("lightblue")

drawSprites()
fill("blue")
textSize(20)
text("Score : "+score,50,500)


 
  
if(gameState===PLAY){
  if(scenery.x<25){

scenery.x=scenery.width/2
  
}
  monkey.changeAnimation("running",monkey_running)
  spawnObstacles()
  spawnBanana()
 if(keyDown("space") && monkey.y >= 9 && monkey.collide(invisibleGround)) {
      monkey.velocityY = -20;
      
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
 
if(monkey.isTouching(foodGroup)){
   score=score+2
   foodGroup.destroyEach()
  
}

}
monkey.collide(invisibleGround)
invisibleGround.visible=false
ground.visible=false  

 if(monkey.isTouching(obstaclesGroup)){
    gameState=END
    ground.velocityX=0
    foodGroup.setVelocityXEach(0)
    obstaclesGroup.setVelocityXEach(0)
    scenery.velocityX=0
    foodGroup.setLifetimeEach(-1)
    obstaclesGroup.setLifetimeEach(-1)
    monkey.changeAnimation("sad",sadMonkeyImg)
    monkey.scale=0.5
    monkey.x=300
    monkey.y=200
    monkey.velocityX=0
    monkey.velocityY=0
    gameOver=createSprite(300,300,20,20)
    gameOver.addImage(gameOverImg)
}




}

function spawnObstacles(){
 if(frameCount%200===0){
     obstacle = createSprite(440,450,20,20)
     obstacle.addImage(obstacleImage)
     obstacle.scale=0.1
     obstacle.velocityX=-(5+score/6)   
     obstacle.collide(invisibleGround)
     obstaclesGroup.add(obstacle)
     obstaclesGroup.setLifetimeEach(88)
  
}

}

function spawnBanana(){
 if(frameCount%80===0){
    banana=createSprite(320,200,20,20)
    banana.y=Math.round(random(120,220))
    banana.addImage(bananaImage)
    banana.velocityX=-(5+score/6)
    banana.scale=0.1
    foodGroup.add(banana)
    foodGroup.setLifetimeEach(64)
}

}








