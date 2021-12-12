// Setting up radio function to play snake
radio.setGroup(1)

// Setting up the LED strip
let strip = neopixel.create(DigitalPin.P0, 144, NeoPixelMode.RGB)

// Setting up initial variables
let size = 3
let score = 0
let alive = true

// Setting up colours for the game
let headcolour = neopixel.rgb(0, 150, 255)
let maincolour = neopixel.rgb(0, 200, 255)
let applecolour = neopixel.rgb(255, 0, 0)

// Setting up locations
let snakepos = [69, 68, 67]
let applepos = 63

// Direction; 0 - up, 1 - right, 2 - down, 3 - left
let dir = 1

snakepos.forEach(pos => );

while (alive){
    


    basic.pause(500)
}