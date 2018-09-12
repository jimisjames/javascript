var hero = {
    x: 400,
    y: 500
}

var enemies = [
    {x: 100, y: 25, t: 1}, 
    {x: 300, y: 0, t: 1}, 
    {x: 500, y: 75, t: 2}, 
    {x: 700, y: 100, t: 1},
    {x: 900, y: 75, t: 2}, 
    {x: 50, y: 50, t: 1},
    {x: 450, y: 70, t: 2}, 
    {x: 400, y: 30, t: 2}, 
    {x: 430, y: 90, t: 2}, 
    {x: 600, y: 40, t: 2}, 
    {x: 750, y: 10, t: 2}, 
    {x: 410, y: 90, t: 2}, 
    {x: 550, y: 40, t: 2}, 
    {x: 650, y: 10, t: 2}, 
    {x: 80, y: 20, t: 2}, 
    {x: 850, y: 0, t: 2}, 
    {x: 50, y: 50, t: 1}
];

var score = 0;

var bullets = [];

function displayHero(){
    document.getElementById("hero").style["top"] = hero.y + "px"
    document.getElementById("hero").style["left"] = hero.x + "px"
    document.getElementById("score").innerHTML = score;
}

function displayEnemies(){
    var output = "";
    for(var i = 0; i < enemies.length; i++){
        if(enemies[i].t == 1){
            output += "<div class='enemy1' style='top: " + enemies[i].y + "px; left: " + enemies[i].x + "px;'></div>";
        }
        else if(enemies[i].t == 2){
            output += "<div class='enemy2' style='top: " + enemies[i].y + "px; left: " + enemies[i].x + "px;'></div>";
        }
    }
    document.getElementById("enemies").innerHTML = output;
}

function moveEnemies(){
    for(var i = 0; i < enemies.length; i++){
        enemies[i].y += 1;

        if(enemies[i].y > 530){
            enemies[i].y = 0;
            enemies[i].x = Math.random() * 1000; 
        }
    }
}

function displayBullets(){
    var output = "";
    for(var i = 0; i < bullets.length; i++){
        output += "<div class='bullet' style='top: " + bullets[i].y + "px; left: " + bullets[i].x + "px;'></div>";
    }
    document.getElementById("bullets").innerHTML = output;
}

function moveBullets(){
    for(var i = 0; i < bullets.length; i++){
        bullets[i].y -= 5;

        if(bullets[i].y < 0){
            bullets[i] = bullets[bullets.length - 1];
            bullets.pop(); 
        }
    }
}

function gameLoop(){
    moveBullets();
    displayBullets();
    moveEnemies();
    displayEnemies();
    displayHero();
    detectCollision();
}

function detectCollision(){
    for(var i = 0; i < bullets.length; i++){
        for(var j = 0; j < enemies.length; j++){

            if((Math.abs(bullets[i].x - enemies[j].x - 5) < 15) && Math.abs(bullets[i].y - enemies[j].y - 20) < 5){
                bullets[i] = bullets[bullets.length - 1];
                bullets.pop(); 
                enemies[j] = enemies[enemies.length - 1];
                enemies.pop(); 
                score += 100;
            }
        }
    }
    for(var j = 0; j < enemies.length; j++){
        if((Math.abs(hero.x - enemies[j].x - 5) < 15) && Math.abs(hero.y - enemies[j].y - 20) < 5){
            enemies[j] = enemies[enemies.length - 1];
            enemies.pop(); 
            score -= 500;
        }
    }
}



setInterval(gameLoop, 10);


document.onkeydown = function(a){
    if(a.keyCode == 37){ //left
        if(hero.x > 0){
            hero.x -= 10;
        }
    }

    else if(a.keyCode == 39){ //right
        if(hero.x < 1000){
            hero.x += 10;
        }
    }

    else if(a.keyCode == 38){ //up
        if(hero.y > 0){
            hero.y -= 20;
        }
    }

    else if(a.keyCode == 40){ //down
        if(hero.y < 550){
            hero.y += 10;
        }
    }

    else if(a.keyCode == 32){ //spacebar
        bullets.push({x: hero.x + 5, y: hero.y - 13})
    }
}