export class Input {
    private static previousKeyStates: Set<string> = new Set<string>()
    private static isHeld: boolean
    private static isMouseDown: boolean

    public static init(): void {
        document.addEventListener('keydown', (event: KeyboardEvent) => this.handleKeyDown(event))
        document.addEventListener('keyup', (event: KeyboardEvent) => this.handleKeyUp(event))
        document.addEventListener('mousedown', (event: MouseEvent) => this.handleMouseDown())
        document.addEventListener('mouseup', (event: MouseEvent) => this.handleMouseUp())
        this.isHeld = false
    }

    public static getKeyDown(keyCode: string): boolean {
        return this.previousKeyStates.has(keyCode)
    }

    public static getMouseDown(): boolean {
        return this.isMouseDown
    }

    public static handleKeyDown(event: KeyboardEvent): void {
        const keyCode = event.code
        if (!this.isHeld && !this.previousKeyStates.has(keyCode)) {
            this.isHeld = true
            this.previousKeyStates.add(keyCode)
        }
    }

    public static handleKeyUp(event: KeyboardEvent): void {
        const keyCode = event.code
        this.isHeld = false
        if (this.previousKeyStates.has(keyCode)) {
            console.log('delete')
            this.previousKeyStates.delete(keyCode)
        }
    }

    public static handleMouseDown(): void {
        this.isMouseDown = true
    }

    public static handleMouseUp(): void {
        this.isMouseDown = false
    }

    public static reset() {
        this.previousKeyStates.clear()
        this.isMouseDown = false
    }
}