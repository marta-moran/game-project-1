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
            this.framesIndex++
            this.clear()
            this.clearObstacles()
            this.drawAll()
            this.setEventListeners()

            this.platforms.forEach(el => el.goDown())
            if (this.framesIndex % 120 === 0) {
                this.generateObstacles()
            }
            this.clearObstacles()

            this.endGame()
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

    setEventListeners() {   //cambiar coche por las plataformas
        window.onkeydown = (event) => {
            console.log(event.key)
            if (event.key === "ArrowRight") {
                this.player.moveRight();
            }
            if (event.key === "ArrowLeft") {
                this.player.moveLeft();
            }
            if (event.key === " ") {
                this.player.jump();
            }
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


    endGame() {
        if (this.player.posY > 470) {
            clearInterval(this.interval)
            this.clear()
        }
    },




}