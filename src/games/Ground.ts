import { Vector2 } from "../utils/Vector2"
import { GameObject } from "./GameObject"

export class Ground extends GameObject {
    private velocity: Vector2

    constructor() {
        super()
        this.velocity = new Vector2(-1.7, 0)
        this._image.src = "assets/images/base.png"
    }

    public update(delta: number): void {
        this.transform.position.add(this.velocity.mul(delta * 100))
    }
}