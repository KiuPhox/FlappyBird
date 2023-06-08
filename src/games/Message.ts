import { Sprite } from "../engine/components/Sprite"
import { Vector2 } from "../utils/Vector2"
import { GameObject } from "./GameObject"

export class Message extends GameObject {
    private sprite: Sprite
    constructor() {
        super()
        this.transform.position = new Vector2(0, 60)
        this.sprite = new Sprite(this, 0)
        this.sprite.setSprite("assets/images/message.png")
        this.addComponent(this.sprite)
    }
}