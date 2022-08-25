class Platform {
    constructor(ctx, posX, posY, img) {
        this.ctx = ctx
        this.posX = posX
        this.posY = posY

        this.img = new Image()
        this.img.src = img

        this.velY = 1.5

        this.width = 120
        this.height = 60
    }

    draw() {
        this.ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height)
    }

    goDown() {
        this.posY += this.velY
    }
}