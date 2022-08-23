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
    playerImage: localStorage.getItem('character'),
    imagePlatform: "../img/platform.png",
    framesIndex: 0,
    platforms: [],
    canJump: false,
    lifes: [],
    canvasSize: {
        w: 700,
        h: 570
    },




    init(id) {
        this.canvasDom = document.querySelector(id)
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions(id)
        this.start()
        // this.setEventListeners()

    },

    setDimensions(canvasId) {
        this.canvasSize = {
            w: document.querySelector(canvasId).setAttribute('width', this.canvasSize.w),
            h: document.querySelector(canvasId).setAttribute('height', this.canvasSize.h)
        }
    },



    start() {
        this.createAll()

        this.interval = setInterval(() => {

            this.framesIndex++
            this.clear()
            this.clearObstacles()
            this.drawAll()
            this.setEventListeners()
            this.player.update()
            this.platforms.forEach(el => el.goDown())
            this.player.fallFunction()
            if (this.player.fall) {
                this.player.restart()

                if (this.framesIndex % 7 === 0) {
                    this.player.width = 0
                    this.player.height = 0
                } else {
                    this.player.width = 70
                    this.player.height = 70
                }

                // console.log(this.lifes[0])
                //vidaas
            }

            // this.player.fall()
            this.isCollision()
            if (this.framesIndex % 120 === 0) {
                this.generateObstacles()
            }
            this.clearObstacles()

            // this.endGame()
        }, 1000 / this.FPS)
    },

    createAll() {
        this.background = new Background(this.ctx, 800, 570, this.backgroundImage)
        this.player = new Player(this.ctx, 380, 410, this.playerImage)
        this.platform = new Platform(this.ctx, 360, 485, this.imagePlatform)
        this.platform1 = new Platform(this.ctx, 200, 295, this.imagePlatform)
        this.platform2 = new Platform(this.ctx, 100, 100, this.imagePlatform)
        this.platform3 = new Platform(this.ctx, 300, 20, this.imagePlatform)


        this.platforms.push(this.platform, this.platform1, this.platform2, this.platform3)

    },

    drawAll() {
        this.background.draw()
        this.player.draw()
        this.platform.draw()
        this.platforms.forEach(el => el.draw())
    },

    clear() {
        this.ctx.clearRect(0, 0, 800, 570)

    },

    setEventListeners() {

        window.onkeydown = (event) => {

            if (event.key === "ArrowRight") {
                this.player.keyRightPressed = true

            }
            if (event.key === "ArrowLeft") {
                this.player.keyLeftPressed = true
            }
            if (event.key === " " && this.canJump) {
                this.player.jump()
                this.canJump = false
            }

            //asignar booleano a true. Arriba llamar a las funciones de movimiento solo cuando sea true
        }

        window.onkeyup = (event) => {
            // mismo que arriba y asignar false

            if (event.key === "ArrowRight") {
                this.player.keyRightPressed = false
            }
            if (event.key === "ArrowLeft") {
                this.player.keyLeftPressed = false
            }
            // if (event.key === " " e) {
            //     this.player.canJump = false

            // }
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
    /*endGame() {
        if (this.player.posY > 470) {
            clearInterval(this.interval)
            this.clear()

        }
    },*/




}