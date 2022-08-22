const game = {

    title: 'Platforms',
    author: 'Marta && Lenis',
    license: undefined,
    version: '1.0.0',
    canvasDom: undefined,
    ctx: undefined,

    canvasSize: {
        w: 600,
        h: 570
    },

    init(id) {
        this.canvasDom = document.querySelector(id)
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions(id)
        // this.getCharacter()
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

    /* getCharacter() {
         document.addEventListener('click', () => {
             let img = document.querySelector('img').value
             localStorage.setItem("character", img);
             console.log(localStorage)
         })
     } */

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