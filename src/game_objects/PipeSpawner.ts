import { Render } from "../render"
import { Vector } from "../types/general"
import { Pipe } from "./Pipe"

export class PipeSpawner {
    private spawnPos: Vector
    private spawnBetweenTime: number
    private spawnTimer: number
    private pipes: Pipe[]

    constructor(spawnPos: Vector) {
        this.spawnPos = spawnPos
        this.spawnBetweenTime = 1
        this.spawnTimer = this.spawnBetweenTime
        this.pipes = []
    }

    public update(delta: number) {
        this.spawnTimer -= delta
        if (this.spawnTimer < 0) {
            this.spawnTimer = this.spawnBetweenTime
            this.spawn()
        }

        for (let i = 0; i < this.pipes.length; i++) {
            this.pipes[i].move()
        }
    }
    private spawn() {
        const pipeUp = new Pipe({ x: this.spawnPos.x, y: this.getRandomNumber(200, 400) })
        const pipeDown = new Pipe({ x: this.spawnPos.x, y: pipeUp.pos.y - 450 })

        pipeUp.setVelocity({ x: -1, y: 0 })
        pipeDown.setVelocity({ x: -1, y: 0 })

        pipeDown.setRotation(180)

        this.pipes.push(pipeUp)
        this.pipes.push(pipeDown)

        Render.getInstance().add(pipeUp, 0)
        Render.getInstance().add(pipeDown, 0)
    }

    private getRandomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min
    }
}