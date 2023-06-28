import { useContext } from 'react'

import { gameStates, gameStateContext } from "../../context/gameState"

export default function StepButton() {
    const { gameState, updateGameState } = useContext(gameStateContext)

    switch(gameState) {
        case gameStates.RUNNING: return (
            <button id="play-button" disabled>
                <span>Clear</span>
            </button>
        )
        default: return (
            <button id="play-button" onClick={()=>updateGameState(gameStates.RESET)}>
                <span>Clear</span>
            </button>
        )
    }
    
}