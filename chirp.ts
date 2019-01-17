//% color="#000000"
namespace chirp {
    //% block="Chirp humidity value"
    //% blockSetVariable=humidity
    export function getHumidity(): number {
        pins.i2cWriteNumber(32, 0, NumberFormat.Int8LE, false)
        basic.pause(100)
        let humidity = pins.i2cReadNumber(32, NumberFormat.UInt16BE, true)
        return humidity
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

