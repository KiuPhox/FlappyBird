import { GameState } from "../types/general"
import { Event } from "../engine/event/Event"

export class GameManager {
    private static  gameState: GameState

    public static OnGameStateChanged: Event<GameState>

    public static init(){
        this.OnGameStateChanged = new Event<GameState>()
    }

    public static updateGameState(gameState: GameState): void {
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

    public static getGameState(): GameState {
        return this.gameState
    }
}