import { GameObject } from "../system/GameObject"
import { Canvas } from "../system/Canvas"
import { Component } from "./Component"

export class Sprite extends Component {
    private _image: HTMLImageElement
    public order: number
    public flipX: boolean
    public flipY: boolean

    constructor(gameObject: GameObject, _order: number) {
        super(gameObject)
        this._image = new Image()
        this.order = _order
        this.name = 'Sprite'
        this.flipX = false
        this.flipY = false

        Canvas.registerSprite(this)
    }

    public setSprite(path: string) {
        this._image.src = path
    }

    get width(): number { return this._image.width }

    get height(): number { return this._image.height }

    get image(): HTMLImageElement { return this._image }
}