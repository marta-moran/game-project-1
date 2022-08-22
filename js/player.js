class Player {
    constructor(ctx, posX, posY, playerImg) {
        this.ctx = ctx
        this.posX = posX
        this.posY = posY
        this.width = 70 //NO TOCAR O NO SE VE EL PERSONAJEE
        this.height = 70

        this.img = new Image()
        this.img.src = playerImg

    }

    draw() {
        this.ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height)
        // requestAnimationFrame(this.draw)
    }

    moveRight() {
        if (this.posX < 530) {
            this.posX += 10
        }

    }

    moveLeft() {
        if (this.posX > 0) {
            this.posX -= 10
        }

    }

    jump() {

    }

    fall() {
        this.posY += this.velY
        this.velY += this.grav

    }


}