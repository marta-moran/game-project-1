const game = {

    title: 'Platforms',
    author: 'Marta && Lenis',
    license: undefined,
    version: '1.0.0',

    canvasDom: undefined,
    ctx: undefined,

    background: undefined,
    backgroundImage: "../img/fondo4.jpg",
    image: new Image(),
    src: "../img/fondo3.jpg",
    playerImage: localStorage.getItem('character'),
    imagePlatform: "../img/platform.png",

    characterIsSelected: false,
    canPlay: true,
    canJump: false,
    dead: false,

    FPS: 60,
    framesIndex: 0,

    platforms: [],
    flowers: [],

    endGameCounter: 0,
    endGameTimer: 11,
    flowersCounter: 0,
    platformsCounter: 0,

    audio: new Audio("../audio/audio.mp3"),

    lifes: document.querySelectorAll('.life'),
    canvasSize: {
        w: 700,
        h: 570
    },

    init(id) {
        this.canvasDom = document.querySelector(id)
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions(id)
        this.start()
    },


    setDimensions(canvasId) {
        this.canvasSize = {
            w: document.querySelector(canvasId).setAttribute('width', this.canvasSize.w),
            h: document.querySelector(canvasId).setAttribute('height', this.canvasSize.h)
        }
    },

    play() {
        if (this.characterIsSelected) {
            location.href = "../vistas/index-juego.html"
        }
    },

    start() {
        this.createAll()
        this.interval = setInterval(() => {
            this.audio.play()
            this.framesIndex++
            this.clear()
            this.clearObstacles(this.platforms)
            this.clearObstacles(this.flowers)
            this.drawAll()
            this.setEventListeners()
            this.player.update()
            this.platforms.forEach(platform => platform.goDown())
            this.flowers.forEach(flower => flower.goDown())
            this.player.fall()
            this.isCollision()
            this.isCollisionFlower()
            this.addFlowers()
            this.addDifficulty()

            if (this.player.isFalling) {
                this.player.restart()
                this.removeLifes()
                /* if (this.framesIndex % 6 === 0) {
                     this.player.width = 0
                     this.player.height = 0
                     
                 } else {
                     this.player.width = 70
                     this.player.height = 70
                 }*/
            }

            if (this.framesIndex % 200 === 0) {
                this.generateFlowers()

            }
            this.endGame()
        }, 1000 / this.FPS)
    },

    createAll() {
        this.background = new Background(this.ctx, 800, 570, this.backgroundImage)

        this.player = new Player(this.ctx, 380, 310, this.playerImage)

        this.platform = new Platform(this.ctx, 360, 385, this.imagePlatform)
        this.platform1 = new Platform(this.ctx, 200, 295, this.imagePlatform)
        this.platform2 = new Platform(this.ctx, 100, 100, this.imagePlatform)
        this.platform3 = new Platform(this.ctx, 300, 20, this.imagePlatform)

        this.platforms.push(this.platform, this.platform1, this.platform2, this.platform3)
    },

    drawAll() {
        this.background.draw()
        this.player.draw()
        this.platform.draw()
        this.platforms.forEach(platform => platform.draw())
        this.flowers.forEach(flower => flower.draw())
    },

    clear() {
        this.ctx.clearRect(0, 0, 800, 570)
    },

    setEventListeners() {

        window.onkeydown = ({ key }) => {

            if (key === "ArrowRight") {
                this.player.keyRightPressed = true

            }
            if (key === "ArrowLeft") {
                this.player.keyLeftPressed = true
            }
            if (key === " " && this.canJump) {
                this.player.jump()
                this.canJump = false
            }
        }

        window.onkeyup = ({ key }) => {

            if (key === "ArrowRight") {
                this.player.keyRightPressed = false
            }
            if (key === "ArrowLeft") {
                this.player.keyLeftPressed = false
            }
        }
    },

    generateObstacles() {
        let random = Math.floor(Math.random() * 440)
        this.platforms.push(
            new Platform(this.ctx, random, 0, "../img/platform.png")
        )
        this.platformsCounter++
    },

    generateFlowers() {
        let random = Math.floor(Math.random() * 440)
        this.flowers.push(
            new Flower(this.ctx, random, 0, "../img/flower.png")
        )
    },

    clearObstacles(itemArr) {
        itemArr = itemArr.filter(obs => obs.posY <= 570)
    },

    isCollision() {
        this.platforms.forEach((platform) => {

            if (this.player.posY + this.player.height <= platform.posY
                && this.player.posY + this.player.height + this.player.velY >= platform.posY
                && this.player.posX + this.player.width - 20 > platform.posX
                && this.player.posX + 20 < platform.posX + platform.width) {
                this.player.velY = 0
                this.canJump = true
            }
        })
    },

    isCollisionFlower() {
        this.flowers.forEach((flowers, index) => {
            if (this.player.posX < flowers.posX + flowers.width &&
                this.player.posX + this.player.width > flowers.posX &&
                this.player.posY < flowers.posY + flowers.height &&
                this.player.height + this.player.posY > flowers.posY) {
                this.flowers.splice(index, 1)
                this.flowersCounter++
            }
        })
    },

    removeLifes() {
        if (this.player.lifesCounter === 2) {
            this.lifes[2].remove()
        }
        else if (this.player.lifesCounter === 1) {
            this.lifes[1].remove()
        }
        else if (this.player.lifesCounter === 0) {
            this.lifes[0].remove()
            this.dead = true
        }
    },

    addFlowers() {
        const span = document.querySelector("#flower-counter")

        span.textContent = "X" + this.flowersCounter
    },

    addDifficulty() {
        if (this.platformsCounter < 10 && this.framesIndex % 160 === 0) {
            this.generateObstacles()
        }
        if (this.platformsCounter < 30 && this.framesIndex % 140 === 0) {
            this.platform.velY = 2
            this.generateObstacles()
        }
        if (this.platformsCounter >= 30 && this.framesIndex % 120 === 0) {
            this.platform.velY = 5
            this.generateObstacles()
        }
    },

    endGame() {
        if (this.player.lifesCounter === 0) {
            clearInterval(this.interval)

            this.intervalEnd = setInterval(() => {
                this.endGameTimer--
                this.endGameCounter++
                this.clear()

                this.ctx.fillStyle = 'blueviolet'
                this.ctx.fillRect(0, 0, 700, 570);

                this.ctx.fillStyle = 'black'
                this.ctx.font = '70px Silkscreen';
                this.ctx.fillText("GAME OVER", 110, 250)

                this.ctx.font = '25px Silkscreen';
                this.ctx.fillStyle = 'pink'
                this.ctx.fillText("Redirigiendo a la página principal", 75, 355)

                this.ctx.font = '35px Silkscreen';
                this.ctx.fillStyle = 'black'
                this.ctx.fillText(`${this.endGameTimer}`, 330, 430)

                if (this.endGameTimer === 0) {
                    location.href = "../vistas/index.html"
                }
            }, 1000)
        }
    }
}
