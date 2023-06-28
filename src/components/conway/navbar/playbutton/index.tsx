import { useContext } from 'react'

import { gameStates, gameStateContext } from "../../context/gameState"

export default function PlayButton() {
    const { gameState, updateGameState } = useContext(gameStateContext)

    switch(gameState) {
        case gameStates.RUNNING: return (
            <button id="play-button" onClick={()=>updateGameState(gameStates.PAUSED)}>
                <span>⏸</span>
            </button>
        )
        default: return (
            <button id="play-button" onClick={()=>updateGameState(gameStates.RUNNING)}>
                <span>⏵</span>
            </button>
        )
    }
    
}