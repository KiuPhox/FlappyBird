import { GameObject } from "../games/GameObject"

export class Component {
    protected _name: string
    protected gameObject: GameObject

    constructor(gameObject: GameObject) {
        this.gameObject = gameObject
    }

    get name(): string {
        return this._name
    }

    update(delta: number) {
        // Update
    }
}