import { Render } from "../Render"
import { Collider } from "../components/Collider"
import { Physic } from "../components/Physic"
import { Sprite } from "../components/Sprite"
import { Game } from "../game"
import { Vector2 } from "../utils/Vector2"
import { GameObject } from "./GameObject"

export class Bird extends GameObject {
    private jumpStrength: number
    private isOver: boolean
    private physic: Physic
    private sprite: Sprite
    private collider: Collider

    constructor() {
        super()
        this.jumpStrength = 4
        this.isOver = false
        this.physic = new Physic(this, 0)
        this.sprite = new Sprite(this, 1)
        this.collider = new Collider(this)
        this.sprite.setSprite("assets/images/bird-mid.png")

        this.addComponent(this.physic)
        this.addComponent(this.sprite)
        this.addComponent(this.collider)


        Render.getInstance().add(this)
    }

    public update(delta: number): void {
        super.update(delta)
        this.rotateBaseOnGravity()
        // this.applyGravity()
        // this.updatePosition()
        // this.checkBounds()

    }

    public jump(): void {
        this.physic.velocity = new Vector2(this.physic.velocity.x, -this.jumpStrength)
    }

    private rotateBaseOnGravity() {
        if (!this.isOver)
            this.transform.rotation = this.physic.velocity.y / 5
    }

    // private applyGravity(): void {
    //     this.velocity = this.velocity.add(new Vector2(0, this.gravity * this.delta))

    //     if (!this.isOver)
    //         this.transform.rotation = this.velocity.y / 5
    // }

    // private updatePosition(): void {
    //     this.transform.position = this.transform.position.add(this.velocity.mul(this.delta))

    //     if (this.velocity.y > 0.5) {
    //         this.image.src = 'assets/images/bird-up.png'
    //     } else if (this.velocity.y < 0.5 && this.velocity.y > -1) {
    //         this.image.src = 'assets/images/bird-mid.png'
    //     } else if (this.velocity.y < -1) {
    //         this.image.src = 'assets/images/bird-down.png'
    //     }
    // }

    private checkBounds(): void {

        if (!this.isOver && this.transform.position.y > 400 || this.transform.position.y < 0) {
            this.isOver = true
            this.transform.position = new Vector2(this.transform.position.x, 400)
            Game.Instance().updateGameState("GameOver")
        }

        if (this.transform.position.y > 400) {
            this.transform.position = new Vector2(this.transform.position.x, 400)
            //this.velocity.y = 0
        }
    }

    public setIsOver(isOver: boolean): void {
        this.isOver = isOver
    }

    public setVelocity(velocity: Vector2): void {
        this.physic.velocity = velocity
    }

    public setGravity(gravity: number): void {
        this.physic.gravityScale = gravity
    }

}