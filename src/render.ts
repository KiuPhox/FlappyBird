import { CanvasView } from "./CanvasView"
import { GameObject } from "./game_objects/GameObject"


export class Render {
    private view: CanvasView = CanvasView.getInstance()
    private objectsToRender: { gameObject: GameObject, priority: number }[]
    private static instance: Render

    constructor() {
        this.objectsToRender = []
    }

    public static getInstance(): Render {
        if (!Render.instance) {
            Render.instance = new Render()
        }
        return Render.instance
    }

    public add(gameObject: GameObject, priority: number) {
        this.objectsToRender.push({ gameObject: gameObject, priority: priority })
    }

    public render(): void {
        this.objectsToRender.sort((a, b) => b.priority - a.priority)
        for (const { gameObject } of this.objectsToRender) {
            this.view.draw(gameObject)
        }
    }
}