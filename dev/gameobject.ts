class GameObject extends HTMLElement {
    // Properties
    protected posx: number
    protected posy: number
    protected w = window.innerWidth
    protected h = window.innerHeight
    protected speed: number
    protected game: Game

    constructor(game:Game) {
        super()
    }

    // Methods
    public update(){
    }

    protected draw() {
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`
    }

    protected resetObject() {
        this.resetSpeed()
        this.resetCoordinates()
    }

    protected resetSpeed() {
    }

    protected resetCoordinates() {
    }

    protected onClick(e:MouseEvent) {
    }
}