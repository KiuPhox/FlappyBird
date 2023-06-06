import { GameObject } from "./game_objects/GameObject"
import { Render } from "./render"

export class Score {
    private _score: number
    private static instance: Score
    private digits: GameObject[]
    private highScore: number

    constructor(_score: number) {
        this._score = _score
        this.highScore = 0

        this.digits = Array.from({ length: 4 }, () => new GameObject())
        this.digits[0].image.src = "/assets/images/0.png"
        this.digits[1].image.src = "/assets/images/0.png"
        this.digits[2].image.src = "/assets/images/0.png"
        this.digits[3].image.src = "/assets/images/0.png"


        this.digits[0].pos = { x: 120, y: 30 }
        this.digits[1].pos = { x: this.digits[0].pos.x + 25, y: 30 }

        this.digits[2].pos = { x: 145, y: 70 }
        this.digits[3].pos = { x: 130, y: 70 }

        this.digits[2].Scale = 0.6
        this.digits[3].Scale = 0.6

        Render.getInstance().add(this.digits[0], 0)
        Render.getInstance().add(this.digits[1], 0)
        Render.getInstance().add(this.digits[2], 0)
        Render.getInstance().add(this.digits[3], 0)
    }

    public reset() {
        this._score = 0
        this.numberToDigits()
    }

    public static getInstance(): Score {
        if (!Score.instance) {
            Score.instance = new Score(0)
        }
        return Score.instance
    }

    get score(): number {
        return this._score
    }

    public increaseScore(): void {
        this._score++
        if (this.score > this.highScore) {
            this.highScore = this.score
        }
        this.display()
    }

    private display(): void {
        this.numberToDigits()
    }

    private numberToDigits() {
        this.digits[1].image.src = `/assets/images/${this._score % 10}.png`
        this.digits[0].image.src = `/assets/images/${Math.floor(this._score / 10)}.png`
        this.digits[2].image.src = `/assets/images/${this.highScore % 10}.png`
        this.digits[3].image.src = `/assets/images/${Math.floor(this.highScore / 10)}.png`
    }
}

Score.getInstance()