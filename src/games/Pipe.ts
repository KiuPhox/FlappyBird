import { Collider } from "../engine/components/Collider"
import { RigidBody } from "../engine/components/RigidBody"
import { Sprite } from "../engine/components/Sprite"
import { Vector2 } from "../utils/Vector2"
import { GameObject } from "./GameObject"


export class Pipe extends GameObject {
    private isCount: boolean
    private sprite: Sprite

    constructor() {
        super('Pipe')
        this.layer = "Background"
        this.name = "Pipe"
        this.transform.position = Vector2.zero

        this.sprite = new Sprite(this, 2)
        this.sprite.setSprite('assets/images/pipe-green.png')

        this.addComponent(this.sprite)
        this.addComponent(new Collider(this))

        const rb = new RigidBody(this, 0)
        rb.isStatic = true
        this.addComponent(rb)

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