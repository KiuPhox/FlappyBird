import { Vector2 } from "../utils/Vector2"
import { GameObject } from "./GameObject"

export class Background extends GameObject {
    private velocity: Vector2

    constructor() {
        super()
        this.velocity = new Vector2(-0.5, 0)
        this._image.src = "assets/images/background-day.png"
    }

    public update(delta: number): void {
        this.transform.position = this.transform.position.add(this.velocity.mul(delta * 100))
    }
}