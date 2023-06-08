import { GameManager } from "./GameManager"
import { Button } from "../engine/UI/Button"
import { Vector2 } from "../utils/Vector2"

export class PlayAgainButton extends Button {
    constructor() {
        super('assets/images/start.png')
        this.transform.position = new Vector2(0, 50)
        this.transform.scale = 0.35
    }

    public onClick(): void {
        GameManager.Instance().updateGameState('Idle')
    }
}