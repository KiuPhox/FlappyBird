import { Render } from "../Render"
import { Vector2 } from "../utils/Vector2"
import { Pipe } from "./Pipe"
import { Bird } from "./Bird"
import { Utils } from "../utils/Utils"
import { Collider } from "../components/Collider"
import { ScoreManager } from "../ScoreManager"
import { GameManager } from "../GameManager"

export class PipeSpawner {
    private spawnPos: Vector2
    private spawnBetweenTime: number
    private spawnTimer: number
    private pipes: Pipe[]
    private bird: Bird
    private birdCollider: Collider

    constructor(spawnPos: Vector2, bird: Bird) {
        this.spawnPos = spawnPos
        this.spawnBetweenTime = 1
        this.spawnTimer = this.spawnBetweenTime
        this.pipes = []
        this.bird = bird
        this.birdCollider = bird.getComponent('Collider') as Collider
    }

    public update(delta: number) {
        this.spawnTimer -= delta
        if (this.spawnTimer < 0) {
            this.spawnTimer = this.spawnBetweenTime
            this.spawn()
        }

        for (let i = 0; i < this.pipes.length; i++) {
            this.pipes[i].update(delta)

            if (!this.pipes[i].getIsCount() && this.pipes[i].center.x < 150) {
                this.pipes[i].setIsCount(true)
                ScoreManager.Instance().increaseScore()
            }


            if ((this.pipes[i].getComponent('Collider') as Collider).isTouch(this.birdCollider)) {
                GameManager.Instance().updateGameState("GameOver")
            }
        }
    }

    public clear() {
        for (const pipe of this.pipes) {
            Render.getInstance().remove(pipe)
        }

        this.pipes = []
    }

    private spawn() {
        const pipeUp = new Pipe(new Vector2(this.spawnPos.x, Utils.Random(180, 380)), true)
        const pipeDown = new Pipe(new Vector2(this.spawnPos.x, pipeUp.transform.position.y - 430), false)

        pipeDown.transform.rotation = Math.PI

        this.pipes.push(pipeUp)
        this.pipes.push(pipeDown)

        // Render.getInstance().add(pipeUp, 2)
        // Render.getInstance().add(pipeDown, 2)
    }
}