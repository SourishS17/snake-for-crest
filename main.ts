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
let headcolour = neopixel.rgb(0, 50, 255)
let maincolour = neopixel.rgb(0, 200, 255)
let applecolour = neopixel.rgb(255, 0, 0)

// Setting up the 2D array coordinate grid
const grid:number[][] = []

// Working through each row
for (let row = 0; row < 12; row ++) {

    const currow = []

    // Adding the indices from the current row
    for (let num = 12 * row; num < (row + 1)*12; num ++) {
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
let head = [4, 5]
let applepos = [8, 5]

// Functioanl to generate new apple coordinates
const test = (a: Array<number>) => !(a[0] == applepos[0] && a[1] == applepos[1])

// Direction coordinate changes
let dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]]
// Direction; 0 - up, 1 - right, 2 - down, 3 - left
let dir = 1

// Starting position
snakepos.slice(0, -1).forEach(pos => strip.range(grid[pos[1]][pos[0]], 1).showColor(maincolour))
strip.range(grid[head[1]][head[0]], 1).showColor(headcolour)
strip.range(grid[applepos[1]][applepos[0]], 1).showColor(applecolour)

// Loop for radio signals
basic.forever(function() {
    if (!(start)) {

        // Wait until radio signal arrives to begin
        radio.onReceivedValue(function (name: string, value: number) {
            if (name === "start" && value === 1) {
                start = true
            }
        })
    }
})


basic.forever(function () {

    // Only run once the game has started
    if (start) {

        // Radio directions
        radio.onReceivedValue(function (name: string, value: number) {
            if (name === "dir") {
                dir = value
            }
        })
        
    }
})


// Main game
// Run at regular intervals for time delay between snake moving
loops.everyInterval(350, function () {
    
    // Only run if the game is active
    if (alive && start) {


        // Moving the snake
        strip.range(grid[head[1]][head[0]], 1).showColor(maincolour)
        head = [snakepos[snakepos.length - 1][0], snakepos[snakepos.length - 1][1]]
        head[0] += dirs[dir][0]
        head[1] += dirs[dir][1]
        snakepos.push(head)
        strip.range(grid[head[1]][head[0]], 1).showColor(headcolour)

        // Checking if the snake is out of bounds
        if (head[0] < 0 || head[0] > 11 || head[1] < 0 || head[1] > 11) {
            alive = false
            strip.showColor((0,0,0))
            radio.sendValue("score", score)

        } else {

            // Checking if the snake gets the apple
            if (head[0] === applepos[0] && head[1] === applepos[1]) {
                //applepos=[5,9]
                score ++
                size ++
                while (snakepos.every(test)) {
                    applepos = [randint(0, 11), randint(0, 11)]
                }
                applepos = [randint(0, 11),randint(0, 11)]
                strip.range(grid[applepos[1]][applepos[0]], 1).showColor(applecolour)


            } else {
                // Don't increase snake size if apple not collected
                strip.range(grid[snakepos[0][1]][snakepos[0][0]], 1).showColor((0,0,0))
                snakepos = snakepos.slice(1)
            }


            // Update snake
            //strip.range(grid[head[1]][head[0]], 1).showColor(headcolour)
        }
    }
})


