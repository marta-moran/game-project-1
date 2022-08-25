
document.getElementById("btnStart").addEventListener("click", function () {
    if (game.canPlay) {
        game.init('#canvas')
        game.canPlay = false
    }
});




