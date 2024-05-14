'use strict'

//juego match 4x4



//random numero enteros

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

//Tiempo
let tiempazo=0;
let s=0;
function setTime(timetext){
    s=0;
    if(tiempazo==0){

   timetext.innerHTML= "Tiempo : "+s;

    tiempazo= setInterval(() => {
        s++;
        timetext.innerHTML= "Tiempo : "+s;
        console.log(tiempazo);
    }, 1000);
}else{
    clearInterval(tiempazo);
    s=0;
   timetext.innerHTML= "Tiempo : "+s;

    tiempazo= setInterval(() => {
        s++;
        timetext.innerHTML= "Tiempo : "+s;
        console.log(tiempazo);
    }, 1000);
};
};




//condicion victoria
function ifVictory(check) {
    //console.log(check.length);
   // console.log(check);
    if(check.length==16){
        console.log("ganaste");
        let comenzarReiniciar = document.querySelector("#startReset");
        comenzarReiniciar.innerHTML="Comenzar";
        let time= document.querySelector("#time");
        time.innerHTML="GANASTE! solo te demoraste "+s+" segundos.";
        clearInterval(tiempazo);

    }else{
        return false;
    };
};







//poner color
function setDark(dato) {
    for (let i in dato) {
        dato[i].style.width= "20px";
        dato[i].style.height= "20px";
        dato[i].style.background = "black";
        dato[i].addEventListener('mouseover', function () {
            dato[i].style.backgroundColor = "gray";
        });
        dato[i].addEventListener('mouseout', function () {
            dato[i].style.backgroundColor = "black";
        });
    };
};


//en caso de click
function inMouse(dato,dato2) {
    var b = 0;
    var comp = [];
    var isIn = [];
    for (let i in dato) {
        dato[i].addEventListener('click', function () {
            //checkeo
            if (isIn.findIndex(test => test == dato[i].id) == -1) {
                console.log("click");
                if (b < 1) {
                    //first click
                    b++;
                    dato[i].innerHTML = dato2[i];
                    dato[i].style.backgroundColor = "white";
                    dato[i].addEventListener('mouseover', function () {
                        dato[i].style.backgroundColor = "white";
                    });
                    dato[i].addEventListener('mouseout', function () {
                        dato[i].style.backgroundColor = "white";

                    });
                    comp.push(dato[i]);
                    isIn.push(comp[0].id);
                } else {
                    //second click
                    comp.push(dato[i]);
                    dato[i].innerHTML = dato2[i];
                    dato[i].addEventListener('mouseover', function () {
                        dato[i].style.backgroundColor = "white";
                    });
                    dato[i].addEventListener('mouseout', function () {
                        dato[i].style.backgroundColor = "white";

                    });

                    //check

                    if (comp[0].innerHTML == comp[1].innerHTML) {

                        //if both the same
                        console.log("correcto!");
                        b = 0;
                        isIn.push(comp[1].id);
                        comp.splice(0, 2);
                        ifVictory(isIn);
                    } else {
                        //if both different
                        console.log("nope!");
                        comp[0].style.background = "black";
                        comp[1].style.background = "black";
                        comp[0].innerHTML = "";
                        comp[1].innerHTML = "";
                        comp[0].addEventListener('mouseover', function () {
                            this.style.backgroundColor = "gray";
                        });
                        comp[0].addEventListener('mouseout', function () {
                            this.style.backgroundColor = "black";
                        });
                        comp[1].addEventListener('mouseover', function () {
                            this.style.backgroundColor = "gray";
                        });
                        comp[1].addEventListener('mouseout', function () {
                            this.style.backgroundColor = "black";
                        });
                        b = 0;
                        comp.splice(0, 2);
                        isIn.reverse();
                        isIn.splice(0,1);

                    };

                };
                //console.log(comp);
            } else {
                return false;
            };
            console.log(isIn);
        });
    };

};




//dato para cajas



function rempcajas(dato) {
    var editcaja = dato.getElementsByTagName("td");
    var datosArray = [];
    var paraRandom = ["a", "b", "c", "d", "e", "f", "g", "h"];
    var datosArrayGuardado = [];

    for (let i in editcaja) {
        if (editcaja[i].id != undefined) {
            datosArray.push(editcaja[i]);
        };
    };


    //conseguir numeros
    let numerosGuardados = [];
    let b = 0;
    while (b < datosArray.length) {
        //debugger;
        let random = getRandomInt(1, 9);
        let check = numerosGuardados.some((search => search == random));
        if (check == false) {
            numerosGuardados.push(random);
            b++;
        } else {
            let numcheck = 0;
            let c = 0;
            for (c in numerosGuardados) {
                switch (numerosGuardados[c]) {
                    case random:
                        numcheck++;
                        break;
                    default:
                        break;
                };
            }
            if (numcheck < 2) {
                numerosGuardados.push(random);
                b++
            };
        };
        //console.log(numerosGuardados);
    };



    //console.log(numerosGuardados);

    //ajuste
    numerosGuardados.forEach((a, b) => {
        numerosGuardados[b] = a - 1;

    });


    //console.log(numerosGuardados);


    //entrega datos
    for (let i in datosArray) {
        datosArrayGuardado.push(paraRandom[numerosGuardados[(i)]]);
    };

    //console.log(datosArrayGuardado);
    //console.log(numerosGuardados);
    //console.log(datosArray);
    setDark(datosArray);
    inMouse(datosArray, datosArrayGuardado);
    //console.log(datosArray[0].innerHTML);
};























//iniciar juego


window.addEventListener("load", function () {
    let comenzarReiniciar = document.querySelector("#startReset");
    var juego = document.querySelector("#game");
    let time= this.document.querySelector("#time");


    comenzarReiniciar.addEventListener("click", function () {
        comenzarReiniciar.innerHTML="Reinciar";

        juego.innerHTML = "";


        //crea tabla

        juego.appendChild(document.createElement("table"));
        let table = juego.getElementsByTagName("table");
        for (let i = 0; i <= 3; i++) {
            var fila = document.createElement("tr");

            table[0].appendChild(fila);
            var inTabla = table[0].getElementsByTagName("tr");
            for (let a = 0; a <= 3; a++) {
                var columna = document.createElement("td");
                columna.id = "t" + i + a;
                inTabla[i].appendChild(columna);
            };
        };

        rempcajas(juego);
        setTime(time);
    });

});