const game = {

    title: 'Platforms',
    author: 'Marta && Lenis',
    license: undefined,
    version: '1.0.0',
    canvasDom: undefined,
    ctx: undefined,

    canvasSize: {
        w: 700,
        h: 600
    },

    init(id) {
        this.canvasDom = document.querySelector(id)
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions(id)
        // this.setEventListeners()
        // this.createAll()
        // this.drawAll()
    },

    setDimensions(canvasId) {
        this.canvasSize = {
            w: document.querySelector(canvasId).setAttribute('width', this.canvasSize.w),
            h: document.querySelector(canvasId).setAttribute('height', this.canvasSize.h)
        }
    },

    /* setEventListeners() {   //cambiar coche por las plataformas
         window.onkeydown = (event) => {
             if (event.key === "ArrowRight") {
                 this.coche.moveRight();
             }
             if (event.key === "ArrowLeft") {
                 this.coche.moveLeft();
             }
             if (event.key === "ArrowUp") {
                 this.coche.moveUp();
             }
 
 
         }
     },*/
}