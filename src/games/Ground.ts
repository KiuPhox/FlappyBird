import { Collider } from "../engine/components/Collider"
import { RigidBody } from "../engine/components/RigidBody"
import { Sprite } from "../engine/components/Sprite"
import { GameObject } from "./GameObject"

export class Ground extends GameObject {
    private collider: Collider

    constructor() {
        super()

        this.name = "Ground"

        const sprite = new Sprite(this, 1)
        sprite.setSprite("assets/images/base.png")

        this.addComponent(sprite)

        this.collider = new Collider(this)
        this.addComponent(this.collider)
        this.addComponent(new RigidBody(this, 0))
    }
}