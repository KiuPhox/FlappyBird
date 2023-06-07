import { Action } from "../../types/general"

export class Event {
    private listeners: Action<any>[] = []

    public subscribe(listener: Action<any>): void {
        this.listeners.push(listener)
    }

    public unsubscribe(listener: Action<any>): void {
        const index = this.listeners.indexOf(listener)
        if (index !== -1) {
            this.listeners.splice(index, 1)
        }
    }

    public invoke(arg: any): void {
        for (const listener of this.listeners) {
            listener(arg)
        }
    }
}

