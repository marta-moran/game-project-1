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

        this.velY = 0.5
        this.velX = 0
        this.grav = 0.2

    }

    draw() {
        this.ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height)
        // requestAnimationFrame(this.draw)
        this.move()
    }

    moveRight() {
        if (this.posX < 730) {
            this.posX += 10
        }

    }

    moveLeft() {
        if (this.posX > 0) {
            this.posX -= 10
        }

    }

    jump() {
        this.posY -= 100
        this.velY -= 7
    }

    move() {
        if (this.posY < 700) {   // Está saltando!
            this.posY += this.velY;
            this.velY += this.grav;
            // } else {
            // this.posY = this.posY0;
            // this.velY = 1;
        }
    }

    // bottom() {
    //     return this.posY + this.height
    // }

    // isColision(platform) {

    //     return !(this.bottom() < platform.top())
    // }

    // fall() {
    //     this.posY += this.velY
    //     this.velY += this.grav

    // }


}