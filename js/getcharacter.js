function getCharacter() {
    localStorage.clear();
    let imgs = document.querySelectorAll('img')

    for (let i = 0; i < imgs.length; i++) {

        imgs[i].addEventListener('click', () => {
            let info = imgs[i].getAttribute('src')
            localStorage.setItem("character", info);
            //crear cuadradito q indique cual has seleccionado
            console.log(localStorage)


        })
    }
}

getCharacter() 