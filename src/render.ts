import { CanvasView } from "./CanvasView"
import { GameObject } from "./games/GameObject"

type RenderObject = {
    gameObject: GameObject
    priority: number
}

export class Render {
    private view: CanvasView = CanvasView.getInstance()
    private objectsToRender: RenderObject[]
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
        this.sort()
    }

    public remove(gameObject: GameObject) {
        const index = this.objectsToRender.findIndex((item) => item.gameObject === gameObject)
        if (index !== -1) {
            this.objectsToRender.splice(index, 1)
        }
        this.sort()
    }

    private sort(): void {
        this.objectsToRender.sort((a, b) => b.priority - a.priority)
    }

    public clear(): void {
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