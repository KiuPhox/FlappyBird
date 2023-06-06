import { Vector } from "../types/general"
import { GameObject } from "./GameObject"

export class Background extends GameObject {
    private velocity: Vector

    constructor() {
        super({ x: 0, y: 0 })
        this.velocity = { x: -0.5, y: 0 }
        this.objectImage.src = "assets/images/background-day.png"
    }

    public move(): void {
        this.pos.x += this.velocity.x
        this.pos.y += this.velocity.y
    }
}