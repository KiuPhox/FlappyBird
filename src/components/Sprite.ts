import { GameObject } from "../games/GameObject"
import { Component } from "./Component"

export class Sprite extends Component {
    private _image: HTMLImageElement
    private _order: number

    constructor(gameObject: GameObject, order: number) {
        super(gameObject)
        this._image = new Image()
        this._order = order
        this._name = 'Sprite'
    }

    public setSprite(sprite: string) {
        this._image.src = sprite
    }

    get order(): number {
        return this._order
    }

    get width(): number { return this._image.width }

    get height(): number { return this._image.height }


    get image(): HTMLImageElement { return this._image }
}