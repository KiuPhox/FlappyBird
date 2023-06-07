import { Vector2 } from "../utils/Vector2"
import { Bird } from "./Bird"
import { GameObject } from "./GameObject"


export class Pipe extends GameObject {
    private velocity: Vector2
    private isCount: boolean

    constructor(position: Vector2, isCount: boolean) {
        super()
        this.transform.position = position
        this.velocity = new Vector2(-1.7, 0)
        this._image.src = "assets/images/pipe-green.png"
        this.isCount = isCount
    }

    public update(delta: number): void {
        this.transform.position = this.transform.position.add(this.velocity.mul(delta * 100))
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