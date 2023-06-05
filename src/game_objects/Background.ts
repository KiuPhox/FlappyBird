import { Vector } from "../types/general"
import { GameObject } from "./GameObject"

export class Background extends GameObject {
    private speed: Vector

    constructor() {
        super()
        this.speed = { x: -1, y: 0 }
        this.position = { x: 0, y: 0 }
        this.objectImage.src = "assets/images/background-day.png"
    }

    move(): void {
        this.pos.x += this.speed.x
        this.pos.y += this.speed.y
    }
}