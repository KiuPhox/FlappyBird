import { GameManager } from "./GameManager"
import { Collider } from "../engine/components/Collider"
import { ForceMode, RigidBody } from "../engine/components/RigidBody"
import { Sprite } from "../engine/components/Sprite"
import { GameState } from "../types/general"
import { Vector2 } from "../utils/Vector2"
import { GameObject } from "./GameObject"
import { Input } from "../engine/system/Input"

const BIRD_UP_SPRITE = 'assets/images/bird-up.png'
const BIRD_MID_SPRITE = 'assets/images/bird-mid.png'
const BIRD_DOWN_SPRITE = 'assets/images/bird-down.png'

export class Bird extends GameObject {
    private jumpForce: number
    private rigidBody: RigidBody
    private sprite: Sprite

    constructor() {
        super()
        GameManager.Instance().OnGameStateChanged.subscribe((gameState: GameState) => this.OnGameStateChanged(gameState))
        this.name = "Bird"
        this.jumpForce = 4.5

        this.rigidBody = new RigidBody(this, 0)
        this.sprite = new Sprite(this, 1)
        this.sprite.setSprite(BIRD_MID_SPRITE)

        this.addComponent(new Collider(this))
        this.addComponent(this.rigidBody)
        this.addComponent(this.sprite)
    }

    public update(): void {
        super.update()

        if (Input.getKeyDown('Space')) {
            if (GameManager.Instance().getGameState() === 'Idle') {
                this.jump()
                GameManager.Instance().updateGameState('Start')
            } else if (GameManager.Instance().getGameState() === 'Start') {
                this.jump()
            } else if (GameManager.Instance().getGameState() === 'GameOver') {
                GameManager.Instance().updateGameState('Idle')
            }
        }

        if (Input.getMouseDown()) {
            if (GameManager.Instance().getGameState() === 'Idle') {
                this.jump()
                GameManager.Instance().updateGameState('Start')
            } else if (GameManager.Instance().getGameState() === 'Start') {
                this.jump()
            }
        }

        this.rotateBaseOnGravity()
        this.updateAnimation()
    }

    private jump(): void {
        this.rigidBody.addForce(Vector2.up.mul(this.jumpForce), ForceMode.VelocityChange)
    }

    private rotateBaseOnGravity() {
        this.transform.rotation = this.rigidBody.velocity.y / 5
    }

    private updateAnimation() {
        if (this.rigidBody.velocity.y > 0.5) {
            this.sprite.setSprite(BIRD_UP_SPRITE)
        } else if (this.rigidBody.velocity.y < 0.5 && this.rigidBody.velocity.y > -1) {
            this.sprite.setSprite(BIRD_MID_SPRITE)
        } else if (this.rigidBody.velocity.y < -1) {
            this.sprite.setSprite(BIRD_DOWN_SPRITE)
        }
    }

    private OnGameStateChanged(gameState: GameState) {
        switch (gameState) {
            case "Idle":
                this.transform.position = Vector2.zero
                this.rigidBody.velocity = Vector2.zero
                this.rigidBody.gravityScale = 0
                break
            case "Start":
                this.rigidBody.gravityScale = 0.15
                break
        }
    }

    public OnCollisionStay(collider: Collider): void {
        if (GameManager.Instance().getGameState() == 'Start' && (collider.gameObject.name == "Ground" || collider.gameObject.name == "Pipe")) {
            GameManager.Instance().updateGameState('GameOver')
        }
    }
}