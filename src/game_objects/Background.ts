import { Vector } from "../types/general"
import { GameObject } from "./GameObject"

export class Background extends GameObject {
    private velocity: Vector

    constructor() {
        super()
        this.velocity = { x: -0.5, y: 0 }
        this.objectImage.src = "assets/images/background-day.png"
    }

    public update(delta: number): void {
        this.pos.x += this.velocity.x * delta * 100
        this.pos.y += this.velocity.y * delta * 100
    }
}