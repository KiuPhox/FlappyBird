import { Bird } from "../../games/Bird"
import { Command } from "../../types/general"

export default class JumpCommand implements Command {
    private readonly bird: Bird

    constructor(bird: Bird) {
        this.bird = bird
    }

    execute(): void {
        this.bird.jump()
    }
}