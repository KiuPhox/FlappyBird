import { Render } from "../Render"
import { Sprite } from "../components/Sprite"
import { GameObject } from "../games/GameObject"
import { UIManager } from "./UIManager"

export abstract class Button extends GameObject {
    private sprite: Sprite

    constructor(src: string) {
        super()
        this.sprite = new Sprite(this, 0)
        this.sprite.setSprite(src)
        this.addComponent(this.sprite)
        Render.Instance().add(this)
        UIManager.Instance().add(this)
    }

    get width(): number { return this.sprite.width * this.transform.scale }
    get height(): number { return this.sprite.height * this.transform.scale }

    abstract onClick(): void
}