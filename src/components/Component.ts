import { GameObject } from "../games/GameObject"

export class Component {
    private gameObject: GameObject

    constructor(gameObject: GameObject) {
        this.gameObject = gameObject
    }

    update(delta: number) {
        // Update
    }
}