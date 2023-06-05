import { CanvasView } from "./CanvasView"
import { Background } from "./game_objects/Background"
import { Bird } from "./game_objects/Bird"

class Game {
    private score: number
    private bird: Bird = new Bird()
    private bg: Background[] = Array.from({ length: 2 }, () => new Background())
    private view: CanvasView = new CanvasView(this.bg[0].width, this.bg[0].height, 'game')

    constructor() {
        this.start()
        this.loop()
    }

    private loop() {
        this.update()
        this.render()

        window.requestAnimationFrame(() => {
            this.loop()
        })
    }

    private start(): void {
        this.score = 0
        this.bird.pos = { x: this.bg[0].width / 2 - this.bird.width / 2, y: this.bg[0].height / 2 - this.bird.width / 2 }
        this.bg[1].pos = { x: this.bg[0].width, y: 0 }
    }

    private update(): void {
        this.bird.move()
        this.bg[0].move()
        this.bg[1].move()

        if (this.bg[0].pos.x + this.bg[0].width < 0) {
            this.bg[0] = this.bg[1]
            this.bg[1] = new Background()
            this.bg[1].pos = { x: this.bg[0].width, y: 0 }
        }
    }

    render(): void {
        this.view.draw(this.bg[0])
        this.view.draw(this.bg[1])
        this.view.draw(this.bird)
    }
}


new Game()


