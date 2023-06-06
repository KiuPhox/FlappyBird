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
        this.objectsToRender.sort((a, b) => b.priority - a.priority)
    }

    public remove(gameObject: GameObject) {
        const index = this.objectsToRender.findIndex((item) => item.gameObject === gameObject)
        if (index !== -1) {
            this.objectsToRender.splice(index, 1)
        }
        this.objectsToRender.sort((a, b) => b.priority - a.priority)
    }

    public clear() {
        this.objectsToRender.length = 0
        CanvasView.getInstance().clear()
    }

    public render(): void {
        //console.log(this.objectsToRender.length)
        for (const { gameObject } of this.objectsToRender) {
            this.view.draw(gameObject)
        }
    }
}