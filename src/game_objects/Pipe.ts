import { Vector } from "../types/general"
import { Bird } from "./Bird"
import { GameObject } from "./GameObject"


export class Pipe extends GameObject {
    private velocity: Vector
    private isCount: boolean

    constructor(position: Vector, isCount: boolean) {
        super()
        this.pos = position
        this.velocity = { x: -1, y: 0 }
        this.objectImage.src = "assets/images/pipe-green.png"
        this.isCount = isCount
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


    public setIsCount(value: boolean) {
        this.isCount = value
    }

    public getIsCount(): boolean {
        return this.isCount
    }
}