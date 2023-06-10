import { Event } from "../engine/event/Event"
import { BackgroundManager } from "./BackgroundManager"
import { Bird } from "./Bird"
import { PipeSpawner } from "./PipeSpawner"
import { Message } from "./Message"
import { GameOver } from "./GameOver"
import { PlayAgainButton } from "./PlayAgainButton"
import { ScoreManager } from "./ScoreManager"
import { Layer } from "../engine/system/Layer"
import { Physic } from "../engine/system/Physic"
import { GameState } from "./GameState"

export class GameManager {
    private static gameState: GameState

    public static OnGameStateChanged: Event<GameState>

    public static init(){
        // Physic setup
        Layer.add('Background')
        Physic.setInteractiveLayer('Background', 'Background', false)

        this.OnGameStateChanged = new Event<GameState>()

        ScoreManager.init(0)

        new Bird()
        new BackgroundManager()
        new PipeSpawner()
        new Message()
        new GameOver()
        new PlayAgainButton()
    }

    public static updateGameState(gameState: GameState): void {
        this.gameState = gameState

        switch (this.gameState) {
            case GameState.Ready:
                ScoreManager.reset()
                break
            case GameState.Playing:
                break
            case GameState.GameOver:
                break
        }

        this.OnGameStateChanged.invoke(this.gameState)
    }

    public static getGameState(): GameState {
        return this.gameState
    }
}