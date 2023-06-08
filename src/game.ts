import Background from "./games/Background"
import { Bird } from "./games/Bird"
import { GameOver } from "./games/GameOver"
import { Ground } from "./games/Ground"
import { Message } from "./games/Message"
import { PipeSpawner } from "./games/PipeSpawner"
import { Command, GameState } from "./types/general"
import { Sprite } from "./engine/components/Sprite"
import { GameManager } from "./GameManager"
import JumpCommand from "./utils/command/JumpCommand"
import UpdateGameStateCommand from "./utils/command/UpdateGameStateCommand"
import { PlayAgainButton } from "./engine/UI/PlayAgainButton"
import { Time } from "./engine/system/Time"
import { Node } from "./engine/system/Node"
import { Canvas } from "./engine/system/Canvas"
import { Vector2 } from "./utils/Vector2"
import { ScoreManager } from "./ScoreManager"
import { Physic } from "./engine/components/Physic"
import { UIManager } from "./engine/UI/UIManager"

const FRAME_RATE = 200

export class Game {
    private bird: Bird
    private static bg: Background[]
    private pipeSpawner: PipeSpawner
    private static gameState: GameState
    private gameOver: GameOver
    private message: Message
    private static ground: Ground[]

    private fps: number
    private frameTime: number
    private static lastFrameTime: number

    private static bgSprite: Sprite
    private static groundSprite: Sprite
    private gameOverSprite: Sprite

    private playAgainButton: PlayAgainButton

    private gameManager: GameManager

    private static nodes: Node[] = []

    constructor() {
        Time.init()
        UIManager.init()
        Canvas.init()

        this.fps = FRAME_RATE
        this.frameTime = 1000 / this.fps
        Game.lastFrameTime = 0

        this.gameManager = GameManager.Instance()
        this.gameManager.OnGameStateChanged.subscribe((gameState: GameState) => this.OnGameStateChanged(gameState))

        this.bird = new Bird()
        Game.bg = Array.from({ length: 2 }, () => new Background())
        Game.bgSprite = Game.bg[0].getComponent('Sprite') as Sprite

        this.pipeSpawner = new PipeSpawner(new Vector2(Canvas.size.x / 2 + 50, 0), this.bird)
        this.gameOver = new GameOver()
        this.message = new Message()
        this.message.transform.position = new Vector2(0, 60)
        Game.ground = Array.from({ length: 2 }, () => new Ground(this.bird))
        Game.groundSprite = Game.ground[0].getComponent('Sprite') as Sprite

        this.playAgainButton = new PlayAgainButton()
        this.playAgainButton.transform.position = new Vector2(0, 50)

        this.gameManager.updateGameState('Idle')

        this.start()
        this.loop()
    }

    private loop() {
        const time = window.performance.now()
        Time.lastFrameTime = Game.lastFrameTime

        const deltaTime = time - Game.lastFrameTime

        if (deltaTime >= this.frameTime) {
            Game.update() // Update
            Canvas.draw() // Render
            Game.lastFrameTime = time
        }

        window.requestAnimationFrame(() => {
            this.loop()
        })
    }

    public static registerNode(node: Node): void {
        Game.nodes.push(node)
    }

    private start(): void {
        this.OnGameStateChanged('Idle')

        Game.ground[0].transform.position = new Vector2(0, 200)
        this.playAgainButton.transform.scale = 0.3


        document.addEventListener('keydown', (event: KeyboardEvent) => this.inputHandler(event))
        document.addEventListener('mousedown', (event: MouseEvent) => this.inputHandler(event))
    }

    private static update(): void {
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].executeUpdate()
        }
        if (this.gameState == "Start" || this.gameState == "Idle") {
            this.bg[1].transform.position = new Vector2(this.bg[0].transform.position.x + this.bgSprite.width, 0)
            if (this.bg[0].transform.position.x + this.bgSprite.width <= 0) {
                this.bg[0].transform.position = Vector2.zero
            }
            this.ground[1].transform.position = new Vector2(this.ground[0].transform.position.x + this.groundSprite.width, this.ground[0].transform.position.y)
            if (this.ground[0].transform.position.x + this.groundSprite.width <= 0) {
                this.ground[0].transform.position = new Vector2(0, 200)
            }
        }
    }

    private inputHandler(event: KeyboardEvent | MouseEvent): void {
        const isKeyboardEvent = event instanceof KeyboardEvent
        const isMouseEvent = event instanceof MouseEvent

        const commands: Command[] = []

        if (Game.gameState === "Start" && ((isKeyboardEvent && event.code === 'Space') || isMouseEvent)) {
            commands.push(new JumpCommand(this.bird))
        } else if (Game.gameState === "Idle" && ((isKeyboardEvent && event.code === 'Space') || isMouseEvent)) {
            commands.push(new JumpCommand(this.bird))
            commands.push(new UpdateGameStateCommand("Start"))
        } else if (Game.gameState === "GameOver" && (isKeyboardEvent && event.code === 'Space')) {
            commands.push(new UpdateGameStateCommand("Idle"))
        }
        commands.forEach(command => command.execute())
    }

    private OnGameStateChanged(gameState: GameState): void {
        if (Game.gameState === gameState) return

        Game.gameState = gameState

        switch (Game.gameState) {
            case "Idle":
                this.gameOver.setActive(false)
                this.playAgainButton.setActive(false)
                this.message.setActive(true);
                (Game.bg[0].getComponent('Physic') as Physic).velocity = new Vector2(-0.5, 0);
                (Game.ground[0].getComponent('Physic') as Physic).velocity = new Vector2(-1.7, 0)
                this.pipeSpawner.clear()
                this.pipeSpawner.setActive(false)
                ScoreManager.Instance().reset()
                break
            case "Start":
                this.pipeSpawner.setIsSpawn(true)
                this.message.setActive(false)
                break
            case "GameOver":
                (Game.bg[0].getComponent('Physic') as Physic).velocity = Vector2.zero;
                (Game.ground[0].getComponent('Physic') as Physic).velocity = Vector2.zero
                this.pipeSpawner.setIsSpawn(false)
                this.gameOver.setActive(true)
                this.playAgainButton.setActive(true)
                break
        }
    }
}

new Game()

