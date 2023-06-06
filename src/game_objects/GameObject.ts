import { Vector } from "../types/general"

export class GameObject {
    private position: Vector
    protected objectImage: HTMLImageElement
    protected rotation: number

    constructor(position: Vector) {
        this.position = position
        this.objectImage = new Image()
    }

    get pos(): Vector {
        return this.position
    }

    set pos(pos: Vector) {
        this.position = pos
    }

    get rot(): number { return this.rotation }

    get image(): HTMLImageElement {
        return this.objectImage
    }

    get width(): number {
        return this.image.width
    }

    get height(): number {
        return this.image.height
    }
}