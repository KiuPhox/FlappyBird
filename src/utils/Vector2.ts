export class Vector2 {
    private _x: number
    private _y: number

    constructor(x: number, y: number) {
        this._x = x
        this._y = y
    }

    get x(): number {
        return this._x
    }

    get y(): number {
        return this._y
    }

    add(other: Vector2): Vector2 {
        return new Vector2(this.x + other.x, this.y + other.y)
    }

    sub(other: Vector2): Vector2 {
        return new Vector2(this.x - other.x, this.y - other.y)
    }

    mul(prod: number): Vector2 {
        return new Vector2(this.x * prod, this.y * prod)
    }

    static get zero(): Vector2 {
        return new Vector2(0, 0)
    }
}