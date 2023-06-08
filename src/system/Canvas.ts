import { UIManager } from "../UI/UIManager"
import { Sprite } from "../components/Sprite"
import { Vector2 } from "../utils/Vector2"

export class Canvas {

    private static canvas: HTMLCanvasElement
    private static context: CanvasRenderingContext2D | null
    public static size: Vector2 = new Vector2(288, 500)
    private static sprites: Sprite[] = []

    public static init() {
        this.canvas = <HTMLCanvasElement>document.getElementById('game')
        this.canvas.width = Canvas.size.x
        this.canvas.height = Canvas.size.y
        this.canvas.addEventListener('click', Canvas.handleClick)
        Canvas.context = this.canvas.getContext('2d')
    }

    public static draw(): void {
        if (!Canvas.context) return
        for (const sprite of this.sprites) {
            const gameObject = sprite.gameObject

            if (!gameObject.active) continue

            const canvasCenterX = this.size.x / 2
            const canvasCenterY = this.size.y / 2
            const spriteCenterX = sprite.width / 2 * gameObject.transform.scale
            const spriteCenterY = sprite.height / 2 * gameObject.transform.scale

            const drawX = gameObject.transform.position.x + canvasCenterX
            const drawY = gameObject.transform.position.y + canvasCenterY

            Canvas.context.save()
            Canvas.context.translate(drawX, drawY)
            Canvas.context.rotate(gameObject.transform.rotation)
            Canvas.context.drawImage(
                sprite.image,
                -spriteCenterX,
                -spriteCenterY,
                sprite.width * gameObject.transform.scale,
                sprite.height * gameObject.transform.scale
            )
            Canvas.context.restore()
        }
    }

    public static registerSprite(sprite: Sprite): void {
        Canvas.sprites.push(sprite)
        Canvas.sprites.sort((a, b) => (b.order - a.order))
    }

    private static handleClick(event: MouseEvent): void {
        const mousePos = new Vector2(event.offsetX - Canvas.size.x / 2, event.offsetY - Canvas.size.y / 2)

        for (const button of UIManager.buttons) {
            if (!button.active) return

            const buttonPos = button.transform.position

            if (mousePos.x >= buttonPos.x - button.width / 2 &&
                mousePos.x <= buttonPos.x + button.width / 2 &&
                mousePos.y >= buttonPos.y - button.height / 2 &&
                mousePos.y <= buttonPos.y + button.height / 2) {
                button.onClick()
            }
        }
    }
}