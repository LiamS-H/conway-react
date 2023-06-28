import {memo} from 'react'

import './tile.css'

export const tiles = 2;

function tileset(id : number) {
    switch(id) {
        case 0: return "dead"
        case 1: return "alive"
    }
    return "";
}

export const ConwayTile = memo((props: {index : number, value : number, updateSelected : Function}) => {
    // console.log(`rendering: ${props.index}`)

    function updateSelected() {
        props.updateSelected()
    }


    return (
        <td 
            className={`tile ${tileset(props.value)}`}

            onMouseEnter={updateSelected}
            
            onDragStart={(event)=>{
                event.preventDefault();
                return false;
            }}
        >
        </td>
    )
})