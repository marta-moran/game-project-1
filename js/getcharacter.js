function getCharacter() {
    let imgs = document.querySelectorAll('img')

    console.log(imgs)
    localStorage.clear();

    for (let i = 0; i < imgs.length; i++) {

        imgs[i].addEventListener('click', () => {

            let info = imgs[i].getAttribute('src')
            localStorage.setItem("character", info);

            console.log(localStorage)
            game.characterIsSelected = true
        })
    }
}

getCharacter()