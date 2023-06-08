import { Collider } from "../components/Collider"
import { Physic } from "../components/Physic"
import { Sprite } from "../components/Sprite"
import { Vector2 } from "../utils/Vector2"
import { GameObject } from "./GameObject"


export class Pipe extends GameObject {
    private isCount: boolean
    private sprite: Sprite

    constructor() {
        super()
        this.transform.position = Vector2.zero

        this.sprite = new Sprite(this, 2)
        this.sprite.setSprite('assets/images/pipe-green.png')
        this.addComponent(this.sprite)

        this.addComponent(new Collider(this))

        this.addComponent(new Physic(this, 0))
        this.isCount = true
    }

    get center(): Vector2 {
        return new Vector2(this.transform.position.x + this.sprite.width / 2, this.transform.position.y + this.sprite.height / 2)
    }


    public setIsCount(value: boolean) {
        this.isCount = value
    }

    public getIsCount(): boolean {
        return this.isCount
    }
}