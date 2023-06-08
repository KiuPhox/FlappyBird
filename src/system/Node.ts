import { Game } from "../game"

export abstract class Node {
    public name: string
    public parent: Node | null = null
    public children: Node[] = []
    private isActive: boolean

    constructor(name: string) {
        this.name = name
        Game.registerNode(this)
        this.isActive = true
    }

    public start(): void {
        // Start
    }

    public update(): void {
        // Update
    }

    public executeStart(): void {
        this.start()
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].executeStart()
        }
    }

    public executeUpdate(): void {
        if (!this.active) return
        this.update()
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].executeUpdate()
        }
    }

    public setChild(childNode: Node) {
        if (this.children.includes(childNode)) return
        this.children.push(childNode)
        childNode.parent = this
    }

    public setParent(parentNode: Node) {
        parentNode.setChild(this)
    }

    get active(): boolean { return this.isActive }
    public setActive(value: boolean): void { this.isActive = value }
}