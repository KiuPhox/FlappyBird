import { Render } from "../Render"
import { Vector2 } from "../utils/Vector2"
import { Pipe } from "./Pipe"
import { Bird } from "./Bird"
import { Utils } from "../utils/Utils"
import { Collider } from "../components/Collider"
import { ScoreManager } from "../ScoreManager"
import { GameManager } from "../GameManager"
import { ObjectPool } from "../utils/ObjectPool"

export class PipeSpawner {
    private spawnPos: Vector2
    private spawnBetweenTime: number
    private spawnTimer: number
    private pipes: Pipe[]
    private birdCollider: Collider
    private pipePool: ObjectPool<Pipe>

    constructor(spawnPos: Vector2, bird: Bird) {
        this.spawnPos = spawnPos
        this.spawnBetweenTime = 1
        this.spawnTimer = this.spawnBetweenTime
        this.pipes = []
        this.birdCollider = bird.getComponent('Collider') as Collider

        this.pipePool = new ObjectPool<Pipe>(
            () => {
                const pipe = new Pipe(new Vector2(this.spawnPos.x, Utils.Random(180, 380)), true)
                this.pipes.push(pipe)
                console.log('a')
                return pipe
            },
            (obj) => obj.setActive(false)
        )
    }

    public update(delta: number) {
        this.spawnTimer -= delta
        if (this.spawnTimer < 0) {
            this.spawnTimer = this.spawnBetweenTime
            this.spawn()
        }
        console.log(this.pipes.length)

        for (let i = 0; i < this.pipes.length; i++) {
            this.pipes[i].update(delta)

            if (!this.pipes[i].getIsCount() && this.pipes[i].center.x < 150) {
                this.pipes[i].setIsCount(true)
                ScoreManager.Instance().increaseScore()
            }

            if (this.pipes[i].getIsCount() && this.pipes) {
                if ((this.pipes[i].getComponent('Collider') as Collider).isTouch(this.birdCollider)) {
                    (GameManager.Instance() as GameManager).updateGameState("GameOver")
                }
            }

            if (this.pipes[i].active && this.pipes[i].transform.position.x + 50 < 0) {
                this.pipePool.release(this.pipes[i])
            }
        }
    }

    public clear() {
        for (const pipe of this.pipes) {
            Render.Instance().remove(pipe)
        }

        this.pipes = []
    }

    private spawn() {
        const pipeUp = this.pipePool.get()
        pipeUp.setIsCount(true)
        pipeUp.setActive(true)
        pipeUp.transform.rotation = 0
        pipeUp.transform.position = new Vector2(this.spawnPos.x, Utils.Random(180, 380))

        const pipeDown = this.pipePool.get()
        pipeDown.transform.position = new Vector2(this.spawnPos.x, pipeUp.transform.position.y - 430)
        pipeDown.setActive(true)
        pipeDown.setIsCount(false)
        pipeDown.transform.rotation = Math.PI
    }
}