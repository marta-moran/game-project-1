
let imgs = document.querySelectorAll('img')
let select = document.querySelector('.select')

for (let i = 0; i < imgs.length; i++) {

    imgs[i].addEventListener('click', () => {

        let info = imgs[i].getAttribute('src')

        localStorage.setItem("character", info);

        console.log(localStorage)
        game.characterIsSelected = true

        switch (localStorage.getItem('character')) {
            case "../img/cat.png":
                select.textContent = "Has cogido a gatito"
                break;
            case "../img/hamster.png":
                select.textContent = "Has cogido a hamtaro"
                break;
            case "../img/conejito.png":
                select.textContent = "Has cogido a conejito"
                break;
        }
    })
}


