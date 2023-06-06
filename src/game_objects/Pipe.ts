import { Vector } from "../types/general"
import { GameObject } from "./GameObject"

export class Pipe extends GameObject {
    private velocity: Vector

    constructor(position: Vector = { x: 0, y: 0 }) {
        super(position)
        this.rotation = 0
        this.velocity = { x: 0, y: 0 }
        this.objectImage.src = "assets/images/pipe-green.png"
    }

    public setRotation(degrees: number): void {
        this.rotation = degrees * (Math.PI / 180)
    }

    public setVelocity(velocity: Vector): void {
        this.velocity = velocity
    }

    public move(): void {
        this.pos.x += this.velocity.x
        this.pos.y += this.velocity.y
    }
}