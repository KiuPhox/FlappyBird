import { Vector } from "../types/general"

export class GameObject {
    protected position: Vector
    protected objectImage: HTMLImageElement

    constructor() {
        this.objectImage = new Image()
    }

    get width(): number {
        return this.image.width
    }

    get height(): number {
        return this.image.height
    }

    get pos(): Vector {
        return this.position
    }

    get image(): HTMLImageElement {
        return this.objectImage
    }
}