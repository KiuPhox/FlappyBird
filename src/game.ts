import { ScoreManager } from "./ScoreManager"
import { Background } from "./games/Background"
import { Bird } from "./games/Bird"
import { GameOver } from "./games/GameOver"
import { Ground } from "./games/Ground"
import { Message } from "./games/Message"
import { PipeSpawner } from "./games/PipeSpawner"
import { Render } from "./Render"
import { GameState, GameStateUpdateHandler } from "./types/general"
import { Vector2 } from "./utils/Vector2"
import { Sprite } from "./components/Sprite"

const FRAME_RATE = 120

export class Game {
    private bird: Bird
    private bg: Background[]
    private pipeSpawner: PipeSpawner
    private render: Render
    private gameState: GameState
    private gameOver: GameOver
    private message: Message
    private ground: Ground[]

    private static instance: Game
    private gameStateUpdateHandlers: GameStateUpdateHandler[] = []

    private fps: number
    private frameTime: number
    private lastFrameTime: number

    private bgSprite: Sprite
    private groundSprite: Sprite
    private birdSprite: Sprite
    private gameOverSprite: Sprite

    public static Instance(): Game {
        if (!Game.instance) {
            Game.instance = new Game()
        }
        return Game.instance
    }

    constructor() {
        this.fps = FRAME_RATE
        this.frameTime = 1000 / this.fps
        this.lastFrameTime = 0

        this.bird = new Bird()
        this.birdSprite = this.bird.getComponent('Sprite') as Sprite

        this.bg = Array.from({ length: 2 }, () => new Background())
        this.bgSprite = this.bg[0].getComponent('Sprite') as Sprite

        this.pipeSpawner = new PipeSpawner(new Vector2(this.bgSprite.width + 50, 0), this.bird)
        this.render = Render.getInstance()
        this.gameOver = new GameOver()
        this.message = new Message()
        this.ground = Array.from({ length: 2 }, () => new Ground())

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

        window.requestAnimationFrame(() => {
            this.loop()
        })
    }

    private start(): void {

        this.updateGameState('Idle')


        this.gameOverSprite = this.gameOver.getComponent('Sprite') as Sprite
        this.groundSprite = this.ground[0].getComponent('Sprite') as Sprite
        const messageSprite = this.message.getComponent('Sprite') as Sprite

        this.bg[1].transform.position = new Vector2(this.bgSprite.width, 0)
        this.ground[0].transform.position = new Vector2(this.ground[0].transform.position.x, 420)
        this.ground[1].transform.position = new Vector2(this.bgSprite.width, 420)
        this.gameOver.transform.position = new Vector2(this.bgSprite.width / 2 - this.gameOverSprite.width / 2, this.bgSprite.height / 2 - this.gameOverSprite.height / 2)
        this.message.transform.position = new Vector2(this.bgSprite.width / 2 - messageSprite.width / 2, this.bgSprite.height / 2 - messageSprite.height / 2 + 50)

        document.addEventListener('keydown', (event: KeyboardEvent) => this.inputHandler(event))
        document.addEventListener('mousedown', (event: MouseEvent) => this.inputHandler(event))

        this.pipeSpawner = new PipeSpawner(new Vector2(this.bgSprite.width + 2, 0), this.bird)
    }

    private update(delta: number): void {
        this.bird.update(delta)

        if (this.gameState == "Start" || this.gameState == "Idle") {
            this.bgSprite.update(delta)
            this.bg[0].update(delta)
            this.bg[1].update(delta)
            this.ground[0].update(delta)
            this.ground[1].update(delta)

            if (this.bg[0].transform.position.x + this.bgSprite.width <= 0) {
                const temp = this.bg[0]
                this.bg[0] = this.bg[1]
                this.bg[1] = temp
                this.bg[1].transform.position = new Vector2(this.bgSprite.width, 0)
            }

            if (this.ground[0].transform.position.x + this.groundSprite.width <= 0) {
                const temp = this.ground[0]
                this.ground[0] = this.ground[1]
                this.ground[1] = temp
                this.ground[1].transform.position = new Vector2(this.bgSprite.width, 420)
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

                this.bird.transform.position = new Vector2(this.bgSprite.width / 2 - this.birdSprite.width / 2,
                    this.bgSprite.height / 2 - this.birdSprite.width / 2)
                this.bird.setVelocity(Vector2.zero)
                this.bird.setGravity(0)
                this.bird.setIsOver(false)

                //ScoreManager.Instance()

                break
            case "Start":
                this.render.remove(this.message)
                this.bird.setGravity(0.15)
                break
            case "GameOver":
                this.render.add(this.gameOver)
                break
        }
    }

    // public addOnGameStateUpdate(handler: GameStateUpdateHandler): void {
    //     this.gameStateUpdateHandlers.push(handler)
    // }
}

Game.Instance()


