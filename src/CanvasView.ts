import { GameObject } from "./game_objects/GameObject"

export class CanvasView {
    canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D | null

    public draw(object: GameObject): void {
        this.context?.drawImage(object.image, object.pos.x, object.pos.y, object.width, object.height)
    }

    constructor(width: number, height: number, canvasName: string) {
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasName)
        this.canvas.width = width
        this.canvas.height = height
        this.context = this.canvas.getContext('2d')
    }

    public clear(): void {
        this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}