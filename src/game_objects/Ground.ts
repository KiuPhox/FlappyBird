import { Vector } from "../types/general"
import { GameObject } from "./GameObject"

export class Ground extends GameObject {
    private velocity: Vector

    constructor() {
        super()
        this.velocity = { x: -1.7, y: 0 }
        this.objectImage.src = "assets/images/base.png"
    }

    public update(delta: number): void {
        this.pos.x += this.velocity.x * delta * 100
        this.pos.y += this.velocity.y * delta * 100
    }
}