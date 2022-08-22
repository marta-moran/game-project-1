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
        w: 600,
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

        let interval = setInterval(() => {
            this.framesIndex +
                this.clear()
            this.drawAll()
            this.setEventListeners()
            // this.player.fall()
            this.platform.goDown()

            /* this.platform.forEach(elm => elm.draw())
             if (this.framesIndex % 50 === 0) {
                 this.generateObstacles()
             }*/
            this.endGame()
        }, 1000 / this.FPS)
    },

    createAll() {
        this.background = new Background(this.ctx, 600, 570, this.backgroundImage)
        this.player = new Player(this.ctx, 280, 70, this.playerImage)
        console.log(this.playerImage)   //posY = 470
        this.platform = new Platform(this.ctx, 100, 400, this.imagePlatform)
    },

    drawAll() {
        this.background.draw()
        this.player.draw()
        this.platform.draw()
    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)

    },

    setEventListeners() {   //cambiar coche por las plataformas
        window.onkeydown = (event) => {
            if (event.key === "ArrowRight") {
                this.player.moveRight();
            }
            if (event.key === "ArrowLeft") {
                this.player.moveLeft();
            }



        }
    },

    generateObstacles() {
        this.platforms.push(
            new Platform(this.ctx, Math.floor(Math.random() * 300), 0, 200, 10, 10)
        )
    },

    endGame() {
        if (this.player.posY > 470) {
            clearInterval(this.interval)
            this.clear()
        }
    },




}