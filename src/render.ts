import { CanvasView } from "./CanvasView"
import { Sprite } from "./components/Sprite"
import { GameObject } from "./games/GameObject"

export class Render {
    private view: CanvasView = CanvasView.getInstance()
    private objects: GameObject[]
    private static instance: Render

    constructor() {
        this.objects = []
    }

    public static getInstance(): Render {
        if (!Render.instance) {
            Render.instance = new Render()
        }
        return Render.instance
    }

    public add(gameObject: GameObject): void {
        if (gameObject.getComponent('Sprite') != null) {
            this.objects.push(gameObject)
            this.sort()
        }
    }

    public remove(gameObject: GameObject) {
        const index = this.objects.indexOf(gameObject)
        if (index !== -1) {
            this.objects.splice(index, 1)
        }
        this.sort()
    }

    private sort(): void {
        this.objects.sort((a, b) => (b.getComponent('Sprite') as Sprite).order - (a.getComponent('Sprite') as Sprite).order)
    }

    public clear(): void {
        this.objects.length = 0
        CanvasView.getInstance().clear()
    }

    public render(): void {
        for (const gameObject of this.objects) {
            this.view.draw(gameObject)
        }
    }
}