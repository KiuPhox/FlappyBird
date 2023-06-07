import { Vector2 } from "../utils/Vector2"

export type Transform = {
    position: Vector2
    rotation: number
    scale: number
}


export class GameObject {
    private _transform: Transform
    protected _image: HTMLImageElement

    constructor() {
        this._transform = {
            position: Vector2.zero,
            rotation: 0,
            scale: 1
        }

        this._image = new Image()
    }

    get transform(): Transform { return this._transform }

    get center(): Vector2 {
        return new Vector2(this.transform.position.x + this._image.width / 2, this.transform.position.y + this._image.height / 2)
    }

    get image(): HTMLImageElement { return this._image }

    get width(): number { return this.image.width }

    get height(): number { return this.image.height }

    public collider(otherObject: GameObject): boolean {
        return (
            this.transform.position.x < otherObject.transform.position.x + otherObject.width &&
            this.transform.position.x + this.width > otherObject.transform.position.x &&
            this.transform.position.y < otherObject.transform.position.y + otherObject.height &&
            this.transform.position.y + this.height > otherObject.transform.position.y
        )
    }
}