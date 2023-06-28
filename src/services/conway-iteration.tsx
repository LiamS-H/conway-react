function mod(n : number, m : number) : number {
    return ((n % m) + m) % m;
}

export default function conwayIteration(grid : number[][]) : number[][] {
    const width = grid[0].length
    const height = grid.length
    const offsets = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]]

    const updateMatte : Boolean[][] = [...Array(height)].map(() => Array(width).fill(false))

    for(let y=0;y<height;y++) {
        for(let x=0;x<width;x++) {
            if(grid[y][x] == 0) continue;
            
            updateMatte[y][x] = true;
            
            for(let [xOff, yOff] of offsets) {
                const spreadY = mod(y + yOff, height);
                const spreadX = mod(x + xOff, width);

                updateMatte[spreadY][spreadX] = true;
            }
        }
    }

    const nextGrid : number[][] = [...Array(height)].map(() => Array(width).fill(0))

    for(let y=0;y<height;y++) {
        for(let x=0;x<width;x++) {
            if(updateMatte[y][x] == false) continue;
            
            let adjAlive = 0;
            for(let [xOff, yOff] of offsets) {
                const searchY = mod(y + yOff, height);
                const searchX = mod(x + xOff, width);

                if (grid[searchY][searchX] == 0) continue;
                adjAlive++;
                if (adjAlive >= 4) break;
            }

            if (adjAlive == 3) {nextGrid[y][x] = 1; continue;}
            if (adjAlive == 2 && grid[y][x] != 0) {nextGrid[y][x] = 1; continue;}
        }
    }


    return nextGrid;
}