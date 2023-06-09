import { GameState } from "./types/general"
import { GameManager } from "./games/GameManager"
import { Time } from "./engine/system/Time"
import { Node } from "./engine/system/Node"
import { Canvas } from "./engine/system/Canvas"
import { UIManager } from "./engine/UI/UIManager"
import { Physic } from "./engine/system/Physic"
import { Input } from "./engine/system/Input"
import { Layer } from "./engine/system/Layer"

const FRAME_RATE = 300

export class Game {
    private static gameState: GameState
    // private gameOver: GameOver
    // private message: Message
    // private playAgainButton: PlayAgainButton

    private static nodes: Node[] = []

    constructor() {
        Input.init()
        Time.init()
        UIManager.init()
        Canvas.init()
        Layer.init()

        GameManager.init()
        GameManager.updateGameState('Idle')

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
    }
}

new Game()

