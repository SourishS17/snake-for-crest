# Setting up radio function to play snake
radio.set_group(1)
# Setting up the LED strip
strip = neopixel.create(DigitalPin.P0, 144, NeoPixelMode.RGB)
# Setting up initial variables
size = 3
score = 0
alive = True
start = False
cur = 67
# Setting up colours for the game
headcolour = neopixel.rgb(0, 150, 255)
maincolour = neopixel.rgb(0, 200, 255)
applecolour = neopixel.rgb(255, 0, 0)
# Setting up the 2D array coordinate grid
grid: List[List[number]] = []
# Working through each row
for row in range(12):
    currow = []
    # Adding the indices from the current row
    num = 12 * row
    while num < (row + 1) * 12:
        currow.append(num)
        num += 1
    # Reverse the direction of the indices on alternating rows
    if row % 2 == 1:
        currow.reverse()
    grid.append(currow)
# Setting up coodinate locations
snakepos = [[2, 5], [3, 5], [4, 5]]
head = snakepos[len(snakepos) - 1]
applepos = [8, 5]
# Direction coordinate changes
dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]]
# Direction; 0 - up, 1 - right, 2 - down, 3 - left
dir2 = 1
# Starting position

def on_for_each(pos):
    pass
snakepos.slice(0, -1).for_each(on_for_each)

strip.range(grid[head[1]][head[0]], 1).show_color(headcolour)
strip.range(grid[applepos[1]][applepos[0]], 1).show_color(applecolour)
start = True
# Loop for radio signals
while not (start):
    # Wait until radio signal arrives to begin
    
    def on_received_value(name, value):
        global start
        if name == "start" and value == 1:
            start = True
    radio.on_received_value(on_received_value)
    

def on_forever():
    # Only run once the game has started
    if start:
        # Radio directions
        
        def on_received_value2(name2, value2):
            global dir2
            if name2 == "dir" and value2 == 1:
                dir2 += 1
            elif name2 == "dir" and value2 == -1:
                dir2 -= 1
            dir2 %= 4
        radio.on_received_value(on_received_value2)
        
basic.forever(on_forever)

# Main game
# Run at regular intervals for time delay between snake moving

def on_every_interval():
    global alive, score, size, snakepos
    # Only run if the game is active
    if alive and start:
        # Moving the snake
        strip.range(grid[head[1]][head[0]], 1).show_color(maincolour)
        head[0] += dirs[dir2][0]
        head[1] += dirs[dir2][1]
        snakepos.append(head)
        # Checking if the snake is out of bounds
        if head[0] < 0 or head[0] > 11 or head[1] < 0 or head[1] > 11:
            alive = False
            strip.clear()
            strip.show()
            radio.send_value("score", score)
        else:
            # Checking if the snake gets the apple
            def on_some(x):
                pass
            if snakepos.some(on_some):
                score += 1
                size += 1
                # Generating new valid apple positions
                def on_some2(x2):
                    pass
                while snakepos.some(on_some2):
                    applepos[0] = randint(0, 11)
                    applepos[1] = randint(0, 11)
                strip.range(grid[applepos[1]][applepos[0]], 1).show_color(applecolour)
            else:
                # Don't increase snake size if apple not collected
                strip.range(grid[snakepos[0][1]][snakepos[0][0]], 1).clear()
                snakepos = snakepos.slice(1)
            # Update snake
            strip.range(grid[head[1]][head[0]], 1).show_color(headcolour)
loops.every_interval(1000, on_every_interval)
