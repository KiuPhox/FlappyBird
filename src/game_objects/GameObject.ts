import { Vector } from "../types/general"

export class GameObject {
    private position: Vector
    protected objectImage: HTMLImageElement
    private rotation: number

    constructor() {
        this.position = { x: 0, y: 0 }
        this.rotation = 0
        this.objectImage = new Image()
    }

    get pos(): Vector {
        return this.position
    }

    set pos(pos: Vector) {
        this.position = pos
    }

    set rot(rotation: number) {
        this.rotation = rotation
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

    public collider(otherObject: GameObject): boolean {
        return (
            this.position.x < otherObject.pos.x + otherObject.width &&
            this.position.x + this.width > otherObject.pos.x &&
            this.position.y < otherObject.pos.y + otherObject.height &&
            this.position.y + this.height > otherObject.pos.y
        )
    }
}