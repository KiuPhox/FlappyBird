import { GameManager } from "../../GameManager"
import { Command, GameState } from "../../types/general"

export default class UpdateGameStateCommand implements Command {
    private readonly gameManager: GameManager
    private readonly gameState: GameState

    constructor(gameState: GameState) {
        this.gameManager = GameManager.Instance()
        this.gameState = gameState
    }

    execute(): void {
        this.gameManager.updateGameState(this.gameState)
    }
}