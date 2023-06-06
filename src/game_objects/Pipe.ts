import { Vector } from "../types/general"
import { Bird } from "./Bird"
import { GameObject } from "./GameObject"


export class Pipe extends GameObject {
    private velocity: Vector

    constructor(position: Vector) {
        super()
        this.pos = position
        this.velocity = { x: -1, y: 0 }
        this.objectImage.src = "assets/images/pipe-green.png"
    }

    public move(): void {
        this.pos.x += this.velocity.x
        this.pos.y += this.velocity.y
    }

    public collider(otherObject: GameObject): boolean {
        if (otherObject instanceof Bird) {
            return otherObject.collider(this)
        }
        return super.collider(otherObject)
    }
}