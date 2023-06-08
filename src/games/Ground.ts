import { GameManager } from "../GameManager"
import { Collider } from "../engine/components/Collider"
import { Physic } from "../engine/components/Physic"
import { Sprite } from "../engine/components/Sprite"
import { Bird } from "./Bird"
import { GameObject } from "./GameObject"

export class Ground extends GameObject {
    private collider: Collider
    private bird: Bird
    private birdCollider: Collider

    constructor(bird: Bird) {
        super()

        this.bird = bird
        this.birdCollider = this.bird.getComponent('Collider') as Collider


        const sprite = new Sprite(this, 1)
        sprite.setSprite("assets/images/base.png")

        this.addComponent(sprite)

        this.collider = new Collider(this)
        this.addComponent(this.collider)
        this.addComponent(new Physic(this, 0))
    }

    public update(): void {
        super.update()

        if (GameManager.Instance().getGameState() == 'Start' && this.collider.isTouch(this.birdCollider)) {
            GameManager.Instance().updateGameState('GameOver')
        }
    }
}