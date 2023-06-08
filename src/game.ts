import Background from "./games/Background"
import { Bird } from "./games/Bird"
import { GameOver } from "./games/GameOver"
import { Ground } from "./games/Ground"
import { Message } from "./games/Message"
import { PipeSpawner } from "./games/PipeSpawner"
import { GameState } from "./types/general"
import { Sprite } from "./engine/components/Sprite"
import { GameManager } from "./games/GameManager"
import { PlayAgainButton } from "./games/PlayAgainButton"
import { Time } from "./engine/system/Time"
import { Node } from "./engine/system/Node"
import { Canvas } from "./engine/system/Canvas"
import { Vector2 } from "./utils/Vector2"
import { ScoreManager } from "./games/ScoreManager"
import { RigidBody } from "./engine/components/RigidBody"
import { UIManager } from "./engine/UI/UIManager"
import { Physic } from "./engine/system/Physic"
import { Input } from "./engine/system/Input"
import { Layer } from "./engine/system/Layer"

const FRAME_RATE = 300

export class Game {
    private static bg: Background[]
    private pipeSpawner: PipeSpawner
    private static gameState: GameState
    private gameOver: GameOver
    private message: Message
    private static ground: Ground[]

    private static bgSprite: Sprite
    private static groundSprite: Sprite

    private playAgainButton: PlayAgainButton

    private gameManager: GameManager

    private static nodes: Node[] = []

    constructor() {
        Input.init()
        Time.init()
        UIManager.init()
        Canvas.init()
        Layer.init()
        Layer.add('Background')
        Physic.setInteractiveLayer('Background', 'Background', false)

        this.gameManager = GameManager.Instance()
        this.gameManager.OnGameStateChanged.subscribe((gameState: GameState) => this.OnGameStateChanged(gameState))

        // Bird
        new Bird()

        // Background
        Game.bg = Array.from({ length: 2 }, () => new Background())
        Game.bgSprite = Game.bg[0].getComponent('Sprite') as Sprite

        // Pipe
        this.pipeSpawner = new PipeSpawner()

        // Ground
        Game.ground = Array.from({ length: 2 }, () => new Ground())
        Game.groundSprite = Game.ground[0].getComponent('Sprite') as Sprite
        Game.ground[0].transform.position = new Vector2(0, 200)

        // UI Elements
        this.message = new Message()
        this.playAgainButton = new PlayAgainButton()
        this.gameOver = new GameOver()

        this.gameManager.updateGameState('Idle')
        this.loop()
    }

    private loop() {
        if (Time.deltaTime >= 1 / FRAME_RATE) {
            Physic.update() // Physic
            Game.update() // Update
            Canvas.draw() // Render
            Input.reset() // Input End
            Time.lastFrameTime = window.performance.now()
        }

        window.requestAnimationFrame(() => {
            this.loop()
        })
    }

    public static registerNode(node: Node): void {
        Game.nodes.push(node)
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

    private OnGameStateChanged(gameState: GameState): void {
        if (Game.gameState === gameState) return

        Game.gameState = gameState

        switch (Game.gameState) {
            case "Idle":
                this.gameOver.setActive(false)
                this.playAgainButton.setActive(false)
                this.message.setActive(true);
                (Game.bg[0].getComponent('RigidBody') as RigidBody).velocity = new Vector2(-0.5, 0);
                (Game.ground[0].getComponent('RigidBody') as RigidBody).velocity = new Vector2(-1.7, 0)
                this.pipeSpawner.clear()
                this.pipeSpawner.setActive(false)
                ScoreManager.Instance().reset()
                break
            case "Start":
                this.pipeSpawner.setIsSpawn(true)
                this.message.setActive(false)
                break
            case "GameOver":
                (Game.bg[0].getComponent('RigidBody') as RigidBody).velocity = Vector2.zero;
                (Game.ground[0].getComponent('RigidBody') as RigidBody).velocity = Vector2.zero
                this.pipeSpawner.setIsSpawn(false)
                this.gameOver.setActive(true)
                this.playAgainButton.setActive(true)
                break
        }
    }
}

new Game()

