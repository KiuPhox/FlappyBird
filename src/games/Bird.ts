import { GameManager } from "./GameManager"
import { Collider } from "../engine/components/Collider"
import { Physic } from "../engine/components/Physic"
import { Sprite } from "../engine/components/Sprite"
import { GameState } from "../types/general"
import { Vector2 } from "../utils/Vector2"
import { GameObject } from "./GameObject"

const BIRD_UP_SPRITE = 'assets/images/bird-up.png'
const BIRD_MID_SPRITE = 'assets/images/bird-mid.png'
const BIRD_DOWN_SPRITE = 'assets/images/bird-down.png'

export class Bird extends GameObject {
    private jumpStrength: number
    private physic: Physic
    private sprite: Sprite
    private collider: Collider

    constructor() {
        super()
        GameManager.Instance().OnGameStateChanged.subscribe((gameState: GameState) => this.OnGameStateChanged(gameState))

        this.jumpStrength = 4

        this.physic = new Physic(this, 0)
        this.sprite = new Sprite(this, 1)
        this.collider = new Collider(this)
        this.sprite.setSprite(BIRD_MID_SPRITE)

        this.addComponent(this.physic)
        this.addComponent(this.sprite)
        this.addComponent(this.collider)
    }

    public update(): void {
        super.update()
        this.rotateBaseOnGravity()
        this.updateAnimation()
    }

    public jump(): void {
        this.physic.velocity = new Vector2(this.physic.velocity.x, -this.jumpStrength)
    }

    private rotateBaseOnGravity() {
        this.transform.rotation = this.physic.velocity.y / 5
    }

    private updateAnimation() {
        if (this.physic.velocity.y > 0.5) {
            this.sprite.setSprite(BIRD_UP_SPRITE)
        } else if (this.physic.velocity.y < 0.5 && this.physic.velocity.y > -1) {
            this.sprite.setSprite(BIRD_MID_SPRITE)
        } else if (this.physic.velocity.y < -1) {
            this.sprite.setSprite(BIRD_DOWN_SPRITE)
        }
    }

    private OnGameStateChanged(gameState: GameState) {
        switch (gameState) {
            case "Idle":
                this.transform.position = Vector2.zero
                this.physic.velocity = Vector2.zero
                this.physic.gravityScale = 0
                break
            case "Start":
                this.physic.gravityScale = 0.15
                break
        }
    }
}