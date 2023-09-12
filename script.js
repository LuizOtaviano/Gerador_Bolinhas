const numeroObjetos = document.querySelector("#num_objetos")
const quantidadeObjetos = document.querySelector("#txt_qtde")
const btnAddObjeto = document.querySelector("#btn_add")
const btnRemover = document.querySelector("#btn_remover")
const palco = document.querySelector(".palco")

let larguraPalco = palco.clientWidth
let alturaPalco = palco.clientHeight
let bolas = []
let numBolas = 0

class Bola {
    constructor(arrayBolas, palco) {
        this.tamanho = Math.floor(Math.random() * 10 + 10)

        this.r = Math.floor(Math.random() * 255)
        this.g = Math.floor(Math.random() * 255)
        this.b = Math.floor(Math.random() * 255)
        this.cor = `rgb(${this.r}, ${this.g}, ${this.b})`

        this.px = Math.floor(Math.random() * (larguraPalco - this.tamanho))
        this.py = Math.floor(Math.random() * (alturaPalco - this.tamanho))

        this.velx = Math.floor(Math.random() * 2) + 0.5
        this.vely = Math.floor(Math.random() * 2) + 0.5

        this.dirx = (Math.random() * 10) > 5 ? 1 : -1
        this.diry = (Math.random() * 10) > 5 ? 1 : -1

        this.palco = palco
        this.arrayBolas = arrayBolas
        this.id = Date.now() + "_" + Math.floor(Math.random() * 100000000000)
        numBolas++
        numeroObjetos.innerHTML = numBolas
        this.desenhar()
        this.eu = document.getElementById(this.id)
        this.controle = setInterval(this.controlar.bind(this), 10)
    }

    minhaPos() {
        return this.arrayBolas.indexOf(this)
    }

    desenhar() {
        const div = document.createElement("div")
        div.setAttribute("id", this.id)
        div.setAttribute("class", "bola")
        div.setAttribute("style", `left: ${this.px}px; top: ${this.py}px; width: ${this.tamanho}px; height: ${this.tamanho}px; background-color: ${this.cor}`)

        palco.appendChild(div)
    }

    remover() {
        clearInterval(this.controle)
        bolas = bolas.filter(b => {
            if (b.id != this.id)
                return b
        })
        this.eu.remove()
        numBolas--
        numeroObjetos.innerHTML = numBolas
    }

    controle_bordas() {
        if (this.px + this.tamanho >= larguraPalco-5) {
            this.dirx = -1
        } else if (this.px + this.tamanho <= 15) {
            this.dirx = 1
        }

        if (this.py + this.tamanho >= alturaPalco-5) {
            this.diry = -1
        } else if (this.py + this.tamanho <= 15) {
            this.diry = 1
        }
    }

    controlar() {
        this.controle_bordas()
        this.px += this.dirx * this.velx
        this.py += this.diry * this.vely
        this.eu.setAttribute("style", `left: ${this.px}px; top: ${this.py}px; width: ${this.tamanho}px; height: ${this.tamanho}px; background-color: ${this.cor}`)

        if (this.px > larguraPalco || this.py > alturaPalco) {
            this.remover()
        }
    }
}


// Pega o tamanho do palco baseado no tamanho da janela
window.addEventListener("resize", evt => {
    larguraPalco = palco.clientWidth
    alturaPalco = palco.clientHeight
})

// Evento do botão de adicionar
btnAddObjeto.addEventListener("click", () => {
    let quantObjetos = quantidadeObjetos.value
    for (let i = 0; i < quantObjetos; i++) {
        let bola = new Bola(bolas, palco)
        bolas.push(bola)
    }
})


// Evento do botão de remover
btnRemover.addEventListener("click", () => {
    bolas.map(b => {
        b.remover()
    })
})