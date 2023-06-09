import { Collider } from "../engine/components/Collider"
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
    public layer: string

    constructor(name: string) {
        super(name)
        this.transform = {
            position: new Vector2(0, 0),
            rotation: 0,
            scale: 1
        }
        this.layer = 'Default'
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

        if (component.name === 'Collider') {
            (component as Collider).OnCollisionStay.subscribe(this.OnCollisionStay);
            (component as Collider).OnTriggerStay.subscribe(this.OnTriggerStay)
        }
    }

    public getComponent(name: string): Component {
        return this.components[name]
    }

    public OnTriggerStay(collider: Collider): void {
        //
    }

    public OnCollisionStay(collider: Collider): void {
        //
    }
}