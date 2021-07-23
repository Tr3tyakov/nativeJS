import slider from './components/header-slider.js'
import range from './components/range-input.js'
import { renderDots } from './components/render-dots.js'
import { changeOnFourCubes, changeOnTwoCubes, objTarget } from './components/change-directory.js'
import { sortProductsIncrease, sortProductsDecrease, ProductDiscount, ProductRaiting } from './components/sort-products.js'
import { SHOPPING, increaseBtn, decreaseBtn, ChooseProductBtn, ObjInputValue } from './components/variable.js'
import { localStorageProducts } from './components/localStorage.js'
import { basket } from './components/basket.js'
import burger from './components/burger-menu.js'



class Catalog {
    constructor() {

        this.add = 'Купить'
        this.added = 'Добавлено в корзину'
    }

    handleClick(element, id) {
        let { products, LocalStorageAdd } = localStorageProducts.setItem(id)

        if (LocalStorageAdd) {
            element.classList.add('btn-area__btn--active')
            element.innerHTML = this.added
        }
        else {
            element.classList.remove('btn-area__btn--active')
            element.innerHTML = this.add
        }
        basket.circleNavigationBasket()
        basket.render()
        this.render(sortCatalog)
    }


    render(catalog) {
        const store = localStorageProducts.getItem()

        let html = ''
        let shoppingItem = ''
        let areaItem = ''
        let itemInformation = ''
        let activeClass = ''
        let activeText = ''

        catalog.forEach(({ item, title, img, about, price, discount, raiting }) => {
            let { lastPrice, percent } = ProductDiscount(price, discount)
            let amountStar = ProductRaiting(raiting)
            if (store.indexOf(item) !== -1) {
                activeText = this.added
                activeClass = ' btn-area__btn--active'
            }
            else {
                activeText = this.add
                activeClass = ''
            }

            if (objTarget.target == false) {
                shoppingItem = 'item-shopping'
                areaItem = 'area-item'
                itemInformation = 'item-information'
            }

            html += `
            <div class="shopping-item ${shoppingItem}">
            <div class="item-area ${areaItem}">
            <div class="images">
            <img class="images__item images__item--active" src="${img[0]}" alt="#">
            <img class="images__item" src="${img[1]}" alt="#">
            <img class="images__item" src="${img[2]}" alt="#">
            </div>
            <div class="navigation">
            </div>
            </div>
            <div class="information-item ${itemInformation}">
            <h2 class="information-item__title">${title}</h2>
            <p class="information-item__about">${about}</p>
            <div class="container-price">
            <span class="container-price__price">${price.toLocaleString('ru')}₽</span>
            <span class="container-price__last-price">${lastPrice}</span>
            <span class="container-price__discount">${percent}</span>
            </div>
            <div class="raiting">
                ${amountStar}
            </div>
            <div class="btn-area">
            <button class="btn-area__btn${activeClass}"id="${item}">${activeText}</button>
            </div>
            </div>
            </div>
            `

        })

        SHOPPING.innerHTML = html
        renderDots()
        handle()

    }
}

const catalogPage = new Catalog()



let CATALOG = []
let sortCatalog = []
//render start catalogPage

fetch("http://myjson.dit.upm.es/api/bins/1tkf")
    .then(response => response.json())
    .then((data) => {
        CATALOG = data
        sortCatalog = CATALOG
        catalogPage.render(CATALOG)
    })




//sort price

function ChoosePrice(min, max) {
    return sortCatalog = CATALOG.filter(e => e.price < max && e.price > min)
}

ChooseProductBtn.addEventListener('click', () => {
    ObjInputValue.minInput = document.querySelector('.inputs-number__number1')
    ObjInputValue.maxInput = document.querySelector('.inputs-number__number2')
    sortCatalog = ChoosePrice(ObjInputValue.minInput.value, ObjInputValue.maxInput.value)
    catalogPage.render(sortCatalog)
    if (increaseTarget == true) {
        sortProductsIncrease(sortCatalog)
    }
    else {
        sortProductsDecrease(sortCatalog)
    }
})

//increase|decrease
let increaseTarget = true
increaseBtn.addEventListener('click', () => {
    decreaseBtn.classList.remove('sort-price__decrease--active')
    increaseBtn.classList.add('sort-price__increase--active')
    sortProductsIncrease(sortCatalog)
    catalogPage.render(sortCatalog)
    increaseTarget = true
})

decreaseBtn.addEventListener('click', () => {
    decreaseBtn.classList.add('sort-price__decrease--active')
    increaseBtn.classList.remove('sort-price__increase--active')
    sortProductsDecrease(sortCatalog)
    catalogPage.render(sortCatalog)
    increaseTarget = false
})


//change directory
changeOnFourCubes.addEventListener('click', () => {
    changeOnTwoCubes.classList.remove('change-position__two-cubes--active')
    changeOnFourCubes.classList.add('change-position__four-cubes--active')
    objTarget.target = false
    catalogPage.render(sortCatalog)
})

changeOnTwoCubes.addEventListener('click', () => {
    changeOnFourCubes.classList.remove('change-position__four-cubes--active')
    changeOnTwoCubes.classList.add('change-position__two-cubes--active')
    objTarget.target = true
    catalogPage.render(sortCatalog)
})



function handle() {
    let buttonHandleClick = document.querySelectorAll('.btn-area__btn')
    buttonHandleClick.forEach(e => {
        e.addEventListener('click', () => {
            catalogPage.handleClick(e, e.id)
        })
    })

    let deleteProduct = document.querySelectorAll('.btn-basket-area')
    deleteProduct.forEach(e => {
        e.addEventListener('click', () => {
            catalogPage.handleClick(e, e.id)
        })
    })
}


