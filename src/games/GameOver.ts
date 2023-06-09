import { Sprite } from "../engine/components/Sprite"
import { GameState } from "../types/general"
import { GameManager } from "./GameManager"
import { GameObject } from "./GameObject"

export class GameOver extends GameObject {

    private sprite: Sprite

    constructor() {
        super('GameOverUI')
        this.sprite = new Sprite(this, 0)
        this.sprite.setSprite("assets/images/gameover.png")
        this.addComponent(this.sprite)

        GameManager.OnGameStateChanged.subscribe(this.OnGameStateChanged)
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