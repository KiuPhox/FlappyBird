import { Render } from "../render"
import { Vector } from "../types/general"
import { Pipe } from "./Pipe"
import { Bird } from "./Bird"
import { Game } from "../game"
import { Score } from "../Score"

export class PipeSpawner {
    private spawnPos: Vector
    private spawnBetweenTime: number
    private spawnTimer: number
    private pipes: Pipe[]
    private bird: Bird


    constructor(spawnPos: Vector, bird: Bird) {
        this.spawnPos = spawnPos
        this.spawnBetweenTime = 1
        this.spawnTimer = this.spawnBetweenTime
        this.pipes = []
        this.bird = bird

    }

    public update(delta: number) {
        this.spawnTimer -= delta
        if (this.spawnTimer < 0) {
            this.spawnTimer = this.spawnBetweenTime
            this.spawn()
        }

        for (let i = 0; i < this.pipes.length; i++) {
            this.pipes[i].move()

            if (!this.pipes[i].getIsCount() && this.pipes[i].center.x < 150) {
                this.pipes[i].setIsCount(true)
                Score.getInstance().increaseScore()
            }

            if (this.pipes[i].collider(this.bird)) {

                Game.getInstance().updateGameState("GameOver")
                console.log('Game Over')
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
        const pipeUp = new Pipe({ x: this.spawnPos.x, y: this.getRandomNumber(180, 380) }, true)
        const pipeDown = new Pipe({ x: this.spawnPos.x, y: pipeUp.pos.y - 450 }, false)

        pipeDown.rot = Math.PI

        this.pipes.push(pipeUp)
        this.pipes.push(pipeDown)

        Render.getInstance().add(pipeUp, 2)
        Render.getInstance().add(pipeDown, 2)
    }

    private getRandomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min
    }

}