function Select_Mode () {
    if (rec_data == "Q") {
        car_mode = 1
    } else if (rec_data == "W") {
        car_mode = 2
    } else if (rec_data == "E") {
        car_mode = 3
    } else if (rec_data == "A") {
        car_mode = 0
        k_Bit.carStop()
    }
}
function neo_water () {
    for (let index = 0; index <= 17; index++) {
        strip.setPixelColor(index, neopixel.rgb(0, 0, 100))
        strip.show()
        basic.pause(100)
    }
    for (let index = 0; index <= 17; index++) {
        strip.setPixelColor(index, neopixel.rgb(0, 50, 50))
        strip.show()
        basic.pause(100)
    }
    for (let index = 0; index <= 17; index++) {
        strip.setPixelColor(index, neopixel.rgb(50, 40, 30))
        strip.show()
        basic.pause(100)
    }
}
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Heart)
    connected = 1
    while (connected == 1) {
        rec_data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
        serial.writeString(rec_data)
        serial.writeLine("")
        Control_Car()
        Select_Mode()
        control_RGB()
        control_Neopixel()
        control_music()
    }
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Sad)
})
function control_RGB () {
    if (rec_data == "r") {
        k_Bit.Led(COLOR.red)
    } else if (rec_data == "g") {
        k_Bit.Led(COLOR.green)
    } else if (rec_data == "b") {
        k_Bit.Led(COLOR.blue)
    } else if (rec_data == "y") {
        k_Bit.SetLed(255, 255, 0)
    } else if (rec_data == "c") {
        k_Bit.SetLed(100, 200, 100)
    } else if (rec_data == "p") {
        k_Bit.SetLed(255, 100, 255)
    } else if (rec_data == "x") {
        k_Bit.OFFLed()
    }
}
function car_avoid () {
    distance_val = k_Bit.ultra()
    if (distance_val <= 10) {
        k_Bit.run(DIR.TurnLeft, 60)
    } else {
        k_Bit.run(DIR.RunForward, 50)
    }
}
function Control_Car () {
    if (rec_data == "F") {
        k_Bit.run(DIR.RunForward, 80)
    } else if (rec_data == "B") {
        k_Bit.run(DIR.RunBack, 80)
    } else if (rec_data == "L") {
        k_Bit.run(DIR.TurnLeft, 80)
    } else if (rec_data == "R") {
        k_Bit.run(DIR.TurnRight, 80)
    } else if (rec_data == "S") {
        k_Bit.carStop()
    }
}
function control_Neopixel () {
    if (rec_data == "h") {
        Neo_data = 1
    } else if (rec_data == "j") {
        Neo_data = 2
    } else if (rec_data == "k") {
        Neo_data = 3
    } else if (rec_data == "l") {
        Neo_data = 0
        changeColor()
    } else if (rec_data == "m") {
        Neo_data = 0
        strip.clear()
        strip.show()
        serial.writeString("clean")
        serial.writeLine("")
    }
}
function car_follow () {
    distance_val = k_Bit.ultra()
    if (distance_val > 9 && distance_val <= 30) {
        k_Bit.run(DIR.RunForward, 60)
    } else if (distance_val > 6 && distance_val <= 9) {
        k_Bit.carStop()
    } else if (distance_val <= 6) {
        k_Bit.run(DIR.RunBack, 60)
    } else if (distance_val > 30) {
        k_Bit.carStop()
    }
}
function changeColor () {
    color_c_flag = color_c_flag + 1
    if (color_c_flag == 11) {
        color_c_flag = 1
    }
    if (color_c_flag == 1) {
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        serial.writeString("red")
        serial.writeLine("")
    } else if (color_c_flag == 2) {
        strip.showColor(neopixel.colors(NeoPixelColors.Orange))
    } else if (color_c_flag == 3) {
        strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
    } else if (color_c_flag == 4) {
        strip.showColor(neopixel.colors(NeoPixelColors.Green))
    } else if (color_c_flag == 5) {
        strip.showColor(neopixel.colors(NeoPixelColors.Blue))
    } else if (color_c_flag == 6) {
        strip.showColor(neopixel.colors(NeoPixelColors.Indigo))
    } else if (color_c_flag == 7) {
        strip.showColor(neopixel.colors(NeoPixelColors.Violet))
    } else if (color_c_flag == 8) {
        strip.showColor(neopixel.colors(NeoPixelColors.Purple))
    } else if (color_c_flag == 9) {
        strip.showColor(neopixel.colors(NeoPixelColors.White))
    } else if (color_c_flag == 10) {
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
    }
}
function control_music () {
    if (rec_data == "1") {
        music.ringTone(262)
    } else if (rec_data == "2") {
        music.ringTone(262)
    } else if (rec_data == "3") {
        music.ringTone(262)
    } else if (rec_data == "4") {
        music.ringTone(262)
    } else if (rec_data == "5") {
        music.ringTone(262)
    } else if (rec_data == "6") {
        music.ringTone(262)
    } else if (rec_data == "7") {
        music.ringTone(262)
    } else if (rec_data == "8") {
        music.ringTone(262)
    } else if (rec_data == "9") {
        music.rest(music.beat(BeatFraction.Eighth))
    }
}
function car_Tracking () {
    if (k_Bit.LineTracking() == 1) {
        k_Bit.Motor(MotorObs.LeftSide, MotorDir.Forward, 40)
        k_Bit.Motor(MotorObs.RightSide, MotorDir.Back, 40)
    } else if (k_Bit.LineTracking() == 2) {
        k_Bit.Motor(MotorObs.LeftSide, MotorDir.Back, 40)
        k_Bit.Motor(MotorObs.RightSide, MotorDir.Forward, 40)
    } else if (k_Bit.LineTracking() == 3) {
        k_Bit.run(DIR.RunForward, 25)
    } else {
        k_Bit.carStop()
    }
}
let color_c_flag = 0
let Neo_data = 0
let distance_val = 0
let connected = 0
let car_mode = 0
let rec_data = ""
let strip: neopixel.Strip = null
serial.redirectToUSB()
strip = neopixel.create(DigitalPin.P5, 18, NeoPixelMode.RGB)
k_Bit.LED_brightness(200)
basic.forever(function () {
    distance_val = k_Bit.ultra()
    if (car_mode == 1) {
        car_avoid()
    } else if (car_mode == 2) {
        car_follow()
    } else if (car_mode == 3) {
        car_Tracking()
    }
    if (Neo_data == 1) {
        strip.setPixelColor(randint(0, 17), neopixel.rgb(randint(0, 80), randint(0, 80), randint(0, 80)))
        strip.show()
    } else if (Neo_data == 2) {
        for (let index = 0; index <= 17; index++) {
            strip.setPixelColor(index, neopixel.rgb(randint(0, 100), randint(0, 100), randint(0, 100)))
            strip.show()
            basic.pause(50)
            strip.clear()
        }
    } else if (Neo_data == 3) {
        neo_water()
    }
})
