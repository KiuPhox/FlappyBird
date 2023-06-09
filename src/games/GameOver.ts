import { Sprite } from "../engine/components/Sprite"
import { GameState } from "./GameState"
import { GameManager } from "./GameManager"
import { GameObject } from "../engine/system/GameObject"

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
            case GameState.Ready:
                this.setActive(false)
                break
            case GameState.GameOver:
                this.setActive(true)
                break
        }
    }
}