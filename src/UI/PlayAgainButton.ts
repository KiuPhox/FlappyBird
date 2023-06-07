import { GameManager } from "../GameManager"
import { Button } from "./Button"

export class PlayAgainButton extends Button {
    constructor() {
        super('assets/images/start.png')
    }

    public onClick(): void {
        GameManager.Instance().updateGameState('Idle')
    }
}