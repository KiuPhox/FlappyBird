export class Vector2 {
    private _x: number
    private _y: number

    constructor(x: number, y: number) {
        this._x = x
        this._y = y
    }

    add(other: Vector2): Vector2 {
        return new Vector2(this._x + other._x, this._y + other._y)
    }

    sub(other: Vector2): Vector2 {
        return new Vector2(this._x - other._x, this._y - other._y)
    }

    mul(prod: number): Vector2 {
        return new Vector2(this._x * prod, this._y * prod)
    }

    static get zero(): Vector2 {
        return new Vector2(0, 0)
    }

    static get up(): Vector2 {
        return new Vector2(0, 1)
    }

    get x(): number { return this._x }

    get y(): number { return this._y }

    get magnitude(): number { return Math.sqrt(this.x * this.x + this.y * this.y) }
}