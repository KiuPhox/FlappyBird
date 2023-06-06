import { Game } from "../game"
import { Vector } from "../types/general"
import { GameObject } from "./GameObject"

export class Bird extends GameObject {
    private velocity: Vector
    private gravity: number
    private jumpStrength: number

    private isOver: boolean

    constructor() {
        super()
        this.velocity = { x: 0, y: 0 }
        this.gravity = 0
        this.objectImage.src = "assets/images/bird-mid.png"
        this.jumpStrength = 2.5
        this.isOver = false
    }

    public move(): void {
        this.applyGravity()
        this.updatePosition()
        this.checkBounds()
    }

    public jump(): void {
        this.velocity.y = -this.jumpStrength
    }

    private applyGravity(): void {
        this.velocity.y += this.gravity

        if (!this.isOver)
            this.rot = this.velocity.y / 4
    }

    private updatePosition(): void {
        this.pos.x += this.velocity.x
        this.pos.y += this.velocity.y

        if (this.velocity.y > 0.5) {
            this.image.src = 'assets/images/bird-up.png'
        } else if (this.velocity.y < 0.5 && this.velocity.y > -1) {
            this.image.src = 'assets/images/bird-mid.png'
        } else if (this.velocity.y < -1) {
            this.image.src = 'assets/images/bird-down.png'
        }
    }

    private checkBounds(): void {

        if (!this.isOver && this.pos.y > 400 || this.pos.y < 0) {
            this.isOver = true
            this.pos.y = 400
            Game.getInstance().updateGameState("GameOver")
        }

        if (this.pos.y > 400) {
            this.pos.y = 400
            //this.velocity.y = 0
        }
    }

    public setIsOver(isOver: boolean): void {
        this.isOver = isOver
    }

    public setVelocity(velocity: Vector): void {
        this.velocity = velocity
    }

    public setGravity(gravity: number): void {
        this.gravity = gravity
    }

}