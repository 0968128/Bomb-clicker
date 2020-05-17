/// <reference path="gameobject.ts"/>

class Car extends GameObject {
    constructor(g:Game) {
        super(g)

        console.log("Auto aangemaakt")

        this.game = g

        let foreground  = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this);
        
        this.posx = Math.floor(Math.random() * -1000)
        this.posy = this.h - this.clientHeight

        this.addEventListener("click", (e) => this.onClick(e as MouseEvent))
    }

    // Methods
    update() {
        this.posx++
        if(this.posx >= this.w) {
            this.posx = -this.clientWidth
        }
        this.draw()
    }

    resetSpeed() {
        this.speed = (Math.random() * 4)
    }

    resetCoordinates() {
        this.posx = (Math.random() * -500) - this.clientWidth
    }

    onClick(e:MouseEvent) {
        this.game.fixBuilding()
        this.resetCoordinates()
    }
}

window.customElements.define("car-component", Car as any)