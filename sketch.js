var background_image, bground;
var bow_image, bow;
var balloons, red_balloon, blue_balloon, pink_balloon, green_balloon;
var arrow, arrowimage, arrow_group;
var redb_group, blueb_group, greenb_group, pinkb_group;
var start = 0, play = 1, end = 2;
var gameState = start;
var lives = 3;
var score = 0;
var endsprite
function preload() {
    background_image = loadImage("background0.png");
    bow_image = loadImage("bow0.png");
    red_balloon = loadImage("red_balloon0.png");
    blue_balloon = loadImage("blue_balloon0.png");
    green_balloon = loadImage("green_balloon0.png");
    pink_balloon = loadImage("pink_balloon0.png");
    arrowimage = loadImage("arrow0.png");
}


function setup() {
    createCanvas(400, 400);
    //creating background
    bground = createSprite(200, 200, 600, 600);
    bground.addImage("bg", background_image);
    bground.scale = 1.1;
    //creating bow
    bow = createSprite(380, 220, 30, 80);
    bow.addImage("bowpic", bow_image);
    //creating balloon group
    redb_group = createGroup();
    blueb_group = createGroup();
    greenb_group = createGroup();
    pinkb_group = createGroup();
    arrow_group = createGroup();
    endsprite=createSprite(400,200,10,400)
    endsprite.visible=false;
}


function draw() {
    background(200);
    drawSprites();
    textSize(15);
    fill("green");
    text("Score=" + score,165,20);
    fill("red")
    text("Lives=" +lives,335,15)
    if (gameState == start) {
        textSize(15);
        fill("black");
        text("Please click on space to start the game", 50, 225);
        if (keyDown("space")) {
            gameState = play;
        }
    }
    else if (gameState == play) {
        //moving bow accoring to mouse
        bow.y = mouseY;
        var select_balloon = Math.round(random(1, 4));
        if (World.frameCount % 100 == 0) {
            if (select_balloon == 1) {
                redballoon();
            }
            else if (select_balloon == 2) {
                blueballoon();
            }
            else if (select_balloon == 3) {
                greenballoon();
            }
            else {
                pinkballoon();
            }
        }
        if (keyWentDown("space")) {
            createarrow()
            arrow.velocityX = -4
            arrow.scale = 0.4;
        }
        if (arrow_group.isTouching(redb_group)) {
            redb_group.destroyEach()
            arrow_group.destroyEach()
            score=score+2;
        }
        if (arrow_group.isTouching(blueb_group)) {
            blueb_group.destroyEach()
            arrow_group.destroyEach()
            score=score+1;
        }
        if (arrow_group.isTouching(greenb_group)) {
            greenb_group.destroyEach()
            arrow_group.destroyEach()
            score=score+3;
        }
        if (arrow_group.isTouching(pinkb_group)) {
            pinkb_group.destroyEach()
            arrow_group.destroyEach()
            score=score+4;
        }
        if (redb_group.isTouching(endsprite) || blueb_group.isTouching(endsprite) || greenb_group.isTouching(endsprite) || pinkb_group.isTouching(endsprite)) {
            if (lives>1) {
                lives=lives-1;
                gameState=start
            }
            else {
                gameState=end;
                lives=0;
            }
        }
    }
    else if(gameState==end) {
        pinkb_group.destroyEach();
        arrow_group.destroyEach();
        redb_group.destroyEach();
        blueb_group.destroyEach();
        greenb_group.destroyEach();
        bow.destroy();
        textSize(30);
        fill("red")
        text("You lost", 155,200)

    }
}
function redballoon() {
    var red = createSprite(0, Math.round(random(20, 370)), 10, 10);
    red.addImage("rb", red_balloon);
    red.velocityX = 5;
    red.scale = 0.09
    redb_group.add(red);
    red.lifetime = 100
}

function blueballoon() {
    var blue = createSprite(0, Math.round(random(20, 370)), 10, 10);
    blue.addImage("bb", blue_balloon);
    blue.velocityX = 5;
    blue.scale = 0.1
    blueb_group.add(blue);
    blue.lifetime = 100
}

function greenballoon() {
    var green = createSprite(0, Math.round(random(20, 370)), 10, 10);
    green.addImage("gb", green_balloon);
    green.velocityX = 5;
    green.scale = 0.09
    greenb_group.add(green);
    green.lifetime = 100
}

function pinkballoon() {
    var pink = createSprite(0, Math.round(random(20, 370)), 10, 10);
    pink.addImage("pb", pink_balloon);
    pink.velocityX = 5;
    pinkb_group.add(pink);
    pink.lifetime = 100
}

function createarrow() {
    arrow = createSprite(360, 100, 60, 10);
    arrow.addImage("arw", arrowimage);
    arrow.setCollider("rectangle", 0, 0, 300, 60)
    arrow.y = bow.y;
    arrow_group.add(arrow);
    arrow.lifetime = 120
}

