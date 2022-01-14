def Select_Mode():
    global car_mode
    if rec_data == "Q":
        car_mode = 1
    elif rec_data == "W":
        car_mode = 2
    elif rec_data == "E":
        car_mode = 3
    elif rec_data == "A":
        car_mode = 0
        k_Bit.car_stop()
def neo_water():
    for index in range(19):
        strip.set_pixel_color(index, neopixel.colors(NeoPixelColors.BLUE))
        strip.show()
        basic.pause(100)
    for index2 in range(19):
        strip.set_pixel_color(index2, neopixel.colors(NeoPixelColors.PURPLE))
        strip.show()
        basic.pause(100)
    for index3 in range(19):
        strip.set_pixel_color(index3, neopixel.colors(NeoPixelColors.WHITE))
        strip.show()
        basic.pause(100)

def on_bluetooth_connected():
    global connected, rec_data
    basic.show_icon(IconNames.HEART)
    connected = 1
    while connected == 1:
        rec_data = bluetooth.uart_read_until(serial.delimiters(Delimiters.HASH))
        serial.write_string(rec_data)
        serial.write_line("")
        Control_Car()
        Select_Mode()
        control_RGB()
        control_Neopixel()
        control_music()
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_bluetooth_disconnected():
    basic.show_icon(IconNames.SAD)
bluetooth.on_bluetooth_disconnected(on_bluetooth_disconnected)

def control_RGB():
    if rec_data == "r":
        k_Bit.led(COLOR.RED)
    elif rec_data == "g":
        k_Bit.led(COLOR.GREEN)
    elif rec_data == "b":
        k_Bit.led(COLOR.BLUE)
    elif rec_data == "y":
        k_Bit.set_led(255, 255, 0)
    elif rec_data == "c":
        k_Bit.set_led(100, 200, 100)
    elif rec_data == "p":
        k_Bit.set_led(255, 100, 255)
    elif rec_data == "x":
        k_Bit.off_led()
def car_avoid():
    global distance_val
    distance_val = k_Bit.ultra()
    if distance_val <= 10:
        k_Bit.run(DIR.TURN_LEFT, 60)
    else:
        k_Bit.run(DIR.RUN_FORWARD, 50)
def Control_Car():
    if rec_data == "F":
        k_Bit.run(DIR.RUN_FORWARD, 80)
    elif rec_data == "B":
        k_Bit.run(DIR.RUN_BACK, 80)
    elif rec_data == "L":
        k_Bit.run(DIR.TURN_LEFT, 80)
    elif rec_data == "R":
        k_Bit.run(DIR.TURN_RIGHT, 80)
    elif rec_data == "S":
        k_Bit.car_stop()
def control_Neopixel():
    global Neo_data
    if rec_data == "h":
        Neo_data = 1
    elif rec_data == "j":
        Neo_data = 2
    elif rec_data == "k":
        Neo_data = 3
    elif rec_data == "l":
        Neo_data = 0
        changeColor()
    elif rec_data == "m":
        Neo_data = 0
        strip.clear()
        strip.show()
        serial.write_string("clean")
        serial.write_line("")
def car_follow():
    global distance_val
    distance_val = k_Bit.ultra()
    if distance_val > 9 and distance_val <= 30:
        k_Bit.run(DIR.RUN_FORWARD, 60)
    elif distance_val > 6 and distance_val <= 9:
        k_Bit.car_stop()
    elif distance_val <= 6:
        k_Bit.run(DIR.RUN_BACK, 60)
    elif distance_val > 30:
        k_Bit.car_stop()
def changeColor():
    global color_c_flag
    color_c_flag = color_c_flag + 1
    if color_c_flag == 11:
        color_c_flag = 1
    if color_c_flag == 1:
        strip.show_color(neopixel.colors(NeoPixelColors.RED))
        serial.write_string("red")
        serial.write_line("")
    elif color_c_flag == 2:
        strip.show_color(neopixel.colors(NeoPixelColors.ORANGE))
    elif color_c_flag == 3:
        strip.show_color(neopixel.colors(NeoPixelColors.YELLOW))
    elif color_c_flag == 4:
        strip.show_color(neopixel.colors(NeoPixelColors.GREEN))
    elif color_c_flag == 5:
        strip.show_color(neopixel.colors(NeoPixelColors.BLUE))
    elif color_c_flag == 6:
        strip.show_color(neopixel.colors(NeoPixelColors.INDIGO))
    elif color_c_flag == 7:
        strip.show_color(neopixel.colors(NeoPixelColors.VIOLET))
    elif color_c_flag == 8:
        strip.show_color(neopixel.colors(NeoPixelColors.PURPLE))
    elif color_c_flag == 9:
        strip.show_color(neopixel.colors(NeoPixelColors.WHITE))
    elif color_c_flag == 10:
        strip.show_color(neopixel.colors(NeoPixelColors.BLACK))
def control_music():
    if rec_data == "1":
        music.ring_tone(262)
    elif rec_data == "2":
        music.ring_tone(294)
    elif rec_data == "3":
        music.ring_tone(330)
    elif rec_data == "4":
        music.ring_tone(349)
    elif rec_data == "5":
        music.ring_tone(392)
    elif rec_data == "6":
        music.ring_tone(440)
    elif rec_data == "7":
        music.ring_tone(494)
    elif rec_data == "8":
        music.ring_tone(523)
    elif rec_data == "9":
        music.rest(music.beat(BeatFraction.EIGHTH))
def car_Tracking():
    if k_Bit.line_tracking() == 1:
        k_Bit.motor(MotorObs.LEFT_SIDE, MotorDir.FORWARD, 40)
        k_Bit.motor(MotorObs.RIGHT_SIDE, MotorDir.BACK, 40)
    elif k_Bit.line_tracking() == 2:
        k_Bit.motor(MotorObs.LEFT_SIDE, MotorDir.BACK, 40)
        k_Bit.motor(MotorObs.RIGHT_SIDE, MotorDir.FORWARD, 40)
    elif k_Bit.line_tracking() == 3:
        k_Bit.run(DIR.RUN_FORWARD, 25)
    else:
        k_Bit.car_stop()
color_c_flag = 0
Neo_data = 0
distance_val = 0
connected = 0
car_mode = 0
rec_data = ""
strip: neopixel.Strip = None
serial.redirect_to_usb()
strip = neopixel.create(DigitalPin.P5, 18, NeoPixelMode.RGB)
k_Bit.LED_brightness(200)

def on_forever():
    global distance_val
    distance_val = k_Bit.ultra()
    if car_mode == 1:
        car_avoid()
    elif car_mode == 2:
        car_follow()
    elif car_mode == 3:
        car_Tracking()
    if Neo_data == 1:
        strip.set_pixel_color(randint(0, 18),
            neopixel.hsl(neopixel.rgb(randint(0, 255), randint(0, 255), randint(0, 255)),
                255,
                50))
        strip.show()
    elif Neo_data == 2:
        for index4 in range(18):
            strip.set_pixel_color(index4,
                neopixel.rgb(randint(0, 255), randint(0, 255), randint(0, 255)))
            strip.show()
            basic.pause(50)
            strip.clear()
    elif Neo_data == 3:
        neo_water()
    elif Neo_data == 4:
        strip.show_bar_graph(0, 255)
basic.forever(on_forever)
