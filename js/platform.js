class Platform {
    constructor(ctx, posX, posY, img) {
        this.ctx = ctx
        this.posX = posX
        this.posY = posY
        this.img = new Image()
        this.img.src = img


        this.width = 120
        this.height = 60

        this.posY0 = this.posY;


    }

    draw() {
        //plataformas de distinto tamaño??
        this.ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height)
        // requestAnimationFrame(this.draw)
    }

    goDown() {
        this.posY += 0.8
    }

    // top() {
    //     return this.posY
    // }






}