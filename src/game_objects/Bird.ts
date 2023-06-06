import { Vector } from "../types/general"
import { GameObject } from "./GameObject"

export class Bird extends GameObject {
    private velocity: Vector
    private gravity: number
    private jumpStrength: number

    constructor() {
        super()
        this.velocity = { x: 0, y: 0 }
        this.position = { x: 0, y: 0 }
        this.gravity = 0.05
        this.objectImage.src = "assets/images/bird.png"
        this.jumpStrength = 2.5
    }

    public move(): void {
        this.applyGravity()
        this.updatePosition()
    }

    public jump(): void {
        this.velocity.y = -this.jumpStrength
    }

    private applyGravity(): void {
        this.velocity.y += this.gravity
    }

    private updatePosition(): void {
        this.pos.x += this.velocity.x
        this.pos.y += this.velocity.y
    }
}