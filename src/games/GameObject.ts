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
    private isActive: boolean

    constructor() {
        this._transform = {
            position: Vector2.zero,
            rotation: 0,
            scale: 1
        }
        this.isActive = true
        this.components = {}
    }

    get transform(): Transform { return this._transform }

    public update(delta: number): void {
        for (const key in this.components) {
            if (this.active) {
                this.components[key].update(delta)
            }
        }
    }

    public addComponent(component: Component): void {
        this.components[component.name] = component
    }

    public getComponent(name: string): Component {
        return this.components[name]
    }

    get active(): boolean { return this.isActive }
    public setActive(value: boolean): void { this.isActive = value }
}