
import { Render } from "../Render"
import { Sprite } from "../components/Sprite"
import { GameObject } from "./GameObject"

export class GameOver extends GameObject {

    private sprite: Sprite

    constructor() {
        super()
        this.sprite = new Sprite(this, 0)

        this.sprite.setSprite("assets/images/gameover.png")
        this.addComponent(this.sprite)
        Render.getInstance().add(this)
    }
}