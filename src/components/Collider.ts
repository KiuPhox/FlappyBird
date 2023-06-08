import { GameObject } from "../games/GameObject"
import { Vector2 } from "../utils/Vector2"
import { Component } from "./Component"
import { Sprite } from "./Sprite"

export class Collider extends Component {
    private isTrigger: false

    constructor(gameObject: GameObject) {
        super(gameObject)
        this._name = "Collider"
    }

    get size(): Vector2 {
        const sprite = this.gameObject.getComponent('Sprite') as Sprite
        return new Vector2(sprite.width, sprite.height)
    }

    public update(): void {
        super.update()
    }

    public isTouch(col: Collider) {
        const thisPos = this.gameObject.transform.position
        const colPos = col.gameObject.transform.position

        return (
            thisPos.x + this.size.x / 2 > colPos.x - col.size.x / 2 &&
            thisPos.x - this.size.x / 2 < colPos.x + col.size.x / 2 &&
            thisPos.y + this.size.y / 2 > colPos.y - col.size.y / 2 &&
            thisPos.y - this.size.y / 2 < colPos.y + col.size.y / 2
        )
    }
}