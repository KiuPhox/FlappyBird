import { Component } from "../components/Component"
import { Vector2 } from "../utils/Vector2"

export type Transform = {
    position: Vector2
    rotation: number
    scale: number
}


export class GameObject {
    private _transform: Transform
    private components: { [key: string]: Component }

    constructor() {
        this._transform = {
            position: Vector2.zero,
            rotation: 0,
            scale: 1
        }
        this.components = {}
    }

    get transform(): Transform { return this._transform }

    public update(delta: number): void {
        for (const key in this.components) {
            this.components[key].update(delta)
        }
    }

    public addComponent(component: Component): void {
        this.components[component.name] = component
    }

    public getComponent(name: string): Component {
        return this.components[name]
    }
}