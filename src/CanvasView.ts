import { UIManager } from "./UI/UIManager"
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
        this.canvas.addEventListener('click', this.handleClick)
        this.context = this.canvas.getContext('2d')
    }

    get width(): number { return this.canvas.width }
    get height(): number { return this.canvas.height }

    public static Instance(): CanvasView {
        if (!CanvasView.instance) {
            CanvasView.instance = new CanvasView('game')
        }

        return CanvasView.instance
    }

    public draw(gameObject: GameObject): void {
        if (!this.context) return

        if (!gameObject.active) return

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

    private handleClick(event: MouseEvent): void {
        const { offsetX, offsetY } = event

        for (const button of UIManager.Instance().buttons) {
            if (!button.active) return

            if (offsetX >= button.transform.position.x && offsetX <= button.transform.position.x + button.width && offsetY >= button.transform.position.y && offsetY <= button.transform.position.y + button.height) {
                button.onClick()
            }
        }
    }
}