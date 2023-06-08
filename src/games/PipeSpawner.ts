import { Vector2 } from "../utils/Vector2"
import { Pipe } from "./Pipe"
import { Bird } from "./Bird"
import { Utils } from "../utils/Utils"
import { Collider } from "../engine/components/Collider"
import { ScoreManager } from "./ScoreManager"
import { GameManager } from "./GameManager"
import { ObjectPool } from "../utils/ObjectPool"
import { Time } from "../engine/system/Time"
import { Node } from "../engine/system/Node"
import { Canvas } from "../engine/system/Canvas"
import { Physic } from "../engine/components/Physic"
import { Sprite } from "../engine/components/Sprite"

const PIPE_VELOCITTY = new Vector2(-1.7, 0)

export class PipeSpawner extends Node {
    private spawnPos: Vector2
    private spawnBetweenTime: number
    private spawnTimer: number
    private pipes: Pipe[]
    private birdCollider: Collider
    private pipePool: ObjectPool<Pipe>

    constructor(spawnPos: Vector2, bird: Bird) {
        super('Pipe Spawner')
        this.spawnPos = spawnPos
        this.spawnBetweenTime = 1
        this.spawnTimer = this.spawnBetweenTime
        this.pipes = []
        this.birdCollider = bird.getComponent('Collider') as Collider

        this.pipePool = new ObjectPool<Pipe>(
            () => {
                const pipe = new Pipe()
                pipe.parent = this;
                (pipe.getComponent('Physic') as Physic).velocity = PIPE_VELOCITTY
                this.pipes.push(pipe)
                return pipe
            },
            (obj) => {
                obj.transform.position = new Vector2(this.spawnPos.x, this.spawnPos.y)
                obj.setActive(false)
            }
        )
    }

    public update() {
        this.spawnTimer -= Time.deltaTime

        if (this.spawnTimer < 0) {
            this.spawnTimer = this.spawnBetweenTime
            this.spawn()
        }

        for (let i = 0; i < this.pipes.length; i++) {

            if (!this.pipes[i].getIsCount() && this.pipes[i].transform.position.x < 0) {
                this.pipes[i].setIsCount(true)
                ScoreManager.Instance().increaseScore()
            }

            if (this.pipes) {
                if ((this.pipes[i].getComponent('Collider') as Collider).isTouch(this.birdCollider)) {
                    (GameManager.Instance() as GameManager).updateGameState("GameOver")
                }
            }

            if (this.pipes[i].active && this.pipes[i].transform.position.x + 50 < -Canvas.size.x) {
                this.pipePool.release(this.pipes[i])
            }
        }
    }

    public clear(): void {
        for (let i = 0; i < this.pipes.length; i++) {
            this.pipePool.release(this.pipes[i])
        }
    }

    public setIsSpawn(isActive: boolean): void {
        this.setActive(isActive)
        for (const pipe of this.pipes) {
            (pipe.getComponent('Physic') as Physic).velocity = isActive ? PIPE_VELOCITTY : Vector2.zero
        }
    }

    private spawn(): void {
        const pipeUp = this.pipePool.get()
        pipeUp.setActive(true)
        pipeUp.setIsCount(true);
        (pipeUp.getComponent('Sprite') as Sprite).flipY = false
        pipeUp.transform.position = new Vector2(this.spawnPos.x, Utils.Random(50, 180))

        const pipeDown = this.pipePool.get()
        pipeDown.transform.position = new Vector2(this.spawnPos.x, pipeUp.transform.position.y - 430)
        pipeDown.setActive(true)
        pipeDown.setIsCount(false);
        (pipeDown.getComponent('Sprite') as Sprite).flipY = true
    }
}