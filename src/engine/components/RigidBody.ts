import { GameObject } from "../../games/GameObject"
import { Time } from "../system/Time"
import { Vector2 } from "../../utils/Vector2"
import { Component } from "./Component"

export enum ForceMode {
    Force,
    VelocityChange
}

export class RigidBody extends Component {
    private _gravityScale: number
    private _velocity: Vector2

    constructor(gameObject: GameObject, gravityScale: number) {
        super(gameObject)
        this._name = 'RigidBody'
        this._gravityScale = gravityScale
        this._velocity = Vector2.zero
    }

    set velocity(v: Vector2) {
        this._velocity = v
    }

    get velocity(): Vector2 {
        return this._velocity
    }

    get gravityScale(): number {
        return this._gravityScale
    }

    set gravityScale(v: number) {
        this._gravityScale = v
    }

    public addForce(forceVector: Vector2, forceMode: ForceMode = ForceMode.Force): void {
        if (forceMode == ForceMode.Force) {
            this._velocity = this._velocity.sub(forceVector)
        } else if (forceMode == ForceMode.VelocityChange) {
            this._velocity = new Vector2(forceVector.x, -forceVector.y)
        }
    }

    public update(): void {
        if (this._gravityScale) {
            this._velocity = this._velocity.add(new Vector2(0, this._gravityScale).mul(Time.deltaTime * 100))
        }

        this._gameObject.transform.position = this._gameObject.transform.position.add(this._velocity.mul(Time.deltaTime * 100))
    }
}