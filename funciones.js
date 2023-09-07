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
agregarImagenes()


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
        todasImg[posImg[0]].setAttribute("src", './imagenes/check.jpg')
        todasImg[posImg[1]].setAttribute("src", './imagenes/check.jpg')

        todasImg[posImg[0]].removeEventListener('click',mostrarImg)
        todasImg[posImg[1]].removeEventListener('click',mostrarImg)

    } else {
        todasImg[posImg[0]].setAttribute("src", './imagenes/logo.png')
        todasImg[posImg[1]].setAttribute("src", './imagenes/logo.png')
    }




    nombreImg = [];
    posImg = [];
}