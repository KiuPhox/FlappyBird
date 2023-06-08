export class Vector2 {
    public x: number
    public y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
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