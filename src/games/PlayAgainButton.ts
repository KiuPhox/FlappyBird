import { GameManager } from "./GameManager"
import { Button } from "../engine/UI/Button"
import { Vector2 } from "../utils/Vector2"
import { GameState } from "../types/general"

export class PlayAgainButton extends Button {
    constructor() {
        super('PlayAgainButton', 'assets/images/start.png')
        this.transform.position = new Vector2(0, 50)
        this.transform.scale = 0.35

        GameManager.OnGameStateChanged.subscribe(this.OnGameStateChanged)
    }

    public onClick(): void {
        GameManager.updateGameState('Idle')
    }

    OnGameStateChanged = (gameState: GameState) => {
        switch (gameState){
            case "Idle":
                this.setActive(false)
                break
            case "GameOver":
                this.setActive(true)
                break
        }
    }
}