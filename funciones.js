const d = document
let imagenes = [
    {
        "nombre": "Itachi",
        "url": "./imagenes/itachi.jpg"
    },
    {
        "nombre": "Madara",
        "url": "./imagenes/madara.jpg"
    },
    {
        "nombre": "Shisui",
        "url": "./imagenes/Shisui.webp"
    },
    {
        "nombre": "Obito",
        "url": "./imagenes/obito.jpg"
    },
    {
        "nombre": "Sasuke",
        "url": "./imagenes/Uchiha.jpg"
    },
    {
        "nombre": "Sarada",
        "url": "./imagenes/sarada.webp"
    },
    {
        "nombre": "Itachi",
        "url": "./imagenes/itachi.jpg"
    },
    {
        "nombre": "Madara",
        "url": "./imagenes/madara.jpg"
    },
    {
        "nombre": "Shisui",
        "url": "./imagenes/Shisui.webp"
    },
    {
        "nombre": "Obito",
        "url": "./imagenes/obito.jpg"
    },
    {
        "nombre": "Sasuke",
        "url": "./imagenes/Uchiha.jpg"
    },
    {
        "nombre": "Sarada",
        "url": "./imagenes/sarada.webp"
    }
];
let nombreImg = [];
let posImg = [];
let aux = []
let tablero = d.querySelector(".tablero");
let aciertos = 0;
let intentos = 0
let tiempo = 60
let mostrarAciertos = d.querySelector(".aciertos")
let mostrarIntentos = d.querySelector('.intentos')
let mostrarTiempo = d.querySelector('.tiempo')
let botonIniciar = d.querySelector('.boton-iniciar')
let jugador = d.querySelector('.player-1')
let juegoActivo = false
let nivel = 1
let mostrarNivel = d.querySelector('.nivel')
let tiempoTranscurrido;
let sonidoFondo = new Audio("/sonidos/fondo.mp3");
let sonidoCard = new Audio("/sonidos/card.mp3");
let player = ""
let rankingJugadores = []
let puntajeJugador ={}
let keyStorage = "puntaje"
let localS = JSON.parse(localStorage.getItem(keyStorage))
let TbodyTable = d.querySelector('.tbody_table')




botonIniciar.addEventListener('click',()=>{
    imagenes.sort(()=>Math.random()-0.5)
    if(juegoActivo == false && nivel == 1){
        juegoActivo = true
        agregarImagenes()
        tiempoDeJuego()
        player = jugador.textContent = prompt("Ingrese su nombre");
        

    }else if(juegoActivo == false && nivel == 2){
        juegoActivo = true
        agregarImagenes()
        tiempoDeJuego()
    }else if(juegoActivo == false && nivel == 3){
        juegoActivo = true
        agregarImagenes()
        tiempoDeJuego()
    }
    sonidoFondo.play()
})



//Agregar evento a las imagenes
function agregarImagenes() {
    for (let x = 0; x < imagenes.length; x++) {
        let div = d.createElement("div")
        let img = d.createElement("img")
        div.setAttribute('class', 'col-3')
        img.setAttribute('src', './imagenes/logo.png')
        img.setAttribute('class', 'img-fluid altoImg')
        img.setAttribute('id', x)
        img.addEventListener('click', mostrarImg)
        div.appendChild(img)
        tablero.appendChild(div)
    }
}

function mostrarImg() {
    let imgId = this.getAttribute('id')

    this.setAttribute('src', imagenes[imgId].url)
    nombreImg.push(imagenes[imgId].nombre)
    posImg.push(imgId)
    if (nombreImg.length == 2) {
        setTimeout(compararImg, 300)
    }



}
function compararImg() {
    let todasImg = d.querySelectorAll(".tablero .col-3 img")

    if (nombreImg[0] == nombreImg[1]) {
        if(posImg[0] != posImg[1]){
            todasImg[posImg[0]].setAttribute("src", './imagenes/check.jpg')
        todasImg[posImg[1]].setAttribute("src", './imagenes/check.jpg')
            sonidoCard.play()
        todasImg[posImg[0]].removeEventListener('click',mostrarImg)
        todasImg[posImg[1]].removeEventListener('click',mostrarImg)
        aciertos++
        mostrarAciertos.textContent = aciertos
        }else{
            alert("Debes escoger otra imagen")
            todasImg[posImg[0]].setAttribute('src','./imagenes/logo.png')
            intentos++
            mostrarIntentos.textContent = intentos;
        }

    } else {
        todasImg[posImg[0]].setAttribute("src", './imagenes/logo.png')
        todasImg[posImg[1]].setAttribute("src", './imagenes/logo.png')
        intentos++
        mostrarIntentos.textContent = intentos
    }
  
    nombreImg = [];
    posImg = [];

    if(aciertos == 6 && nivel == 1){
        tiempo = 45
        nivel = 2
        cambioDeNivel(tiempo,nivel)

    }else if(aciertos == 12 && nivel == 2){
        tiempo = 30
        nivel = 3
        cambioDeNivel(tiempo,nivel)
        
    }else if(aciertos == 18 && nivel == 3){
   
        alert('El juego ha terminado')
        sonidoFondo.pause()

        location.reload()
        puntajeJugador = {
            player,
            tiempo,
            intentos
        }
        cargarDatos(puntajeJugador)
    }

}



function tiempoDeJuego(){
    tiempoTranscurrido = setInterval(function(){
        mostrarNivel.textContent = nivel
        if(tiempo==10){
            
            mostrarTiempo.setAttribute('style','color:red; font-size: 30px')
        }else if(tiempo == -1){
            clearInterval(tiempoTranscurrido)
            alert("Perdiste! :( No adivinaste todas las imagenes")
            location.reload()
        }
        mostrarTiempo.textContent = tiempo--
    },1000)
}

function quitarImagenes(){
    let todasLasImagenes = d.querySelectorAll('.tablero div')
    for(let i = 0; i < todasLasImagenes.length; i++){
        todasLasImagenes[i].remove()
    }
}

function cargarDatos(object) {
    if (localS) {
        rankingJugadores = localS
    }
    rankingJugadores.push(object)
    localStorage.setItem(keyStorage, JSON.stringify(rankingJugadores))
}




localS.sort((a,b)=>a.intentos - b.intentos)

localS.forEach((element,item) => {
    
    let tr = d.createElement('tr')
    tr.innerHTML = `
    <tr>
        <td> ${item+1}</td>
        <td> ${element.player}</td>
        <td> ${element.tiempo}</td>
        <td> ${element.intentos}</td>
    </tr>`
    TbodyTable.appendChild(tr) 
    

    
});

function cambioDeNivel(tiempo,nivel){
    alert('felicitaciones pasaste del nivel')
    clearInterval(tiempoTranscurrido)
    quitarImagenes()
    mostrarNivel.textContent = nivel
    mostrarAciertos.textContent = aciertos
    mostrarIntentos.textContent = intentos
    mostrarTiempo.textContent = tiempo
    juegoActivo = false
}


