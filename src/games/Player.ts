import { GameManager } from "../GameManager"
import { Render } from "../Render"
import { Collider } from "../components/Collider"
import { Physic } from "../components/Physic"
import { Sprite } from "../components/Sprite"
import { GameState } from "../types/general"
import { Vector2 } from "../utils/Vector2"
import { GameObject } from "./GameObject"

const PLAYER_LEFT_SPRITE = 'assets/images/lik-left.png'
const PLAYER_RIGHT_SPRITE = 'assets/images/lik-right.png'

export class Player extends GameObject {
    private jumpStrength: number
    private physic: Physic
    private sprite: Sprite
    private collider: Collider
    private isMovingLeft: boolean
    private isMovingRight: boolean

    constructor() {
        super()

        GameManager.Instance().OnGameStateChanged.subscribe((gameState) => this.OnGameStateChanged(gameState))

        this.jumpStrength = 7

        this.physic = new Physic(this, 0.15)
        this.sprite = new Sprite(this, 1)
        this.collider = new Collider(this)

        this.sprite.setSprite(PLAYER_LEFT_SPRITE)

        this.addComponent(this.physic)
        this.addComponent(this.sprite)
        this.addComponent(this.collider)

        document.addEventListener('keydown', this.handleKeyDown.bind(this))
        document.addEventListener('keyup', this.handleKeyUp.bind(this))

        Render.Instance().add(this)
    }

    get isFalling(): boolean { return this.physic.velocity.y > 0 }

    public jump() {
        this.physic.velocity = new Vector2(this.physic.velocity.x, -this.jumpStrength)
    }

    public update(delta: number): void {
        super.update(delta)

        if (this.isMovingLeft) {
            this.physic.velocity = new Vector2(-1, this.physic.velocity.y)
        }
        else if (this.isMovingRight) {
            this.physic.velocity = new Vector2(1, this.physic.velocity.y)
        } else {
            this.physic.velocity = new Vector2(0, this.physic.velocity.y)
        }
        this.updateAnimation()
    }

    private handleKeyDown(event: KeyboardEvent): void {
        if (event.code === 'KeyA') {
            this.isMovingLeft = true
        } else if (event.code === 'KeyD') {
            this.isMovingRight = true
        }
    }

    private handleKeyUp(event: KeyboardEvent): void {
        if (event.code === 'KeyA') {
            this.isMovingLeft = false
        } else if (event.code === 'KeyD') {
            this.isMovingRight = false
        }
    }

    private updateAnimation() {
        if (this.isMovingLeft) {
            this.sprite.setSprite(PLAYER_LEFT_SPRITE)
        } else if (this.isMovingRight) {
            this.sprite.setSprite(PLAYER_RIGHT_SPRITE)
        }
    }

    private OnGameStateChanged(gameState: GameState) {
        //
    }
}