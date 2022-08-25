class Player {
    constructor(ctx, posX, posY, playerImg) {
        this.ctx = ctx
        this.posX = posX
        this.posY = posY

        this.width = 70 //NO TOCAR O NO SE VE EL PERSONAJEE
        this.height = 70

        this.img = new Image()
        this.img.src = playerImg

        this.canJump = false
        this.lifesCounter = 3

        this.velY = 0.5
        this.velX = 0
        this.grav = 0.2

        this.isFalling = false
        this.keyRightPressed = false
        this.keyLeftPressed = false
    }

    draw() {
        this.ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height)
        this.gravity()
    }

    update() {
        if (this.keyLeftPressed) {
            this.moveLeft()
        }
        if (this.keyRightPressed) {
            this.moveRight()
        }
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

    fall() {
        if (this.posY > 600) {
            this.isFalling = true
            this.lifesCounter--
        }
    }

    restart() {

        setTimeout(() => {
            this.isFalling = false
        }, 1000)
        this.posY = 20
        this.posX = 330
        this.velY = 0.5
    }

}