import { GameState } from "./types/general"
import { Event } from "./utils/event/Event"

export class GameManager {
    private gameState: GameState
    private static instance: GameManager

    public OnGameStateChanged: Event

    constructor() {
        this.OnGameStateChanged = new Event()
    }

    public static Instance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager()
        }

        return GameManager.instance
    }

    public updateGameState(gameState: GameState): void {
        this.gameState = gameState

        switch (this.gameState) {
            case "Idle":
                break
            case "Start":
                break
            case "GameOver":
                break
        }
        this.OnGameStateChanged.invoke(this.gameState)
    }
}