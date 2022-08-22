class Background {
    constructor(ctx, width, height, image) {
        this.ctx = ctx
        this.width = width
        this.height = height

        this.posX = 0
        this.posY = 0

        this.image = new Image()
        this.image.src = image
    }


    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }

}