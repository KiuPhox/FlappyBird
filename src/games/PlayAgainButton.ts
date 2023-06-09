import { GameManager } from "./GameManager"
import { Button } from "../engine/UI/Button"
import { Vector2 } from "../engine/utils/Vector2"
import { GameState } from "./GameState"

export class PlayAgainButton extends Button {
    constructor() {
        super('PlayAgainButton', 'assets/images/start.png')
        this.transform.position = new Vector2(0, 50)
        this.transform.scale = 0.35

        GameManager.OnGameStateChanged.subscribe(this.OnGameStateChanged)
    }

    public onClick(): void {
        GameManager.updateGameState(GameState.Ready)
    }

    OnGameStateChanged = (gameState: GameState) => {
        switch (gameState){
            case GameState.Ready:
                this.setActive(false)
                break
            case GameState.GameOver:
                this.setActive(true)
                break
        }
    }
}