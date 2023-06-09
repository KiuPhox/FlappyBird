import { Sprite } from "../engine/components/Sprite"
import { GameObject } from "./GameObject"
import { Vector2 } from "../utils/Vector2"

export class ScoreManager {
    private static score: number
    private static digits: GameObject[]
    private static sprites: Sprite[]
    private static highScore: number

    public static init(_score: number){
        this.score = _score
        this.highScore = 0

        this.digits = Array.from({ length: 4 }, () => new GameObject('ScoreDigit'))
        this.sprites = []

        for (let i = 0; i < this.digits.length; i++) {
            this.sprites[i] = new Sprite(this.digits[i], 0)
            this.digits[i].addComponent(this.sprites[i])
            this.sprites[i].setSprite("/assets/images/0.png")
        }


        this.digits[0].transform.position = new Vector2(-10, -200)
        this.digits[1].transform.position = new Vector2(this.digits[0].transform.position.x + 25, this.digits[0].transform.position.y)

        this.digits[2].transform.position = new Vector2(-5, -160)
        this.digits[3].transform.position = new Vector2(this.digits[2].transform.position.x + 15, this.digits[2].transform.position.y)

        this.digits[2].transform.scale = 0.6
        this.digits[3].transform.scale = 0.6
    }

    public static reset(): void {
        this.score = 0
        this.numberToDigits()
    }

    public static increaseScore(): void {
        this.score++
        if (this.score > this.highScore) {
            this.highScore = this.score
        }
        this.display()
    }

    private static display(): void {
        this.numberToDigits()
    }

    private static numberToDigits(): void {
        this.sprites[1].setSprite(`assets/images/${this.score % 10}.png`)
        this.sprites[0].setSprite(`assets/images/${Math.floor(this.score / 10)}.png`)
        this.sprites[3].setSprite(`assets/images/${this.highScore % 10}.png`)
        this.sprites[2].setSprite(`assets/images/${Math.floor(this.highScore / 10)}.png`)
    }
}

