/// <reference path="gameobject.ts"/>

class Bomb extends GameObject {
    constructor(g:Game) {
        super(g)

        console.log("Bom aangemaakt")

        this.game = g

        let foreground  = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this);
        
        this.posx = Math.floor(Math.random() * this.w)
        this.resetObject()

        this.addEventListener("click", (e) => this.onClick(e as MouseEvent))
    }

    // Methods
    update() {
        this.posy += this.speed
        if(this.posy >= this.h) {
            this.resetObject()
            this.game.destroyBuilding()
        }
        this.draw()
    }

    resetSpeed() {
        this.speed = Math.floor(Math.random() * 8) + 1
    }

    resetCoordinates() {
        this.posy = (Math.random() * -300) - this.clientHeight
        this.posx = (Math.random() * (1920 - this.clientWidth))
    }

    onClick(e:MouseEvent) {
        this.game.scorePoint()
        this.resetObject()
    }
}

window.customElements.define("bomb-component", Bomb as any)