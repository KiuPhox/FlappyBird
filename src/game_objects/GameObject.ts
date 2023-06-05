import { Vector } from "../types/general"

export class GameObject {
    protected position: Vector
    protected objectImage: HTMLImageElement

    constructor() {
        this.objectImage = new Image()
    }

    get pos(): Vector {
        return this.position
    }

    set pos(pos: Vector) {
        this.position = pos
    }

    get width(): number {
        return this.image.width
    }

    get height(): number {
        return this.image.height
    }

    get image(): HTMLImageElement {
        return this.objectImage
    }
}