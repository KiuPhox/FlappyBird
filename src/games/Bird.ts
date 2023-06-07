import { Game } from "../game"
import { Vector2 } from "../utils/Vector2"
import { GameObject } from "./GameObject"

export class Bird extends GameObject {
    private velocity: Vector2
    private gravity: number
    private jumpStrength: number

    private isOver: boolean
    private delta: number

    constructor() {
        super()
        this.velocity = Vector2.zero
        this.gravity = 0
        this._image.src = "assets/images/bird-mid.png"
        this.jumpStrength = 4.3
        this.isOver = false
    }

    public update(delta: number): void {
        this.delta = delta * 100
        this.applyGravity()
        this.updatePosition()
        this.checkBounds()
    }

    public jump(): void {
        this.velocity = new Vector2(this.velocity.x, -this.jumpStrength)
    }

    private applyGravity(): void {
        this.velocity = this.velocity.add(new Vector2(0, this.gravity * this.delta))

        if (!this.isOver)
            this.transform.rotation = this.velocity.y / 5
    }

    private updatePosition(): void {
        this.transform.position = this.transform.position.add(this.velocity.mul(this.delta))

        if (this.velocity.y > 0.5) {
            this.image.src = 'assets/images/bird-up.png'
        } else if (this.velocity.y < 0.5 && this.velocity.y > -1) {
            this.image.src = 'assets/images/bird-mid.png'
        } else if (this.velocity.y < -1) {
            this.image.src = 'assets/images/bird-down.png'
        }
    }

    private checkBounds(): void {

        if (!this.isOver && this.transform.position.y > 400 || this.transform.position.y < 0) {
            this.isOver = true
            this.transform.position = new Vector2(this.transform.position.x, 400)
            Game.Instance().updateGameState("GameOver")
        }

        if (this.transform.position.y > 400) {
            this.transform.position = new Vector2(this.transform.position.x, 400)
            //this.velocity.y = 0
        }
    }

    public setIsOver(isOver: boolean): void {
        this.isOver = isOver
    }

    public setVelocity(velocity: Vector2): void {
        this.velocity = velocity
    }

    public setGravity(gravity: number): void {
        this.gravity = gravity
    }

}