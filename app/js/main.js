import CATALOG from "./Catalog/Catalog.js"
import slider from './components/header-slider.js'
import range from './components/range-input.js'
import { renderDots } from './components/navigation-dots.js'
import { changeOnFourCubes, changeOnTwoCubes, target } from './components/change-directory.js'
import { sortProductsIncrease, sortProductsDecrease, ChoosePrice } from './components/sort-products.js'
import { ROOT_SHOPPING, increaseBtn, decreaseBtn, ChooseProductBtn } from './components/variable.js'
import localStorage from './components/localStorage.js'


class Catalog {

    render(catalog) {
        let html = ''
        catalog.forEach(({ item, title, img, about, price }) => {
            html += `
            <div class="shopping-item">
            <div class="item-area">
            <div class="images">
            <img class="images__item images__item--active" src="${img[0]}" alt="#">
            <img class="images__item" src="${img[1]}" alt="#">
            <img class="images__item" src="${img[2]}" alt="#">
            </div>
            <div class="navigation">
            </div>
            </div>
            <div class="information-item">
            <h2 class="information-item__title">${title}</h2>
            <p class="information-item__about">${about}</p>
            <div class="information-item__price">${price.toLocaleString('ru')}₽</div>
            <div class="btn-area">
            <button class="btn-area__btn" data-index="${item}">Добавить в корзину</button>
            </div>
            </div>
            </div>
            `
        })
        ROOT_SHOPPING.innerHTML = html
        let products = document.querySelectorAll('.shopping-item')
        renderDots(products)

    }

    changeDirectory(catalog) {
        let html = ''
        catalog.forEach(({ item, title, img, about, price }) => {
            html += `
            
            <div class="shopping-item item-shopping">
            <div class="item-area area-item">
            <div class="images">
            <img class="images__item images__item--active" src="${img[0]}" alt="#">
            <img class="images__item" src="${img[1]}" alt="#">
            <img class="images__item" src="${img[2]}" alt="#">
            </div>
            <div class="navigation">
            </div>
            </div>
            <div class="information-item item-information">
            <h2 class="information-item__title">${title}</h2>
            <p class="information-item__about">${about}</p>
            <div class="information-item__price">${price.toLocaleString('ru')}₽</div>
            <div class="btn-area">
            <button class="btn-area__btn" data-index="${item}">Добавить в корзину</button>
            </div>
            </div>
            </div>
            `
        })
        ROOT_SHOPPING.innerHTML = html
        let products = document.querySelectorAll('.shopping-item')
        renderDots(products)

    }

}

let catalogPage = new Catalog()

//render start catalogPage
catalogPage.render(sortProductsIncrease(CATALOG))

//sort price
let minInput
let maxInput
let sortCatalog = CATALOG

ChooseProductBtn.addEventListener('click', () => {
    minInput = document.querySelector('.inputs-number__number1')
    maxInput = document.querySelector('.inputs-number__number2')
    sortCatalog = ChoosePrice(minInput.value, maxInput.value)
    if (increaseTarget == true) {
        sortProductsIncrease(sortCatalog)
    }
    else {
        sortProductsDecrease(sortCatalog)
    }
    if (target == true) {
        catalogPage.render(sortCatalog)
    }
    else {
        catalogPage.changeDirectory(sortCatalog)
    }
})

//change directory
changeOnFourCubes.addEventListener('click', () => {
    catalogPage.changeDirectory(sortCatalog)
})

changeOnTwoCubes.addEventListener('click', () => {
    catalogPage.render(sortCatalog)
})

//increase|decrease
let increaseTarget = true
increaseBtn.addEventListener('click', () => {
    decreaseBtn.classList.remove('sort-price__decrease--active')
    increaseBtn.classList.add('sort-price__increase--active')
    sortProductsIncrease(sortCatalog)
    if (target == true) {
        catalogPage.render(sortCatalog)
    }
    else {
        catalogPage.changeDirectory(sortCatalog)
    }
    increaseTarget = true

})

decreaseBtn.addEventListener('click', () => {
    decreaseBtn.classList.add('sort-price__decrease--active')
    increaseBtn.classList.remove('sort-price__increase--active')
    sortProductsDecrease(sortCatalog)
    if (target == true) {
        catalogPage.render(sortCatalog)
    }
    else {
        catalogPage.changeDirectory(sortCatalog)
    }
    increaseTarget = false
})



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