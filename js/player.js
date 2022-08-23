class Player {
    constructor(ctx, posX, posY, playerImg) {
        this.ctx = ctx
        this.posX = posX
        this.posY = posY
        // this.posY0 = this.posY
        this.width = 70 //NO TOCAR O NO SE VE EL PERSONAJEE
        this.height = 70

        this.img = new Image()
        this.img.src = playerImg

        this.canJump = false
        this.velY = 0.5
        this.velX = 0
        this.grav = 0.2

        this.fall = false
        this.keyRightPressed = false
        this.keyLeftPressed = false
        // this.keyUpPressed = false

    }

    draw() {
        this.ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height)
        // requestAnimationFrame(this.draw)
        this.gravity()
    }


    update() {
        if (this.keyLeftPressed) {
            this.moveLeft()
        }
        if (this.keyRightPressed) {
            this.moveRight()
        }
        // if (this.canJump) {
        //     this.jump()
        // }

    }

    moveRight() {
        if (this.posX < 630) {
            this.posX += 5
        }

    }

    moveLeft() {
        if (this.posX > 0) {
            this.posX -= 5
        }

    }

    jump() {
        this.posY -= 100
        this.velY -= 7
    }

    gravity() {
        if (this.posY < 700) {
            this.posY += this.velY;
            this.velY += this.grav;
        }
    }

    fallFunction() {
        if (this.posY > 600) {
            this.fall = true
        }

        return this.fall
    }

    restart() {
        setTimeout(() => {
            this.fall = false
        }, 1000)
        this.posY = 20
        this.posX = 330

        // this.platforms.push(this.platform5 = new Platform(this.ctx, 360, 150, this.imagePlatform))
    }

}