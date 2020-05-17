class Game {
    // Properties
    private score: number = 0
    private destroyed: number = 0
    private textfield: HTMLElement
    private statusbar: HTMLElement
    private bombs: Bomb[] = []
    private car: Car
    private readonly BOMBS:number = 4
    
    constructor() {
        this.textfield = document.getElementsByTagName("textfield")[0] as HTMLElement
        this.statusbar = document.getElementsByTagName("bar")[0] as HTMLElement

        this.car = new Car(this)

        for(let i:number = 0; i < this.BOMBS; i++) {
            this.bombs.push(new Bomb(this))
        }

        // Gameloop in gang zetten
        this.gameLoop()
    }
    
    // Methods
    private gameLoop() {
        console.log("updating the game")

        // Positie van bom en auto updaten
        for(let i:number = 0; i < this.BOMBS; i++) {
            this.bombs[i].update()
        }
        this.car.update()

        // Statusbalk
        this.statusbar.style.backgroundPositionX = 0 - (this.destroyed * 72) + "px"

        if(this.destroyed < 4) {
            // Gameloop aan de gang houden
            requestAnimationFrame(() => this.gameLoop())
        } else {
            this.textfield.innerHTML = "Game over! Your score is: " + this.score
        }
    }

    public destroyBuilding() {
        this.destroyed++
        console.log("buildings destroyed: " + this.destroyed)
    }

    public fixBuilding() {
        if(this.destroyed == 0) {
            return
        } else {
            console.log("buildings destroyed: " + this.destroyed)
            this.destroyed--
        }
    }

    public scorePoint() {
        this.score++
        this.textfield.innerHTML = "Score: " + this.score
    }
} 

window.addEventListener("load", () => new Game())