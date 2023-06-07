import { Render } from "../Render"
import { Collider } from "../components/Collider"
import { Physic } from "../components/Physic"
import { Sprite } from "../components/Sprite"
import { Vector2 } from "../utils/Vector2"
import { Bird } from "./Bird"
import { GameObject } from "./GameObject"

export class Ground extends GameObject {
    private sprite: Sprite
    private collider: Collider
    private bird: Bird
    private birdCollider: Collider
    private physic: Physic

    constructor(bird: Bird) {
        super()

        this.sprite = new Sprite(this, 1)
        this.sprite.setSprite("assets/images/base.png")
        this.collider = new Collider(this)
        this.birdCollider = bird.getComponent('Bird') as Collider
        this.physic = new Physic(this, 0)
        this.physic.velocity = new Vector2(-1.7, 0)

        this.addComponent(this.physic)
        this.addComponent(this.sprite)
        this.addComponent(this.collider)


        Render.getInstance().add(this)
    }
}