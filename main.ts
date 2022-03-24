// Setting up radio function to play snake
radio.setGroup(1)

// Setting up the LED strip
let strip = neopixel.create(DigitalPin.P0, 144, NeoPixelMode.RGB)

// Setting up initial variables
let size = 3
let score = 0
let alive = true
let start = false
let cur = 67

// Setting up colours for the game
let headcolour = neopixel.rgb(0, 150, 255)
let maincolour = neopixel.rgb(0, 200, 255)
let applecolour = neopixel.rgb(255, 0, 0)

// Setting up the 2D array coordinate grid
let grid:number[][]

// Working through each row
for (let row = 0; row < 12; row ++) {

    let currow = []

    // Adding the indices from the current row
    for (let num = 12*row; num < num + 12; num ++) {
        currow.push(num)
    }

    // Reverse the direction of the indices on alternating rows
    if (row % 2 === 1) {
        currow.reverse()
    }

    grid.push(currow)
}

// Setting up coodinate locations
let snakepos = [[2, 5], [3, 5], [4, 5]]
let head = snakepos[snakepos.length - 1]
let applepos = [8, 5]

// Direction coordinate changes
let dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]]
// Direction; 0 - up, 1 - right, 2 - down, 3 - left
let dir = 1

// Starting position
snakepos.slice(0, -1).forEach(pos => strip.range(grid[pos[1]][pos[0]], 1).showColor(maincolour))
strip.range(grid[head[1]][head[0]], 1).showColor(headcolour)
strip.range(grid[applepos[1]][applepos[0]], 1).showColor(applecolour)

// while loop for radio signals
while (!(start)) {

    // Wait until radio signal arrives to begin
    radio.onReceivedValue(function (name: string, value: number) {
        if (name === "start" && value === 1) {
            start = true
        }
    })
}

while (start) {

    // Radio directions
    radio.onReceivedValue(function (name: string, value: number) {
        if (name === "dir" && value === 1) {
            dir ++
        } else if (name === "dir" && value == -1) {
            dir --
        }
        dir %= 4
    })

}


// Main game
while (alive && start) {
    
    basic.pause(1000)


    snakepos = snakepos.slice(1)
    let cur = snakepos[snakepos.length - 1]
    


    
}