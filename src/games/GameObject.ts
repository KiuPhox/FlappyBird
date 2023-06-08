import { Component } from "../engine/components/Component"
import { Node } from "../engine/system/Node"
import { Vector2 } from "../utils/Vector2"


export type Transform = {
    position: Vector2
    rotation: number
    scale: number
}

export class GameObject extends Node {
    public transform: Transform
    private components: { [key: string]: Component }


    constructor() {
        super('GameObject')
        this.transform = {
            position: new Vector2(0, 0),
            rotation: 0,
            scale: 1
        }
        this.components = {}
    }

    public update(): void {
        super.update()
        for (const key in this.components) {
            if (this.active) {
                this.components[key].update()
            }
        }
    }

    public addComponent(component: Component): void {
        this.components[component.name] = component
    }

    public getComponent(name: string): Component {
        return this.components[name]
    }
}