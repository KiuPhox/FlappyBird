import { GameObject } from "./games/GameObject"


export class CanvasView {
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D | null
    private static instance: CanvasView

    constructor(canvasName: string) {
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasName)
        this.canvas.width = 300
        this.canvas.height = 500
        this.context = this.canvas.getContext('2d')
    }

    public static getInstance(): CanvasView {
        if (!CanvasView.instance) {
            CanvasView.instance = new CanvasView('game')
        }

        return CanvasView.instance
    }

    public draw(object: GameObject): void {
        if (!this.context) return

        this.context.save()
        this.context.translate(object.transform.position.x + object.width / 2, object.transform.position.y + object.height / 2)
        this.context.rotate(object.transform.rotation)
        this.context.drawImage(object.image, -object.width / 2, -object.height / 2, object.width * object.transform.scale, object.height * object.transform.scale)
        this.context.restore()
    }

    public clear(): void {
        this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}