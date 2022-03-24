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

// Setting up locations
let snakepos = [69, 68, 67]
let applepos = 63

// Setting up the 2D array coordinate grid
let grid = []
for (let row = 0; row < 12; row ++) {

    let currow = []
    for (let num = 12*row; num < num + 12; num ++) {
        currow.push(num)
    }
    if (row % 2 === 1) {
        currow.reverse()
    }

    grid.push(currow)

}


// Direction; 0 - up, 1 - right, 2 - down, 3 - left
let dir = 1

// Starting position
snakepos.slice(0, -1).forEach(pos => strip.range(pos, 1).showColor(maincolour))
strip.range(snakepos[snakepos.length - 1], 1).showColor(headcolour)
strip.range(applepos, 1).showColor(applecolour)

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
    cur = snakepos[snakepos.length - 1]
    


    
}