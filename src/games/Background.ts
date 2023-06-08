import { RigidBody } from "../engine/components/RigidBody"
import { Sprite } from "../engine/components/Sprite"
import { GameObject } from "./GameObject"

export default class Background extends GameObject {
    private sprite: Sprite
    private physic: RigidBody

    constructor() {
        super()
        this.sprite = new Sprite(this, 3)
        this.sprite.setSprite("assets/images/background-day.png")

        this.addComponent(new RigidBody(this, 0))
        this.addComponent(this.sprite)
    }
}