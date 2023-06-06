import { Vector } from "../types/general"
import { GameObject } from "./GameObject"

export class Ground extends GameObject {
    private velocity: Vector

    constructor() {
        super()
        this.velocity = { x: -1, y: 0 }
        this.objectImage.src = "assets/images/base.png"
    }

    public move(): void {
        this.pos.x += this.velocity.x
        this.pos.y += this.velocity.y
    }
}