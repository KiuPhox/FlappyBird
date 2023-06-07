import { GameObject } from "../games/GameObject"
import { Vector2 } from "../utils/Vector2"
import { Component } from "./Component"

const g = 9.8

export class Physic extends Component {
    private gravityScale: number
    private velocity: Vector2

    constructor(gameObject: GameObject, gravityScale: number) {
        super(gameObject)
        this.gravityScale = gravityScale
    }
}