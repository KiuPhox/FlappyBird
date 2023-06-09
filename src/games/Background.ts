import { RigidBody } from "../engine/components/RigidBody"
import { Sprite } from "../engine/components/Sprite"
import { GameObject } from "../engine/system/GameObject"

export default class Background extends GameObject {
    private sprite: Sprite

    constructor() {
        super('Background')
        this.sprite = new Sprite(this, 3)
        this.sprite.setSprite("assets/images/background-day.png")

        this.addComponent(new RigidBody(this, 0))
        this.addComponent(this.sprite)
    }
}