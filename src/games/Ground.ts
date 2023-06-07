import { Render } from "../Render"
import { Collider } from "../components/Collider"
import { Sprite } from "../components/Sprite"
import { Vector2 } from "../utils/Vector2"
import { Bird } from "./Bird"
import { GameObject } from "./GameObject"

export class Ground extends GameObject {
    private velocity: Vector2
    private sprite: Sprite
    private collider: Collider
    private bird: Bird
    private birdCollider: Collider

    constructor(bird: Bird) {
        super()
        this.velocity = new Vector2(-1.7, 0)
        this.sprite = new Sprite(this, 1)
        this.sprite.setSprite("assets/images/base.png")
        this.addComponent(this.sprite)

        this.collider = new Collider(this)
        this.addComponent(this.collider)

        this.birdCollider = bird.getComponent('Bird') as Collider

        Render.getInstance().add(this)
    }

    public update(delta: number): void {
        this.transform.position = this.transform.position.add(this.velocity.mul(delta * 100))
    }
}