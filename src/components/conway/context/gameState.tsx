import { createContext } from 'react'

export enum gameStates {
    PAUSED,
    RUNNING,
    RESET,
    STEP,
}

export const gameStateContext = createContext<{gameState : gameStates, updateGameState : (state: gameStates) => void}>({gameState: gameStates.PAUSED, updateGameState: (state: gameStates) => {state}})
