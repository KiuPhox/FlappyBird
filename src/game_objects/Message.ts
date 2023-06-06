import { GameObject } from "./GameObject"

export class Message extends GameObject {
    constructor() {
        super()
        this.objectImage.src = "assets/images/message.png"
    }
}