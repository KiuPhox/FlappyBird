import { RigidBody } from "../engine/components/RigidBody"
import { Sprite } from "../engine/components/Sprite"
import { Node } from "../engine/system/Node"
import { GameState } from "../types/general"
import { Vector2 } from "../utils/Vector2"
import Background from "./Background"
import { GameManager } from "./GameManager"
import { Ground } from "./Ground"

const BACKGROUND_SPEED= 0.5
const GROUND_SPEED = 1.7

export class BackgroundManager extends Node {
    private backgrounds: Background[]
    private backgroundSprite: Sprite

    private grounds: Ground[]
    private groundSprite: Sprite

    constructor() {
        super('BackgroundManager')

        this.backgrounds = [new Background(), new Background()]
        this.backgroundSprite = (this.backgrounds[0].getComponent('Sprite') as Sprite)
        this.grounds = [new Ground(), new Ground()]
        this.groundSprite = (this.grounds[0].getComponent('Sprite') as Sprite)

        this.grounds[0].transform.position = new Vector2(0, 200)

        GameManager.OnGameStateChanged.subscribe(this.OnGameStateChanged)
    }

    public update(): void {
        super.update()

        this.backgrounds[1].transform.position = new Vector2(this.backgrounds[0].transform.position.x + this.backgroundSprite.width, 0)
        if (this.backgrounds[0].transform.position.x + this.backgroundSprite.width <= 0) {
            this.backgrounds[0].transform.position = Vector2.zero
        }

        this.grounds[1].transform.position = new Vector2(this.grounds[0].transform.position.x + this.groundSprite.width, this.grounds[0].transform.position.y)
        if (this.grounds[0].transform.position.x + this.groundSprite.width <= 0) {
            this.grounds[0].transform.position = new Vector2(0, 200)
        }
    }

    OnGameStateChanged = (gameState: GameState) => {
        if (gameState == "Idle"){
            (this.backgrounds[0].getComponent('RigidBody') as RigidBody).velocity = Vector2.left.mul(BACKGROUND_SPEED);
            (this.grounds[0].getComponent('RigidBody') as RigidBody).velocity = Vector2.left.mul(GROUND_SPEED)
        }
        else if (gameState == 'GameOver'){
            (this.backgrounds[0].getComponent('RigidBody') as RigidBody).velocity = Vector2.zero;
            (this.grounds[0].getComponent('RigidBody') as RigidBody).velocity = Vector2.zero
        }
    }
}