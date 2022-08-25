class Chronometer {
    constructor() {
        this.currentTime = 0
        this.intervalId = null
    }

    start(printTimeCallback) {
        this.intervalId = setInterval(() => {
            if (printTimeCallback) {
                this.currentTime++
                printTimeCallback()
            } else {
                this.currentTime++
            }


            if (game.dead) {
                console.log(printTime())
                clearInterval(this.intervalId)
            }
        }, 1000)
    }

    getMinutes() {
        return Math.floor(this.currentTime / 60)
    }

    getSeconds() {
        return Math.floor(this.currentTime % 60)
    }

    computeTwoDigitNumber(value) {

        if (value < 10) {
            return "0" + value
        } else {
            return value.toString()
        }
    }
}

const chronometer = new Chronometer();

let canStart = true

const btnStart = document.getElementById('btnStart');

let minDec = document.getElementById('minDec');
let minUni = document.getElementById('minUni');
let secDec = document.getElementById('secDec');
let secUni = document.getElementById('secUni');


function printTime() {
    printMinutes();
    printSeconds();
}

function printMinutes() {
    minUni.innerHTML = chronometer.computeTwoDigitNumber(chronometer.getMinutes())[1];
    minDec.innerHTML = chronometer.computeTwoDigitNumber(chronometer.getMinutes())[0];
}

function printSeconds() {
    secUni.innerHTML = chronometer.computeTwoDigitNumber(chronometer.getSeconds())[1];
    secDec.innerHTML = chronometer.computeTwoDigitNumber(chronometer.getSeconds())[0];
}

btnStart.addEventListener('click', () => {
    if (canStart) {
        chronometer.start(printTime);

        canStart = false
    }
}
)
