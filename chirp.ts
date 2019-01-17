//% color="#000000"
namespace chirp {
    //% block="Chirp humidity value"
    //% blockSetVariable=humidity
    export function getHumidity(): number {
        pins.i2cWriteNumber(32, 0, NumberFormat.Int8LE, false)
        basic.pause(20)
        return pins.i2cReadNumber(32, NumberFormat.UInt16BE, true)
    }


    //% block="Chirp temperature value"
    //% blockSetVariable=temperature
    export function getTemperature(): number {
        pins.i2cWriteNumber(32, 5, NumberFormat.Int8LE, false)
        basic.pause(20)
        return Math.round(pins.i2cReadNumber(32, NumberFormat.UInt16BE, true)/10)
    }

    //% block="Chirp light value"
    //% blockSetVariable=temperature
    export function getLightLevel(): number {
        pins.i2cWriteNumber(32, 3, NumberFormat.Int8BE, true)
        
        let buisy = false
        do {
            pins.i2cWriteNumber(32, 9, NumberFormat.Int8BE, true)
            buisy = (0 != pins.i2cReadNumber(32, NumberFormat.Int8BE, true))
        } while(buisy)
            
        pins.i2cWriteNumber(32, 4, NumberFormat.Int8BE, true)
        return Math.round(pins.i2cReadNumber(32, NumberFormat.UInt16BE, true)/10)
    }

    
    //% block="Chirp is dry"
    export function isDry(): boolean {
        return getHumidity() < 300
    }

    // helper function
    export function scan() {
        let val = 0
        for (let i = 0; i < 127; i++) {
            val = pins.i2cReadNumber(i, NumberFormat.UInt16LE, true) + 1
            if (val != 0) {
                basic.showNumber(i)
                basic.pause(500)
            }
        }
    }
}

