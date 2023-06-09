import { Event } from "../engine/event/Event"
import { BackgroundManager } from "./BackgroundManager"
import { Bird } from "./Bird"
import { PipeSpawner } from "./PipeSpawner"
import { Message } from "./Message"
import { GameOver } from "./GameOver"
import { PlayAgainButton } from "./PlayAgainButton"
import { ScoreManager } from "./ScoreManager"
import { Layer } from "../engine/system/Layer"
import { Physic } from "../engine/system/Physic"
import { GameState } from "./GameState"
import { GameObject } from "../engine/system/GameObject"
import { Sprite } from "../engine/components/Sprite"
import { Vector2 } from "../engine/utils/Vector2"

export class GameManager {
    private static gameState: GameState

    public static OnGameStateChanged: Event<GameState>

    public static init(){
        this.OnGameStateChanged = new Event<GameState>()

        ScoreManager.init(0)

        Layer.add('Background')

        Physic.setInteractiveLayer('Background', 'Background', false)

        const bird = new Bird()

        const newGO = new GameObject('asd')
        const newSprite = new Sprite(newGO, 0)
        newSprite.setSprite('assets/images/0.png')
        newGO.addComponent(newSprite)
        newGO.setParent(bird)
        newGO.transform.position = new Vector2(0, -50)
        // newGO.transform.localPosition = new Vector2(22, 22)
        // newGO.transform.position = new Vector2(12, 12)

        new BackgroundManager()
        new PipeSpawner()
        new Message()
        new GameOver()
        new PlayAgainButton()
    }

    public static updateGameState(gameState: GameState): void {
        this.gameState = gameState

        switch (this.gameState) {
            case GameState.Ready:
                ScoreManager.reset()
                break
            case GameState.Playing:
                break
            case GameState.GameOver:
                break
        }

        this.OnGameStateChanged.invoke(this.gameState)
    }

    public static getGameState(): GameState {
        return this.gameState
    }
}