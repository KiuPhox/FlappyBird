import { Button } from "./Button"

export class UIManager {
    private _buttons: Button[]
    private static instance: UIManager

    constructor() {
        this._buttons = []
    }

    public static Instance(): UIManager {
        if (!UIManager.instance) {
            UIManager.instance = new UIManager()
        }

        return UIManager.instance
    }

    public add(button: Button): void {
        this._buttons.push(button)
    }

    get buttons(): Button[] { return this._buttons }
}