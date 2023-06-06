import { Background } from "./game_objects/Background"
import { Bird } from "./game_objects/Bird"
import { PipeSpawner } from "./game_objects/PipeSpawner"
import { Render } from "./render"


let lastTime = window.performance.now()


class Game {
    private score: number
    private bird: Bird = new Bird()
    private bg: Background[] = Array.from({ length: 2 }, () => new Background())
    private pipeSpawner: PipeSpawner = new PipeSpawner({ x: this.bg[0].width + 2, y: 0 })
    private render: Render = Render.getInstance()

    // private ground: Ground[] = Array.from({ length: 2 }, () => new Ground())

    constructor() {
        this.start()
        this.loop()
    }

    private loop() {

        const time = window.performance.now()
        const delta = (time - lastTime) / 1000

        this.update(delta)

        lastTime = time

        window.requestAnimationFrame(() => {
            this.loop()
        })
    }

    private start(): void {
        this.score = 0
        this.bird.pos = { x: this.bg[0].width / 2 - this.bird.width / 2, y: this.bg[0].height / 2 - this.bird.width / 2 }
        this.bg[1].pos = { x: this.bg[0].width, y: 0 }


        this.render.add(this.bird, 0)
        this.render.add(this.bg[0], 1)
        this.render.add(this.bg[1], 1)

        document.addEventListener('keydown', (event: KeyboardEvent) => this.inputHandler(event))
        document.addEventListener('mousedown', (event: MouseEvent) => this.inputHandler(event))
        // this.ground[1].pos = { x: this.ground[1].width, y: this.bg[0].height - this.ground[1].height + 20 }
    }

    private update(delta: number): void {
        this.bird.move()
        this.bg[0].move()
        this.bg[1].move()
        // this.ground[0].move()
        // this.ground[1].move()

        if (this.bg[0].pos.x + this.bg[0].width < 0) {
            const temp = this.bg[0]
            this.bg[0] = this.bg[1]
            this.bg[1] = temp
            this.bg[1].pos = { x: this.bg[0].width, y: 0 }
        }

        this.pipeSpawner.update(delta)

        this.render.render()

        // if (this.ground[0].pos.x + this.ground[0].width < 0) {
        //     this.ground[0] = this.ground[1]
        //     this.ground[1] = new Ground()
        //     this.ground[1].pos = { x: this.ground[0].width, y: this.bg[0].height - this.ground[1].height + 20 }
        // }
    }

    // private render(): void {
    //     this.view.draw(this.bg[0])
    //     this.view.draw(this.bg[1])
    //     this.view.draw(this.bird)

    //     // this.view.draw(this.ground[0])
    //     // this.view.draw(this.ground[1])
    // }

    private inputHandler(event: KeyboardEvent | MouseEvent): void {
        if (event instanceof KeyboardEvent) {
            if (event.code === 'Space') {
                this.bird.jump()
            }
        } else if (event instanceof MouseEvent) {
            this.bird.jump()
        }
    }
}

new Game()


