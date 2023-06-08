import { Physic } from "../components/Physic"
import { Sprite } from "../components/Sprite"
import { GameObject } from "./GameObject"

export default class Background extends GameObject {
    private sprite: Sprite
    private physic: Physic

    constructor() {
        super()
        this.sprite = new Sprite(this, 3)
        this.sprite.setSprite("assets/images/background-day.png")

        this.addComponent(new Physic(this, 0))
        this.addComponent(this.sprite)
    }
}