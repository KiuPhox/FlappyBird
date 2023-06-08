import { Collider } from "../engine/components/Collider"
import { RigidBody } from "../engine/components/RigidBody"
import { Sprite } from "../engine/components/Sprite"
import { GameObject } from "./GameObject"

export class Ground extends GameObject {
    constructor() {
        super()

        this.name = "Ground"
        this.layer = "Background"

        const sprite = new Sprite(this, 1)
        sprite.setSprite("assets/images/base.png")
        this.addComponent(sprite)
        this.addComponent(new Collider(this))

        const rb = new RigidBody(this, 0)
        rb.isStatic = true
        this.addComponent(rb)
    }
}