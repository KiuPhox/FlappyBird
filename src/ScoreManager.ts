import { Sprite } from "./components/Sprite"
import { GameObject } from "./games/GameObject"
import { Vector2 } from "./utils/Vector2"

export class ScoreManager {
    private _score: number
    private static instance: ScoreManager
    private digits: GameObject[]
    private sprites: Sprite[]
    private highScore: number

    constructor(_score: number) {
        this._score = _score
        this.highScore = 0

        this.digits = Array.from({ length: 4 }, () => new GameObject())
        this.sprites = []

        for (let i = 0; i < this.digits.length; i) {
            this.sprites[i] = new Sprite(this.digits[i], 0)
            this.digits[i].addComponent(this.sprites[i])
            this.sprites[i].setSprite("/assets/images/0.png")
        }


        this.digits[0].transform.position = new Vector2(120, 30)
        this.digits[1].transform.position = new Vector2(this.digits[0].transform.position.x + 25, 30)

        this.digits[2].transform.position = new Vector2(145, 70)
        this.digits[3].transform.position = new Vector2(130, 70)

        this.digits[2].transform.scale = 0.6
        this.digits[3].transform.scale = 0.6

        // Render.getInstance().add(this.digits[0], 0)
        // Render.getInstance().add(this.digits[1], 0)
        // Render.getInstance().add(this.digits[2], 0)
        // Render.getInstance().add(this.digits[3], 0)
    }

    public reset(): void {
        // this._score = 0
        // this.numberToDigits()
    }

    public static Instance(): ScoreManager {
        if (!ScoreManager.instance) {
            ScoreManager.instance = new ScoreManager(0)
        }
        return ScoreManager.instance
    }

    public increaseScore(): void {
        this._score++
        if (this._score > this.highScore) {
            this.highScore = this._score
        }
        this.display()
    }

    private display(): void {
        this.numberToDigits()
    }

    private numberToDigits(): void {
        this.sprites[1].setSprite(`/assets/images/${this._score % 10}.png`)
        this.sprites[0].setSprite(`/assets/images/${Math.floor(this._score / 10)}.png`)
        this.sprites[2].setSprite(`/assets/images/${this.highScore % 10}.png`)
        this.sprites[3].setSprite(`/assets/images/${Math.floor(this.highScore / 10)}.png`)
        // this.digits[0].image.src = `/assets/images/${Math.floor(this._score / 10)}.png`
        // this.digits[2].image.src = `/assets/images/${this.highScore % 10}.png`
        // this.digits[3].image.src = `/assets/images/${Math.floor(this.highScore / 10)}.png`
    }
}

