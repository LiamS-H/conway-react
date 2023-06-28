import { useState, useEffect, useCallback } from 'react'
import conwayIteration from '../../services/conway-iteration'

import { ConwayTile, tiles } from './tile';

import Navbar from './navbar';

import {gameStates, gameStateContext} from './context/gameState'

import './grid.css'

export default ConwayGrid

function ConwayGrid(props : {height : number, width: number}) {
    const height = props.height;
    const width = props.width;

    // console.log("grid rendering")

    const [gameState, updateGameState] = useState<gameStates>(gameStates.PAUSED)
    const context = {gameState, updateGameState}

    const [selected, updateSelected] = useState(-1)

    const [paintMode, updatePaintMode] = useState(-1)

    const [grid, setGrid] = useState([...Array(height)].map(() => Array(width).fill(0))) //fast intialization of array

    function changeGrid(x : number, y : number, newValue : number) {
        const newGrid = [...grid]
        newGrid[y][x] = newValue
        setGrid(newGrid)
        // console.log(grid)
    }

    useEffect(()=>{
        paint()
    }, [selected])

    useEffect(()=>{
        switch (gameState) {
            case gameStates.RUNNING:
                let timer = setInterval(step, 100)
                return ()=>clearInterval(timer)
            case gameStates.RESET:
                setGrid([...Array(height)].map(() => Array(width).fill(0))) //fast intialization of array
                updateGameState(gameStates.PAUSED)
                break
            case gameStates.STEP:
                step()
                updateGameState(gameStates.PAUSED)
                break
        }
    }, [gameState])
    
    function paint() : void {
        if (gameState != gameStates.PAUSED) {
            // console.log("can't paint unless paused")
            return
        } 

        if (selected == -1) {
            updatePaintMode(-1)
            return
        }

        if (paintMode == -1) {
            return
        }

        const x = selected % width
        const y = Math.floor(selected / width)

        changeGrid(x,y,paintMode);

    }

    function startPaint() {
        if (gameState != gameStates.PAUSED) {
            return
        } 

        const x = selected % width
        const y = Math.floor(selected / width)

        const newMode = ((grid[y][x])+1)%tiles
        updatePaintMode(newMode)
        changeGrid(x,y,newMode);
    }

    const disp_array = grid.map(
        (row, y) => (
            <tr className = "row" key={`row:${y}`} id={`row:${y}`}>
                {row.map(
                    (ele, x)=>{
                        let index = y*width + x
                        const setSelected = useCallback(() => {
                            updateSelected(index)
                        },[])
                        return(
                        <ConwayTile
                            key={index}
                            index={index}
                            value={ele}
                            updateSelected={setSelected}
                        />
                    )}
                )}
            </tr>
        )
    );

    function step() {
        setGrid((grid)=>conwayIteration(grid))
    }

    return (
    <>
        <gameStateContext.Provider value={context}><Navbar/> </gameStateContext.Provider>
        <div className='tile-array'
            onMouseLeave={()=>updateSelected(-1)}
            onMouseUp={()=>updatePaintMode(-1)}
        >
            <table >
                <caption>Conway's Game of Life</caption>
                <tbody onMouseDown={startPaint}>
                    {disp_array}
                </tbody>
            </table>
        </div>
    </>
    )
}