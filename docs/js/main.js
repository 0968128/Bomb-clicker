"use strict";
class GameObject extends HTMLElement {
    constructor(game) {
        super();
        this.w = window.innerWidth;
        this.h = window.innerHeight;
    }
    update() {
    }
    draw() {
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`;
    }
    resetObject() {
        this.resetSpeed();
        this.resetCoordinates();
    }
    resetSpeed() {
    }
    resetCoordinates() {
    }
    onClick(e) {
    }
}
class Bomb extends GameObject {
    constructor(g) {
        super(g);
        console.log("Bom aangemaakt");
        this.game = g;
        let foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this);
        this.posx = Math.floor(Math.random() * this.w);
        this.resetObject();
        this.addEventListener("click", (e) => this.onClick(e));
    }
    update() {
        this.posy += this.speed;
        if (this.posy >= this.h) {
            this.resetObject();
            this.game.destroyBuilding();
        }
        this.draw();
    }
    resetSpeed() {
        this.speed = Math.floor(Math.random() * 8) + 1;
    }
    resetCoordinates() {
        this.posy = (Math.random() * -300) - this.clientHeight;
        this.posx = (Math.random() * (1920 - this.clientWidth));
    }
    onClick(e) {
        this.game.scorePoint();
        this.resetObject();
    }
}
window.customElements.define("bomb-component", Bomb);
class Car extends GameObject {
    constructor(g) {
        super(g);
        console.log("Auto aangemaakt");
        this.game = g;
        let foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this);
        this.posx = Math.floor(Math.random() * -1000);
        this.posy = this.h - this.clientHeight;
        this.addEventListener("click", (e) => this.onClick(e));
    }
    update() {
        this.posx++;
        if (this.posx >= this.w) {
            this.posx = -this.clientWidth;
        }
        this.draw();
    }
    resetSpeed() {
        this.speed = (Math.random() * 4);
    }
    resetCoordinates() {
        this.posx = (Math.random() * -500) - this.clientWidth;
    }
    onClick(e) {
        this.game.fixBuilding();
        this.resetCoordinates();
    }
}
window.customElements.define("car-component", Car);
class Game {
    constructor() {
        this.score = 0;
        this.destroyed = 0;
        this.bombs = [];
        this.BOMBS = 4;
        this.textfield = document.getElementsByTagName("textfield")[0];
        this.statusbar = document.getElementsByTagName("bar")[0];
        this.car = new Car(this);
        for (let i = 0; i < this.BOMBS; i++) {
            this.bombs.push(new Bomb(this));
        }
        this.gameLoop();
    }
    gameLoop() {
        console.log("updating the game");
        for (let i = 0; i < this.BOMBS; i++) {
            this.bombs[i].update();
        }
        this.car.update();
        this.statusbar.style.backgroundPositionX = 0 - (this.destroyed * 72) + "px";
        if (this.destroyed < 4) {
            requestAnimationFrame(() => this.gameLoop());
        }
        else {
            this.textfield.innerHTML = "Game over! Your score is: " + this.score;
        }
    }
    destroyBuilding() {
        this.destroyed++;
        console.log("buildings destroyed: " + this.destroyed);
    }
    fixBuilding() {
        if (this.destroyed == 0) {
            return;
        }
        else {
            console.log("buildings destroyed: " + this.destroyed);
            this.destroyed--;
        }
    }
    scorePoint() {
        this.score++;
        this.textfield.innerHTML = "Score: " + this.score;
    }
}
window.addEventListener("load", () => new Game());
//# sourceMappingURL=main.js.map