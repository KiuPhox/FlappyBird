import { Vector2 } from "../utils/Vector2"
import { Pipe } from "./Pipe"
import { Utils } from "../utils/Utils"
import { ScoreManager } from "./ScoreManager"
import { ObjectPool } from "../utils/ObjectPool"
import { Time } from "../engine/system/Time"
import { Node } from "../engine/system/Node"
import { Canvas } from "../engine/system/Canvas"
import { RigidBody } from "../engine/components/RigidBody"
import { Sprite } from "../engine/components/Sprite"
import { GameState } from "../types/general"
import { GameManager } from "./GameManager"

const PIPE_VELOCITTY = new Vector2(-1.7, 0)

export class PipeSpawner extends Node {
    private spawnPos: Vector2
    private spawnBetweenTime: number
    private spawnTimer: number
    private pipes: Pipe[]
    private pipePool: ObjectPool<Pipe>

    constructor() {
        super('Pipe Spawner')
        this.spawnPos = new Vector2(Canvas.size.x / 2 + 50, 0)
        this.spawnBetweenTime = 1
        this.spawnTimer = this.spawnBetweenTime
        this.pipes = []

        this.pipePool = new ObjectPool<Pipe>(
            () => {
                const pipe = new Pipe()
                pipe.parent = this;
                (pipe.getComponent('RigidBody') as RigidBody).velocity = PIPE_VELOCITTY
                this.pipes.push(pipe)
                return pipe
            },
            (obj) => {
                obj.transform.position = new Vector2(this.spawnPos.x, this.spawnPos.y)
                obj.setActive(false)
            }
        )

        GameManager.OnGameStateChanged.subscribe(this.OnGameStateChanged)
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
                ScoreManager.increaseScore()
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
            (pipe.getComponent('RigidBody') as RigidBody).velocity = isActive ? PIPE_VELOCITTY : Vector2.zero
        }
    }

    private spawn(): void {
        // Create pipe has up direction
        const pipeUp = this.pipePool.get()
        pipeUp.setActive(true)
        pipeUp.setIsCount(true);
        (pipeUp.getComponent('Sprite') as Sprite).flipY = false
        pipeUp.transform.position = new Vector2(this.spawnPos.x, Utils.Random(60, 220))

        // Create pipe has down direction
        const pipeDown = this.pipePool.get()
        pipeDown.transform.position = new Vector2(this.spawnPos.x, pipeUp.transform.position.y - 430)
        pipeDown.setActive(true)
        pipeDown.setIsCount(false);
        (pipeDown.getComponent('Sprite') as Sprite).flipY = true
    }

    OnGameStateChanged = (gameState: GameState) => {
        switch (gameState){
            case 'Idle':
                this.clear()
                this.setActive(false)
                break
            case 'Start':
                this.setIsSpawn(true)
                break
            case 'GameOver':
                this.setIsSpawn(false)
                break
        }
    }
}