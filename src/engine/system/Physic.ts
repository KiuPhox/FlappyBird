import { Collider } from "../components/Collider"

export class Physic {
    private static colliders: Collider[] = []

    public static registerCollider(collider: Collider) {
        Physic.colliders.push(collider)
    }

    public static update() {
        for (let i = 0; i < Physic.colliders.length - 1; i++) {
            for (let j = i + 1; j < Physic.colliders.length; j++) {
                if (this.checkCollider(Physic.colliders[i], Physic.colliders[j])) {
                    Physic.colliders[i].callbackEvent(this.colliders[j])
                    Physic.colliders[j].callbackEvent(this.colliders[i])
                }
            }
        }
    }

    private static checkCollider(a: Collider, b: Collider): boolean {
        const aPos = a.gameObject.transform.position
        const bPos = b.gameObject.transform.position

        return (
            aPos.x + a.size.x / 2 > bPos.x - b.size.x / 2 &&
            aPos.x - a.size.x / 2 < bPos.x + b.size.x / 2 &&
            aPos.y + a.size.y / 2 > bPos.y - b.size.y / 2 &&
            aPos.y - a.size.y / 2 < bPos.y + b.size.y / 2
        )
    }
}