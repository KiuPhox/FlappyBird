import { GameObject } from "./GameObject"

export class Message extends GameObject {
    constructor() {
        super()
        this._image.src = "assets/images/message.png"
    }
}