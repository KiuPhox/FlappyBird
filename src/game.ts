import { Score } from "./Score"
import { Background } from "./game_objects/Background"
import { Bird } from "./game_objects/Bird"
import { GameOver } from "./game_objects/GameOver"
import { Ground } from "./game_objects/Ground"
import { Message } from "./game_objects/Message"
import { PipeSpawner } from "./game_objects/PipeSpawner"
import { Render } from "./render"
import { GameState, GameStateUpdateHandler } from "./types/general"

const FRAME_RATE = 90

export class Game {
    private bird: Bird = new Bird()
    private bg: Background[] = Array.from({ length: 2 }, () => new Background())
    private pipeSpawner: PipeSpawner = new PipeSpawner({ x: this.bg[0].width + 2, y: 0 }, this.bird)
    private render: Render = Render.getInstance()
    private gameState: GameState
    private gameOver: GameOver = new GameOver()
    private message: Message = new Message()
    private ground: Ground[] = Array.from({ length: 2 }, () => new Ground())
    private static instance: Game

    private gameStateUpdateHandlers: GameStateUpdateHandler[] = []

    private fps: number
    private frameTime: number
    private lastFrameTime: number

    public static getInstance(): Game {
        if (!Game.instance) {
            Game.instance = new Game()
        }
        return Game.instance
    }
    // private ground: Ground[] = Array.from({ length: 2 }, () => new Ground())

    constructor() {
        this.fps = FRAME_RATE
        this.frameTime = 1000 / this.fps
        this.lastFrameTime = 0
        this.start()
        this.loop()
    }

    private loop() {

        const time = window.performance.now()
        const deltaTime = time - this.lastFrameTime

        if (deltaTime >= this.frameTime) {
            this.update(deltaTime / 1000)
            this.lastFrameTime = time
            this.render.render()
        }
        // const time = window.performance.now()
        // const delta = (time - lastTime) / 1000

        // this.update(delta)
        // this.render.render()

        window.requestAnimationFrame(() => {
            this.loop()
        })
    }

    private start(): void {

        this.updateGameState('Idle')

        this.bg[1].pos = { x: this.bg[0].width, y: 0 }
        this.ground[0].pos = { x: this.ground[0].pos.x, y: 420 }
        this.ground[1].pos = { x: this.ground[0].width, y: 420 }
        this.gameOver.pos = { x: this.bg[0].width / 2 - this.gameOver.width / 2, y: this.bg[0].height / 2 - this.gameOver.height / 2 }
        this.message.pos = { x: this.bg[0].width / 2 - this.message.width / 2, y: this.bg[0].height / 2 - this.message.height / 2 + 50 }

        this.render.add(this.bird, 1)
        this.render.add(this.ground[0], 1)
        this.render.add(this.ground[1], 1)
        this.render.add(this.bg[0], 3)
        this.render.add(this.bg[1], 3)

        document.addEventListener('keydown', (event: KeyboardEvent) => this.inputHandler(event))
        document.addEventListener('mousedown', (event: MouseEvent) => this.inputHandler(event))

        this.pipeSpawner = new PipeSpawner({ x: this.bg[0].width + 2, y: 0 }, this.bird)

        // this.ground[1].pos = { x: this.ground[1].width, y: this.bg[0].height - this.ground[1].height + 20 }
    }

    private update(delta: number): void {
        this.bird.update(delta)

        if (this.gameState == "Start" || this.gameState == "Idle") {
            this.bg[0].update(delta)
            this.bg[1].update(delta)
            this.ground[0].update(delta)
            this.ground[1].update(delta)


            if (this.bg[0].pos.x + this.bg[0].width <= 0) {
                const temp = this.bg[0]
                this.bg[0] = this.bg[1]
                this.bg[1] = temp
                this.bg[1].pos = { x: this.bg[0].width, y: 0 }
            }

            if (this.ground[0].pos.x + this.ground[0].width <= 0) {
                const temp = this.ground[0]
                this.ground[0] = this.ground[1]
                this.ground[1] = temp
                this.ground[1].pos = { x: this.ground[0].width, y: 420 }
            }

        }

        if (this.gameState == "Start") {
            this.pipeSpawner.update(delta)
        }
    }

    private inputHandler(event: KeyboardEvent | MouseEvent): void {
        if (this.gameState == "Start") {
            if (event instanceof KeyboardEvent) {
                if (event.code === 'Space') {
                    this.bird.jump()
                }
            } else if (event instanceof MouseEvent) {
                this.bird.jump()
            }
        } else if (this.gameState == "Idle") {
            if (event instanceof KeyboardEvent) {
                if (event.code === 'Space') {
                    this.bird.jump()
                    this.updateGameState("Start")
                }
            } else if (event instanceof MouseEvent) {
                this.bird.jump()
                this.updateGameState("Start")
            }
        } else if (this.gameState == "GameOver") {
            if (event instanceof KeyboardEvent) {
                if (event.code === 'Space') {
                    this.updateGameState("Idle")
                }
            } else if (event instanceof MouseEvent) {
                this.updateGameState("Idle")
            }
        }
    }

    public getGameState(): string {
        return this.gameState
    }

    public updateGameState(gameState: GameState): void {
        if (this.gameState === gameState) return

        this.gameState = gameState

        switch (this.gameState) {
            case "Idle":
                this.render.remove(this.gameOver)
                this.pipeSpawner.clear()

                this.bird.pos = { x: this.bg[0].width / 2 - this.bird.width / 2, y: this.bg[0].height / 2 - this.bird.width / 2 }
                this.bird.setVelocity({ x: 0, y: 0 })
                this.bird.setGravity(0)

                this.bird.setIsOver(false)

                Score.getInstance().reset()

                this.render.add(this.message, 0)

                break
            case "Start":
                this.render.remove(this.message)
                this.bird.setGravity(0.15)
                //this.render.clear()
                //this.start()
                break
            case "GameOver":
                this.render.add(this.gameOver, 0)
                break
        }

        for (const handler of this.gameStateUpdateHandlers) {
            handler(gameState)
        }
    }

    public addOnGameStateUpdate(handler: GameStateUpdateHandler): void {
        this.gameStateUpdateHandlers.push(handler)
    }
}

Game.getInstance()


