import { Render } from "../Render"
import { Physic } from "../components/Physic"
import { Sprite } from "../components/Sprite"
import { Vector2 } from "../utils/Vector2"
import { GameObject } from "./GameObject"

export default class Background extends GameObject {
    private sprite: Sprite
    private physic: Physic

    constructor() {
        super()
        this.sprite = new Sprite(this, 3)
        this.sprite.setSprite("assets/images/background-day.png")

        this.physic = new Physic(this, 0)
        this.physic.velocity = new Vector2(-0.5, 0)

        this.addComponent(this.physic)
        this.addComponent(this.sprite)

        Render.Instance().add(this)
    }
}