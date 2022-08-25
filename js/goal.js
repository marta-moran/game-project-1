class Goal extends Platform {
    constructor(ctx, posX, posY, img) {
        super(ctx, posX, posY, velY)
        this.img = new Image()
        this.img.src = img

        this.velY = 1.5

        this.width = 120
        this.height = 60

        this.posY0 = this.posY;
    }

    draw() {
        this.ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height)
    }

    goDown() {
        this.posY += this.velY
    }
}