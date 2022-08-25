const game = {

    title: 'Platforms',
    author: 'Marta && Lenis',
    license: undefined,
    version: '1.0.0',

    canvasDom: undefined,
    ctx: undefined,
    FPS: 60,
    background: undefined,
    backgroundImage: "../img/fondo4.jpg",
    image: new Image(),
    src: "../img/fondo3.jpg",
    playerImage: localStorage.getItem('character'),
    characterIsSelected: false,
    canPlay: true,
    imagePlatform: "../img/platform.png",
    framesIndex: 0,
    platforms: [],
    canJump: false,
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
            this.framesIndex++
            // if(this.framesIndex === 60) secs ++
            this.clear()
            this.clearObstacles()
            this.drawAll()
            this.setEventListeners()
            this.player.update()
            this.platforms.forEach(platform => platform.goDown())
            this.player.fall()
            if (this.player.isFalling) {
                this.player.restart()
                this.removeLifes()
                if (this.framesIndex % 6 === 0) {
                    this.player.width = 0
                    this.player.height = 0
                } else {
                    this.player.width = 70
                    this.player.height = 70
                }
            }

            this.isCollision()

            if (this.framesIndex % 120 === 0) {
                this.generateObstacles()
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

        // DESTRUCTURAR PROPIEDAD KEY
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


    },

    clearObstacles() {
        this.platforms = this.platforms.filter(obs => obs.posY <= 570)
    },

    isCollision() { //para coger objetos misma funcion con this.objects.splice(index, 1)

        // if (!(this.player.posX < platform.posX + platform.width &&
        //     this.player.posX + this.player.width > platform.posX &&
        //     this.player.posY < platform.posY + platform.height &&
        //     this.player.height + this.player.posY > platform.posY)) {
        //     this.player.velY = 10
        // }

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

    removeLifes() {
        if (this.player.lifesCounter === 2) {
            this.lifes[2].remove()
        }
        else if (this.player.lifesCounter === 1) {
            this.lifes[1].remove()
        }
        else if (this.player.lifesCounter === 0) {
            this.lifes[0].remove()
        }
    },

    endGame() {
        if (this.player.lifesCounter === 0) {
            clearInterval(this.interval)

            this.ctx.fillStyle = 'blueviolet'
            this.ctx.fillRect(0, 0, 700, 570);

            this.ctx.font = '30px Silkscreen';
            this.ctx.fillStyle = 'yellow'
            this.ctx.fillText("redirigiendo...", 130, 450)

            this.ctx.fillStyle = 'black'
            this.ctx.font = '70px Silkscreen';
            this.ctx.fillText("GAME OVER", 130, 300)


            setTimeout(() => {
                location.href = "../vistas/index.html"

            }, 10000)

            // alert("has perdidoooooooooooo")
            // this.chronometer.stop()
            // location.href = "../vistas/index.html"

        }
    }
}
