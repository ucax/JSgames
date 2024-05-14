//point
var height = 0;
var lenght = 0;
var speed = 0;
var points = 0;
//random numero enteros
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
;
//Losing state
function loseState(time) {
    clearInterval(time);
}
;
//moviento manzana
function applemove(snake, behind) {
    var isIn = true;
    var apple = document.createAttribute("class");
    apple.value = "apple";
    var pointpos = [0, 0];
    //score
    points++;
    do {
        isIn = true;
        pointpos = [getRandomInt(1, (height - 1)), getRandomInt(1, (lenght - 1))];
        for (var i in behind.duration) {
            if (pointpos[0] == behind.placey[i] && pointpos[1] == behind.placex[i]) {
                isIn = false;
            }
        }
        if (pointpos[0] == snake.posy && pointpos[1] == snake.posy) {
            isIn = false;
        }
    } while (isIn == false);
    document.querySelector("#score").innerHTML = "Score : ".concat((points - 1));
    document.querySelector("#ty" + (pointpos[0]) + "x" + (pointpos[1])).setAttributeNode(apple);
    return pointpos;
}
//movimiento serpiente
function moving(snake, test_behind) {
    var applepos = applemove(snake, test_behind);
    var gamen = document.querySelector("#game");
    var a = 1;
    var isOn = true;
    var gamestate = true;
    var gotApple = false;
    //Movement check
    document.onkeydown = checkKey;
    function checkKey(e) {
        e = e || window.event;
        if (e.keyCode == '38') {
            // up arrow (--)
            if (gamestate) {
                if (snake.direction != "down") {
                    if (isOn) {
                        snake.direction = "up";
                        //pintar snek
                        var snake_paint = document.createAttribute("class");
                        snake_paint.value = "snakeUp";
                        gamen.querySelector("#ty" + snake.posy + "x" + snake.posx).setAttributeNode(snake_paint);
                        isOn = false;
                    }
                    else if (test_behind.placey[(a - 1)] != (snake.posy - 1)) {
                        snake.direction = "up";
                        var snake_paint = document.createAttribute("class");
                        snake_paint.value = "snakeUp";
                        gamen.querySelector("#ty" + snake.posy + "x" + snake.posx).setAttributeNode(snake_paint);
                    }
                    ;
                    //testing
                }
                ;
            }
            ;
        }
        else if (e.keyCode == '40') {
            // down arrow (++)
            if (gamestate) {
                if (snake.direction != "up") {
                    if (isOn) {
                        snake.direction = "down";
                        //pintar snek
                        var snake_paint = document.createAttribute("class");
                        snake_paint.value = "snakeDown";
                        gamen.querySelector("#ty" + snake.posy + "x" + snake.posx).setAttributeNode(snake_paint);
                        isOn = false;
                    }
                    else if (test_behind.placey[(a - 1)] != (snake.posy + 1)) {
                        snake.direction = "down";
                        //pintar snek
                        var snake_paint = document.createAttribute("class");
                        snake_paint.value = "snakeDown";
                        gamen.querySelector("#ty" + snake.posy + "x" + snake.posx).setAttributeNode(snake_paint);
                    }
                }
            }
            //testing
        }
        else if (e.keyCode == '37') {
            // left arrow (--)
            if (gamestate) {
                if (snake.direction != "right") {
                    if (isOn) {
                        snake.direction = "left";
                        //pintar snek
                        var snake_paint = document.createAttribute("class");
                        snake_paint.value = "snakeLeft";
                        gamen.querySelector("#ty" + snake.posy + "x" + snake.posx).setAttributeNode(snake_paint);
                        isOn = false;
                    }
                    else if (test_behind.placex[(a - 1)] != (snake.posx - 1)) {
                        snake.direction = "left";
                        //pintar snek
                        var snake_paint = document.createAttribute("class");
                        snake_paint.value = "snakeLeft";
                        gamen.querySelector("#ty" + snake.posy + "x" + snake.posx).setAttributeNode(snake_paint);
                    }
                }
            }
        }
        else if (e.keyCode == '39') {
            // right arrow
            if (gamestate) {
                if (snake.direction != "left") {
                    if (isOn) {
                        snake.direction = "right";
                        //pintar snek
                        var snake_paint = document.createAttribute("class");
                        snake_paint.value = "snakeRight";
                        gamen.querySelector("#ty" + snake.posy + "x" + snake.posx).setAttributeNode(snake_paint);
                        isOn = false;
                    }
                    else if (test_behind.placex[(a - 1)] != (snake.posx + 1)) {
                        snake.direction = "right";
                        //pintar snek
                        var snake_paint = document.createAttribute("class");
                        snake_paint.value = "snakeRight";
                        gamen.querySelector("#ty" + snake.posy + "x" + snake.posx).setAttributeNode(snake_paint);
                    }
                    ;
                }
                ;
            }
            ;
        }
        ;
    }
    ;
    //Movement timer
    var time = setInterval(function () {
        test_behind.placex.push(snake.posx);
        test_behind.placey.push(snake.posy);
        a = (test_behind.duration.push(1) - 1);
        //direction set
        switch (snake.direction) {
            case "up":
                snake.posy--;
                break;
            case "down":
                snake.posy++;
                break;
            case "left":
                snake.posx--;
                break;
            case "right":
                snake.posx++;
                break;
        }
        ;
        //colission with wall check
        if ((snake.posx == 0 || snake.posx == lenght) || snake.posy == 0 || snake.posy == height) {
            loseState(time);
            gamestate = false;
        }
        //check for apples
        if (applepos[0] == snake.posy && applepos[1] == snake.posx) {
            gotApple = true;
        }
        // set movement
        var behind_paint = document.createAttribute("class");
        behind_paint.value = "behind";
        var snake_paint = document.createAttribute("class");
        /*
        let snake_paint = document.createAttribute("class");
        snake_paint.value = "snake";
        gamen.querySelector(".snake").setAttributeNode(behind_paint);
        
   
        gamen.querySelector("#ty" + snake.posy + "x" + snake.posx).setAttributeNode(snake_paint);     */
        switch (snake.direction) {
            case "up":
                snake_paint.value = "snakeUp";
                gamen.querySelector(".snakeUp").setAttributeNode(behind_paint);
                gamen.querySelector("#ty" + snake.posy + "x" + snake.posx).setAttributeNode(snake_paint);
                break;
            case "down":
                snake_paint.value = "snakeDown";
                gamen.querySelector(".snakeDown").setAttributeNode(behind_paint);
                gamen.querySelector("#ty" + snake.posy + "x" + snake.posx).setAttributeNode(snake_paint);
                break;
            case "left":
                snake_paint.value = "snakeLeft";
                gamen.querySelector(".snakeLeft").setAttributeNode(behind_paint);
                gamen.querySelector("#ty" + snake.posy + "x" + snake.posx).setAttributeNode(snake_paint);
                break;
            case "right":
                snake_paint.value = "snakeRight";
                gamen.querySelector(".snakeRight").setAttributeNode(behind_paint);
                gamen.querySelector("#ty" + snake.posy + "x" + snake.posx).setAttributeNode(snake_paint);
                break;
        }
        ;
        for (var i in test_behind.duration) {
            test_behind.duration[i]++;
            if (test_behind.duration[i] > (test_behind.lenght)) {
                //verification delete placement
                if (!((test_behind.placex[i] == snake.posx && test_behind.placey[i] == snake.posy) || (test_behind.placex[i] == applepos[1] && test_behind.placey[i] == applepos[0]))) {
                    //delete behind class
                    var clear = document.createAttribute("class");
                    clear.value = " ";
                    gamen.querySelector("#ty" + test_behind.placey[i] + "x" + test_behind.placex[i]).setAttributeNode(clear);
                }
                //delete array
                test_behind.placex.splice(i, 1),
                    test_behind.placey.splice(i, 1);
                test_behind.duration.splice(i, 1);
                //colission with snake check
                for (var i_1 in test_behind.duration) {
                    if (snake.posx == test_behind.placex[i_1] && snake.posy == test_behind.placey[i_1]) {
                        loseState(time);
                        gamestate = false;
                    }
                }
            }
        }
        //isOn false
        isOn = true;
        //set new apple
        if (gotApple) {
            applepos = applemove(snake, test_behind);
            test_behind.lenght++;
            //got apple false
            gotApple = false;
        }
        ;
        //speed of the game    
    }, speed);
    var boton = document.querySelector("#stop");
    boton.addEventListener("click", function () {
        clearInterval(time);
    });
    var boton2 = document.querySelector("#startReset");
    boton2.addEventListener("click", function () {
        clearInterval(time);
    });
}
//main game
function game() {
    //variables
    var snake_paint = document.createAttribute("class");
    snake_paint.value = "snakeRight";
    var behind_paint = document.createAttribute("class");
    behind_paint.value = "behind";
    points = 0;
    //set snake
    var snake = {
        posx: lenght / 2,
        posy: height / 2,
        direction: "right"
    };
    //parte de atras set
    var behind = {
        lenght: 3,
        placex: [(lenght / 2 - 1),],
        placey: [(height / 2),],
        duration: [1]
    };
    //main snake body thing
    document.querySelector("#ty" + snake.posy + "x" + snake.posx).setAttributeNode(snake_paint);
    document.querySelector("#ty" + behind.placey[0] + "x" + behind.placex[0]).setAttributeNode(behind_paint);
    moving(snake, behind);
}
//inciar juego
window.addEventListener("load", function () {
    var comenzarReiniciar = document.querySelector("#startReset");
    var juego = document.querySelector("#game");
    comenzarReiniciar.addEventListener("click", function (e) {
        e.preventDefault();
        var datos_juegos = document.querySelector("#datosgame");
        comenzarReiniciar.innerHTML = "Restart";
        juego.innerHTML = "";
        var dificultad = datos_juegos[2].value;
        //Calculador de tamaño y dificultad
        switch (datos_juegos[1].value /*Tamaño juego*/) {
            case "small":
                height = 20;
                lenght = 40;
                break;
            case "big":
                height = 30;
                lenght = 60;
                break;
        }
        switch (dificultad) {
            case "easy":
                speed = 100;
                break;
            case "medium":
                speed = 50;
                break;
            case "hard":
                speed = 30;
                break;
            case "Vhard":
                speed = 18;
                break;
        }
        //crea tabla
        juego.appendChild(document.createElement("table"));
        var table = juego.getElementsByTagName("table");
        for (var i = 0; i <= height; i++) {
            var fila = document.createElement("tr");
            table[0].appendChild(fila);
            var inTabla = table[0].getElementsByTagName("tr");
            for (var a = 0; a <= lenght; a++) {
                var columna = document.createElement("td");
                columna.id = "ty" + i + "x" + a;
                if (i == 0 || i == height || a == 0 || a == lenght) {
                    var wall = document.createAttribute("class");
                    wall.value = "wall";
                    columna.setAttributeNode(wall);
                }
                inTabla[i].appendChild(columna);
            }
            ;
        }
        ;
        game();
    });
});
