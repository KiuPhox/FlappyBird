import { Render } from "../Render"
import { Sprite } from "../components/Sprite"
import { Vector2 } from "../utils/Vector2"
import { GameObject } from "./GameObject"


export class Pipe extends GameObject {
    private velocity: Vector2
    private isCount: boolean
    private sprite: Sprite

    constructor(position: Vector2, isCount: boolean) {
        super()
        this.transform.position = position
        this.velocity = new Vector2(-1.7, 0)
        this.sprite = new Sprite(this, 2)
        this.sprite.setSprite('assets/images/pipe-green.png')
        this.addComponent(this.sprite)
        this.isCount = isCount
        Render.getInstance().add(this)
    }

    public update(delta: number): void {
        this.transform.position = this.transform.position.add(this.velocity.mul(delta * 100))
    }

    // public collider(otherObject: GameObject): boolean {
    //     if (otherObject instanceof Bird) {
    //         return otherObject.collider(this)
    //     }
    //     return super.collider(otherObject)
    // }


    public setIsCount(value: boolean) {
        this.isCount = value
    }

    public getIsCount(): boolean {
        return this.isCount
    }
}