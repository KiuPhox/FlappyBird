export type GameState = "Idle" | "Start" | "GameOver"

export type Action<T> = (arg: T) => void

export interface Command {
    execute(): void
}