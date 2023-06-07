import { ScoreManager } from "./ScoreManager"
import Background from "./games/Background"
import { Bird } from "./games/Bird"
import { GameOver } from "./games/GameOver"
import { Ground } from "./games/Ground"
import { Message } from "./games/Message"
import { PipeSpawner } from "./games/PipeSpawner"
import { Render } from "./Render"
import { Command, GameState } from "./types/general"
import { Vector2 } from "./utils/Vector2"
import { Sprite } from "./components/Sprite"
import { GameManager } from "./GameManager"
import JumpCommand from "./utils/command/JumpCommand"
import UpdateGameStateCommand from "./utils/command/UpdateGameStateCommand"
import { PlayAgainButton } from "./UI/PlayAgainButton"
import { CanvasView } from "./CanvasView"

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

    private fps: number
    private frameTime: number
    private lastFrameTime: number

    private bgSprite: Sprite
    private groundSprite: Sprite
    private gameOverSprite: Sprite

    private playAgainButton: PlayAgainButton

    private gameManager: GameManager
    private canvasView: CanvasView

    constructor() {
        this.fps = FRAME_RATE
        this.frameTime = 1000 / this.fps
        this.lastFrameTime = 0

        this.gameManager = GameManager.Instance()
        this.gameManager.OnGameStateChanged.subscribe((gameState) => this.OnGameStateChanged(gameState))
        this.canvasView = CanvasView.Instance()
        this.bird = new Bird()

        this.bg = Array.from({ length: 2 }, () => new Background())
        this.bgSprite = this.bg[0].getComponent('Sprite') as Sprite

        this.pipeSpawner = new PipeSpawner(new Vector2(this.canvasView.width + 50, 0), this.bird)
        this.render = Render.Instance()
        this.gameOver = new GameOver()
        this.message = new Message()
        this.ground = Array.from({ length: 2 }, () => new Ground(this.bird))

        this.playAgainButton = new PlayAgainButton()

        this.gameManager.updateGameState('Idle')


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
        this.OnGameStateChanged('Idle')

        this.gameOverSprite = this.gameOver.getComponent('Sprite') as Sprite
        this.groundSprite = this.ground[0].getComponent('Sprite') as Sprite
        const messageSprite = this.message.getComponent('Sprite') as Sprite
        const playAgainSprite = this.playAgainButton.getComponent('Sprite') as Sprite

        this.bg[1].transform.position = new Vector2(this.bgSprite.width, 0)
        this.ground[0].transform.position = new Vector2(this.ground[0].transform.position.x, 420)
        this.ground[1].transform.position = new Vector2(this.canvasView.width, 420)
        this.gameOver.transform.position = new Vector2(this.canvasView.width / 2 - this.gameOverSprite.width / 2, 200)
        this.message.transform.position = new Vector2(this.canvasView.width / 2 - messageSprite.width / 2, this.canvasView.height / 2 - messageSprite.height / 2 + 50)

        this.playAgainButton.transform.scale = 0.3
        this.playAgainButton.transform.position = new Vector2(this.canvasView.width / 2 - this.playAgainButton.width / 2, 250)


        document.addEventListener('keydown', (event: KeyboardEvent) => this.inputHandler(event))
        document.addEventListener('mousedown', (event: MouseEvent) => this.inputHandler(event))

        this.pipeSpawner = new PipeSpawner(new Vector2(this.canvasView.width + 2, 0), this.bird)
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
        const isKeyboardEvent = event instanceof KeyboardEvent
        const isMouseEvent = event instanceof MouseEvent

        const commands: Command[] = []

        if (this.gameState === "Start" && ((isKeyboardEvent && event.code === 'Space') || isMouseEvent)) {
            commands.push(new JumpCommand(this.bird))
        } else if (this.gameState === "Idle" && ((isKeyboardEvent && event.code === 'Space') || isMouseEvent)) {
            commands.push(new JumpCommand(this.bird))
            commands.push(new UpdateGameStateCommand("Start"))
        } else if (this.gameState === "GameOver" && (isKeyboardEvent && event.code === 'Space')) {
            commands.push(new UpdateGameStateCommand("Idle"))
        }
        commands.forEach(command => command.execute())
    }

    private OnGameStateChanged(gameState: GameState): void {
        if (this.gameState === gameState) return

        this.gameState = gameState

        switch (this.gameState) {
            case "Idle":
                this.gameOver.setActive(false)
                this.playAgainButton.setActive(false)
                this.message.setActive(true)
                this.pipeSpawner.clear()

                ScoreManager.Instance().reset()
                break
            case "Start":
                this.message.setActive(false)
                break
            case "GameOver":
                this.gameOver.setActive(true)
                this.playAgainButton.setActive(true)
                break
        }
    }
}

new Game()

