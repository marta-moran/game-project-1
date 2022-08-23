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
    canvasSize: {
        w: 800,
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
            console.log(this.player.velY)
            this.framesIndex++
            this.clear()
            this.clearObstacles()
            this.drawAll()
            this.setEventListeners()
            this.platforms.forEach(el => el.goDown())
            // this.platforms.forEach(el => this.player.isCollision(el))
            this.isCollision()
            if (this.framesIndex % 120 === 0) {

                console.log('DESDE LA GENERACION DE OBS-->', this.player.velY)

                this.generateObstacles()
            }
            this.clearObstacles()

            // this.endGame()
        }, 1000 / this.FPS)
    },

    createAll() {
        this.background = new Background(this.ctx, 800, 570, this.backgroundImage)
        this.player = new Player(this.ctx, 380, 430, this.playerImage)
        this.platform = new Platform(this.ctx, 360, 495, this.imagePlatform)

        setTimeout(() => {
            this.platforms.push(this.platform)
            console.log(this.platforms)
        }, 10000)
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
                this.player.moveRight();
            }
            if (event.key === "ArrowLeft") {
                this.player.moveLeft();
            }
            if (event.key === " ") {
                this.player.jump();
            }

            //asignar booleano a true. Arriba llamar a las funciones de movimiento solo cuando sea true
        }

        window.onkeyup = (event) => {
            // mismo que arriba y asignar false
        }
    },

    generateObstacles() {
        let random = Math.floor(Math.random() * 480)
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
                && this.player.posX + this.player.width > platform.posX
                && this.player.posX < platform.posX + platform.width) {
                this.player.velY = 0
            }
            // else this.player.velY = 0.8
        })
    },
    endGame() {
        if (this.player.posY > 470) {
            clearInterval(this.interval)
            this.clear()
        }
    },




}