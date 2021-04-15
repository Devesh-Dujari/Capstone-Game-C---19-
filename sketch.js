var tower, towerImg;
var door, doorImg, doorGroup;
var climber, climberImg, climberGroup;
var invisibleClimber, invisibleClimberGroup;
var ghost, ghostImg, ghostJumpingImg;
var gameState = "PLAY";
var sound;

function preload() {
  
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  //ghostFallingImg = loadAnimation("ghost-jumping.png")
  sound = loadSound("spooky.wav");
}

function setup() {
  
  createCanvas(600, 600);
  
  tower = createSprite(300, 300, 10, 10);
  tower.addImage(towerImg);
  tower.velocityY = 1; 
  
  ghost = createSprite(300, 300, 10, 10);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5;
  
  sound.loop();
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleClimberGroup = new Group();
  
}

function draw(){
  
  background("black");
  
  if(gameState === "PLAY")
    {
  
  if(tower.y > 400)
    {
      tower.y = 300;
    }
  
  if(keyDown("space"))
    {
      ghost.velocityY = -5;
      //ghost.changeAnimation(ghostJumpingImg);
    }
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(keyDown("right_arrow"))
    {
      ghost.x = ghost.x + 5;
    }
  
  if(keyDown("left_arrow"))
    {
      ghost.x = ghost.x - 5;
    }
       
  //Function call.
  spawnDoor ();
      
  if(climberGroup.isTouching(ghost))
    {
      ghost.velocityY = 0;
    }   
      
      if(invisibleClimberGroup.isTouching(ghost) || ghost.y > 600)
      { 
        ghost.destroy(); 
        gameState = "END"; 
      }
 }

      if (gameState === "END")
      { 
       stroke("yellow"); fill("yellow"); 
       textSize(30);             
       text("Game Over", 230,250) 
        
       tower.destroy();
        
       doorGroup.destroyEach(); 
       climberGroup.destroyEach();
       invisibleClimberGroup.destroyEach(); 
        
      }
  
  drawSprites();
  
}

function spawnDoor()
{
  if(frameCount % 240 === 0)
    {
      door = createSprite(200, -50, 10, 10);
      door.addImage(doorImg);
      climber = createSprite(200, 15, 10, 10);
      climber.addImage(climberImg);
      invisibleClimber = createSprite(200, 20, 10, 2);
      invisibleClimber.width = climber.width;
      invisibleClimber.velocityY = 1;
      invisibleClimber.x = door.x;
      climber.x = door.x;
      climber.velocityY = 1;
      climber.lifetime = 600;
      door.x = Math.round(random(120, 400));
      door.velocityY = 1;
      door.lifetime = 600;
      
      ghost.depth = door.depth;
      ghost.depth = ghost.depth + 1;
      ghost.depth = climber.depth;
      ghost.depth = ghost.depth + 1;
         
      doorGroup.add(door);
      climberGroup.add(climber);
      invisibleClimberGroup.add(invisibleClimber);
      
    }
}
