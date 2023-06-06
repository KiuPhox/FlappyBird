
import { GameObject } from "./GameObject"

export class GameOver extends GameObject {

    constructor() {
        super()
        this.objectImage.src = "assets/images/gameover.png"
    }
}