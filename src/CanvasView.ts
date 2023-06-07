import { Sprite } from "./components/Sprite"
import { GameObject } from "./games/GameObject"


export class CanvasView {
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D | null
    private static instance: CanvasView

    constructor(canvasName: string) {
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasName)
        this.canvas.width = 288
        this.canvas.height = 500
        this.context = this.canvas.getContext('2d')
    }

    public static getInstance(): CanvasView {
        if (!CanvasView.instance) {
            CanvasView.instance = new CanvasView('game')
        }

        return CanvasView.instance
    }

    public draw(gameObject: GameObject): void {
        if (!this.context) return

        const sprite = gameObject.getComponent('Sprite') as Sprite

        this.context.save()
        this.context.translate(gameObject.transform.position.x + sprite.width / 2, gameObject.transform.position.y + sprite.height / 2)
        this.context.rotate(gameObject.transform.rotation)
        this.context.drawImage(sprite.image, -sprite.width / 2, -sprite.height / 2, sprite.width * gameObject.transform.scale, sprite.height * gameObject.transform.scale)
        this.context.restore()
    }

    public clear(): void {
        this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}