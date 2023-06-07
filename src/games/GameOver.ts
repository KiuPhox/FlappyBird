
import { GameObject } from "./GameObject"

export class GameOver extends GameObject {

    constructor() {
        super()
        this._image.src = "assets/images/gameover.png"
    }
}