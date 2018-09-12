var world = [[]]; 

var worldDic = {
    0: "empty",
    1: "coin",
    2: "cherry",
    3: "brick",
}

var pacman = {
    x: 20,
    y: 20
}

var rotate = 0;

var inky = {
    x: 0,
    y: 0
}

var clyde = {
    x: 0,
    y: 0
}

var lives = 3;

var score = 0;

var winningScore = 0;

var mapSize = {
    x: 0,
    y: 0
};


buildWorld();
countCoinsAndCherries();
displayPacman();
displayWorld();


function buildWorld(){
    while(mapSize.y < 5 || mapSize.y > 20){mapSize.y = parseInt(prompt("Set Map Height: 5-20"))};
    while(mapSize.x < 5 || mapSize.x > 30){mapSize.x = parseInt(prompt("Set Map Width: 5-30"))};

    for(var i = 0; i < mapSize.x + 2; i++){
        world[0].push(3);
    }
    world[1] = [3];
    for(var i = 0; i < mapSize.x; i++){
        world[1].push(Math.floor(Math.random() * 3));
    }
    world[1].push(3);
    
    for(var i = 2; i < mapSize.y; i++){
        world[i] = [];
        world[i].push(3);
        world[i].push(Math.floor(Math.random() * 3));


        for(var j = 2; j < mapSize.x; j++){
            var num = Math.floor(Math.random() * 4);
            
            if(num != 3){
                if(world[i][j - 1] == 3 && world[i - 1][j] == 3){
                    world[i].push(3);
                }
                else {
                    world[i].push(num);
                }
            }
            else {
                world[i].push(num);
            }
        }
        world[i].push(Math.floor(Math.random() * 3));
        world[i].push(3);
    }

    world[mapSize.y + 1] = [];

    world[mapSize.y] = [3];
    for(var i = 0; i < mapSize.x; i++){
        world[mapSize.y].push(Math.floor(Math.random() * 3));
    }
    world[mapSize.y].push(3);

    world[mapSize.y + 1] = [];
    for(var i = 0; i < mapSize.x + 2; i++){
        world[mapSize.y + 1].push(3);
    }

    world[1][1] = 0;
    world[world.length - 2][world[0].length - 2] = 0;
    world[world.length - 2][2] = 0;
    world[2][world[0].length - 2] = 0;

    clyde.x = 20;
    clyde.y = (world.length - 2) * 20;

    inky.x = (world[0].length - 2) * 20;
    inky.y = (world.length - 2) * 20;
}

function countCoinsAndCherries(){
    var coinCount = 0;
    var cherries = 0;
    for(var i = 1; i < world.length - 1; i++){
        for(var j = 1; j < world[i].length - 1; j++){
            if(world[i][j] == 1){
                coinCount++;
            }
            else if(world[i][j] == 2){
                cherries++;
            }
        }
    }
    winningScore = (10 * coinCount) + (50 * cherries);
}


function displayWorld(){
    var output = "";
    for(var i = 0; i < world.length; i++){
        output += "<div class='row'>"
        for(var j = 0; j < world[i].length; j++){
            output += "<div class='" + worldDic[world[i][j]] + "'></div>"
        }
        output += "</div>"
    }
    if(score >= winningScore){
        document.getElementById("scoreBoard").innerHTML = "The Score is: " + score + " You Win!" + "<br>" + "Refresh for a new Map!";
    }
    else {
        document.getElementById("scoreBoard").innerHTML = "The Score is: " + score + "<br>" + "Get " + winningScore + " points to win!";
    }
    if(lives == 0){
        document.getElementById("pacmanImg").style.display = "none";
        pacman.x = 20;
        pacman.y = 20;
        document.getElementById("lives").innerHTML = "Lives Left: " + lives + " You Lost!" + "<br>" + "Refresh for Another Chance!";
    }
    else {
        document.getElementById("lives").innerHTML = "Lives Left: " + lives;
    }
    document.getElementById("world").innerHTML = output;
}

function displayPacman(){
    document.getElementById("inkyGhost").style.top = inky.y + "px";
    document.getElementById("inkyGhost").style.left = inky.x + "px";
    
    document.getElementById("clydeGhost").style.top = clyde.y + "px";
    document.getElementById("clydeGhost").style.left = clyde.x + "px";
    
    document.getElementById("pacman").style.top = pacman.y + "px";
    document.getElementById("pacman").style.left = pacman.x + "px";
    document.getElementById("pacmanImg").style.transform = "rotate(" + rotate + "deg)";
}


function moveInky(){
    var num = Math.floor(Math.random() * 4) + 37;

    if(num == 37){ //left
        if(world[inky.y/20][inky.x/20 - 1] != 3){
            inky.x -= 20;
        }
    }

    else if(num == 39){ //right
        if(world[inky.y/20][inky.x/20 + 1] != 3){
            inky.x += 20;
        }
    }

    else if(num == 38){ //up
        if(world[inky.y/20 - 1][inky.x/20] != 3){
            inky.y -= 20;
        }
    }

    else if(num == 40){ //down
        if(world[inky.y/20 + 1][inky.x/20] != 3){
            inky.y += 20;
        }
    }
}


function moveClyde(){
    if(clyde.x > pacman.x){
        if(world[clyde.y/20][clyde.x/20 - 1] != 3){
            clyde.x -= 20;
            return;
        }
    }
    if(clyde.x < pacman.x){
        if(world[clyde.y/20][clyde.x/20 + 1] != 3){
            clyde.x += 20;
            return;
        }
    }
    if(clyde.y > pacman.y){
        if(world[clyde.y/20 - 1][clyde.x/20] != 3){
            clyde.y -= 20;
            return;
        }
    }
    if(clyde.y < pacman.y){
        if(world[clyde.y/20 + 1][clyde.x/20] != 3){
            clyde.y += 20;
            return;
        }
    }
}


function reset(){
    pacman.x = 20;
    pacman.y = 20;
    rotate = 0;

    clyde.x = 20;
    clyde.y = (world.length - 2) * 20;

    inky.x = (world[0].length - 2) * 20;
    inky.y = (world.length - 2) * 20;

    displayWorld();
    displayPacman();
}


document.onkeydown = function(e){
    
    if(e.keyCode == 37){ //left
        rotate = 180;
        if(world[pacman.y/20][pacman.x/20 - 1] != 3){
            pacman.x -= 20;
        }
    }

    else if(e.keyCode == 39){ //right
        rotate = 0;
        if(world[pacman.y/20][pacman.x/20 + 1] != 3){
            pacman.x += 20;
        }
    }

    else if(e.keyCode == 38){ //up
        rotate = 270;
        if(world[pacman.y/20 - 1][pacman.x/20] != 3){
            pacman.y -= 20;
        }
    }

     else if(e.keyCode == 40){ //down
        rotate = 90;
        if(world[pacman.y/20 + 1][pacman.x/20] != 3){
            pacman.y += 20;
        }
    }

    moveInky();
    moveClyde();

    if(world[pacman.y/20][pacman.x/20] == 1){
        score += 10;
        world[pacman.y/20][pacman.x/20] = 0;
    }
    else if(world[pacman.y/20][pacman.x/20] == 2){
        score += 50;
        world[pacman.y/20][pacman.x/20] = 0;
    }

    if((pacman.x == inky.x && pacman.y == inky.y)||(pacman.x == clyde.x && pacman.y == clyde.y)){
        lives--;
        alert("Oh no! You've been caught by a Ghost!")
        reset();
    }

    displayWorld();
    displayPacman();

}