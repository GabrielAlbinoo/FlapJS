//Área de jogo
var playArea = document.getElementById("PlayArea")

//Dados do jogador
var player = document.getElementById("Player")
var actualX = 0
var actualY = 240 -70
var vel = -3
var hit = false
var dead = false

//paredes
var wallTop = document.getElementById("wallTop")
var wallBottom = document.getElementById("wallBottom")

//Geração de tubos
var min = 160; // Valor mínimo
var max = 370; // Valor máximo
var dificulty = 2000 //frequnecia em que eles vão aparecer
dist = 120

//Pontuação
var pointsText = document.getElementById("Points")
var points = 0

document.addEventListener("keydown", jump)

setInterval(gravity, 10)
setInterval(spawnTubes, 1000)
setInterval(checkDeath, 100)


function jump(event){
    if (!dead) {
        vel = -3
    }
    
}

function gravity(){
    vel = vel + 0.098
    actualY = actualY + vel
    player.style.top = actualY + "px"
}

function spawnTubes(){
    if (!dead){
        var tube1 = document.createElement("div")
        tube1.className = "tube"
        playArea.append(tube1)
        var pos1 = Math.floor(Math.random() * (max - min + 1)) + min;
        tube1.style.bottom = pos1 + "px"

        var tube2 = document.createElement("div")
        tube2.className = "tube"
        playArea.append(tube2)
        tube2.style.top = 480 - pos1  + dist + "px"

        tube1.addEventListener("animationend", function() {increase(); tube1.remove();})
        tube2.addEventListener("animationend", function() {tube2.remove()})
    }
}

function increase(){
    points += 1
    pointsText.textContent = "Pontos: " + points
    if (dificulty > 700) {
        dificulty -= 100
    }
}

function checkDeath() {
    var tubes = document.querySelectorAll(".tube")
    tubes.forEach(function(tube){colision(tube)})
    colision(wallTop)
    colision(wallBottom)
}

function colision(obj) {
    var playerRect = player.getBoundingClientRect()
    var objRect = obj.getBoundingClientRect()
    hit = !(playerRect.right < objRect.left || playerRect.left > objRect.right || playerRect.bottom < objRect.top || playerRect.top > objRect.bottom);
    if (hit == true){
        death()
    }
}
function death(){
    var tubes = document.querySelectorAll(".tube")
    tubes.forEach(function(tube){tube.classList.add("stopTube")})
    if (!dead) {
        var deathText = document.createElement("h1")
        deathText.textContent = "Você Perdeu! \n Pontos: " + points
        playArea.append(deathText)
    }
    dead = true
    
}