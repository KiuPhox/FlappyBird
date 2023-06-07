import { CanvasView } from "../CanvasView"
import { GameManager } from "../GameManager"
import { Render } from "../Render"
import { Collider } from "../components/Collider"
import { Physic } from "../components/Physic"
import { Sprite } from "../components/Sprite"
import { GameState } from "../types/general"
import { Vector2 } from "../utils/Vector2"
import { GameObject } from "./GameObject"

export class Bird extends GameObject {
    private jumpStrength: number
    private physic: Physic
    private sprite: Sprite
    private collider: Collider

    constructor() {
        super()

        GameManager.Instance().OnGameStateChanged.subscribe((gameState) => this.OnGameStateChanged(gameState))

        this.jumpStrength = 4

        this.physic = new Physic(this, 0)
        this.sprite = new Sprite(this, 1)
        this.collider = new Collider(this)
        this.sprite.setSprite("assets/images/bird-mid.png")

        this.addComponent(this.physic)
        this.addComponent(this.sprite)
        this.addComponent(this.collider)

        Render.Instance().add(this)
    }

    public update(delta: number): void {
        super.update(delta)
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
            this.sprite.setSprite('assets/images/bird-up.png')
        } else if (this.physic.velocity.y < 0.5 && this.physic.velocity.y > -1) {
            this.sprite.setSprite('assets/images/bird-mid.png')
        } else if (this.physic.velocity.y < -1) {
            this.sprite.setSprite('assets/images/bird-down.png')
        }
    }

    private OnGameStateChanged(gameState: GameState) {
        switch (gameState) {
            case "Idle":
                this.transform.position = new Vector2(
                    CanvasView.Instance().width / 2 - this.sprite.width / 2,
                    CanvasView.Instance().height / 2 - this.sprite.height / 2
                )

                this.physic.velocity = Vector2.zero
                this.physic.gravityScale = 0
                break
            case "Start":
                this.physic.gravityScale = 0.15
                break
        }
    }
}