import { CanvasView } from "./CanvasView"
import { Background } from "./game_objects/Background"
import { Bird } from "./game_objects/Bird"

class Game {
    private score: number
    private bird: Bird = new Bird()
    private bg: Background = new Background()
    private view: CanvasView = new CanvasView(this.bg.width, this.bg.height, 'game')

    constructor() {
        this.score = 0
        this.loop()
    }

    private loop() {


        this.bird.move()
        //this.bg.move()

        this.view.draw(this.bg)
        this.view.draw(this.bird)


        window.requestAnimationFrame(() => {
            this.loop()
        })
    }
}


new Game()


