import { Render } from "../Render"
import { Collider } from "../components/Collider"
import { Physic } from "../components/Physic"
import { Sprite } from "../components/Sprite"
import { Vector2 } from "../utils/Vector2"
import { GameObject } from "./GameObject"


export class Pipe extends GameObject {
    private isCount: boolean
    private sprite: Sprite
    private collider: Collider
    private physic: Physic

    constructor(position: Vector2, isCount: boolean) {
        super()
        this.transform.position = position

        this.sprite = new Sprite(this, 2)
        this.sprite.setSprite('assets/images/pipe-green.png')
        this.addComponent(this.sprite)

        this.collider = new Collider(this)
        this.addComponent(this.collider)

        this.physic = new Physic(this, 0)
        this.physic.velocity = new Vector2(-1.7, 0)
        this.addComponent(this.physic)

        this.isCount = isCount
        Render.Instance().add(this)
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