import { GameState } from "../types/general"
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

export class GameManager {
    private static gameState: GameState

    public static OnGameStateChanged: Event<GameState>

    public static init(){
        this.OnGameStateChanged = new Event<GameState>()

        ScoreManager.init(0)

        Layer.add('Background')
        
        Physic.setInteractiveLayer('Background', 'Background', false)

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
            case "Idle":
                ScoreManager.reset()
                break
            case "Start":
                break
            case "GameOver":
                break
        }

        this.OnGameStateChanged.invoke(this.gameState)
    }

    public static getGameState(): GameState {
        return this.gameState
    }
}