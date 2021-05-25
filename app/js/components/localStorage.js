let btnProducts = document.querySelectorAll('.btn-area__btn')
btnProducts.forEach(btn => {
    btn.addEventListener('click', (e) => {
        localStorage.setItem("item", `${e.target.dataset.index}`)
        btn.classList.add('btn-area__btn--active')

    })
})

function check() {
    btnProducts.forEach(e => {
        if (localStorage.hasOwnProperty()) {
            e.innerHTML = "Добавлено в корзину"
            e.classList.add('btn-area__btn--active')
        }
        else {
            e.innerHTML = "Добавить в корзину"
            e.classList.remove('btn-area__btn-active')
        }
    })
}

check()

export default 'localStorage'