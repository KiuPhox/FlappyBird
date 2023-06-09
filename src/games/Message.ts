import { Sprite } from "../engine/components/Sprite"
import { GameState } from "./GameState"
import { Vector2 } from "../engine/utils/Vector2"
import { GameManager } from "./GameManager"
import { GameObject } from "../engine/system/GameObject"

export class Message extends GameObject {
    private sprite: Sprite
    constructor() {
        super('TipUI')
        this.transform.position = new Vector2(0, 60)
        this.sprite = new Sprite(this, 0)
        this.sprite.setSprite("assets/images/message.png")
        this.addComponent(this.sprite)

        GameManager.OnGameStateChanged.subscribe(this.OnGameStateChanged)
    }

    OnGameStateChanged = (gameState: GameState) => {
        switch (gameState){
            case GameState.Ready:
                this.setActive(true)
                break
            case GameState.Playing:
                    this.setActive(false)
                    break
        }
    }
}