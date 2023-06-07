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

    public update(delta: number): void {
        super.update(delta)
    }

    public isTouch(col: Collider) {
        return (
            this.gameObject.transform.position.x < col.gameObject.transform.position.x + col.size.x &&
            this.gameObject.transform.position.x + this.size.x > col.gameObject.transform.position.x &&
            this.gameObject.transform.position.y < col.gameObject.transform.position.y + col.size.y &&
            this.gameObject.transform.position.y + this.size.y > col.gameObject.transform.position.y
        )
    }
}