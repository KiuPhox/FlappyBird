import { GameObject } from "../games/GameObject"

export class Component {
    protected _name: string
    protected _gameObject: GameObject

    constructor(gameObject: GameObject) {
        this._gameObject = gameObject
    }

    get gameObject(): GameObject {
        return this._gameObject
    }

    get name(): string {
        return this._name
    }

    update(delta: number) {
        // Update
    }
}