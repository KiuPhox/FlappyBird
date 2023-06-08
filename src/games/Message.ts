import { Sprite } from "../engine/components/Sprite"
import { GameObject } from "./GameObject"

export class Message extends GameObject {
    private sprite: Sprite
    constructor() {
        super()
        this.sprite = new Sprite(this, 0)
        this.sprite.setSprite("assets/images/message.png")
        this.addComponent(this.sprite)
    }
}