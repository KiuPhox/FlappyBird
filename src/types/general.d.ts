
export type GameState = "Idle" | "Start" | "GameOver"

export type GameStateUpdateHandler = (newState: GameState) => void;