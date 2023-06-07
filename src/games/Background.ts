import { Render } from "../Render"
import { Sprite } from "../components/Sprite"
import { Vector2 } from "../utils/Vector2"
import { GameObject } from "./GameObject"

export class Background extends GameObject {
    private velocity: Vector2
    private sprite: Sprite

    constructor() {
        super()
        this.velocity = new Vector2(-0.5, 0)
        this.sprite = new Sprite(this, 3)
        this.sprite.setSprite("assets/images/background-day.png")
        this.addComponent(this.sprite)
        Render.getInstance().add(this)
    }

    public update(delta: number): void {
        this.transform.position = this.transform.position.add(this.velocity.mul(delta * 100))
    }
}