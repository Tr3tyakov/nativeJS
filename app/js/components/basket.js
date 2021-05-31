
import { circleBasket } from "./variable.js"
import { localStorageProducts } from './localStorage.js'
import { renderDots } from "./render-dots.js";


let basketProduct = document.querySelector(".basket")
let modal = document.querySelector(".basket-modal")



let basketCatalog
class Basket {

    circleNavigationBasket() {
        if ((localStorageProducts.getItem()).length == 0) {
            circleBasket.style.display = "none"

        }
        else {
            circleBasket.style.display = "flex"
            circleBasket.innerHTML = (localStorageProducts.getItem()).length
        }
    }

    ChooseAmount(basketCatalog) {
        let arrayPrice = []
        let totalPriceBasket = document.querySelector('.total-price__btn')
        basketCatalog.forEach(({ item, amount, price }) => {
            let itemBasket = document.querySelector(`.basket-count[data-index="${item}"]`)
            let itemPrice = document.querySelector(`.container-price__price[data-index="${item}"]`)
            arrayPrice.push(price)
            let minus = itemBasket.children[0]
            let inputBasket = itemBasket.children[1]
            let tooltip = itemBasket.children[2]
            let plus = itemBasket.children[3]
            inputBasket.value = 1
            let value = 1
            let total = price

            minus.addEventListener('click', () => {
                --value
                if (value < amount) {
                    plus.classList.remove('basket-count__plus--deactive')
                    tooltip.classList.remove('basket-count--active')
                }
                if (value < 2) {
                    value = 1
                    minus.classList.add('basket-count__minus--deactive')
                    inputBasket.value = value
                }
                else {
                    minus.classList.remove('basket-count__minus--deactive')
                    inputBasket.value = value
                }

                let index = arrayPrice.lastIndexOf(total)
                arrayPrice.splice(index, 1)
                total = value * price
                itemPrice.innerHTML = total + "₽"
                arrayPrice.push(total)
                totalPriceBasket.innerHTML = `Оформить заказ на сумму: ${arrayPrice.reduce((t, a) => t + a)}₽`

                localStorage.setItem('productBasket', JSON.stringify(arrayPrice, value))
            })

            plus.addEventListener('click', () => {
                value++

                if (value > 1) {
                    minus.classList.remove('basket-count__minus--deactive')
                }
                if (value > amount - 1) {
                    value = amount
                    plus.classList.add('basket-count__plus--deactive')
                    tooltip.classList.add('basket-count--active')
                    inputBasket.value = value
                }
                else {
                    plus.classList.remove('basket-count__plus--deactive')
                    inputBasket.value = value
                }

                let index = arrayPrice.lastIndexOf(total)
                arrayPrice.splice(index, 1)
                total = value * price
                arrayPrice.push(total)
                itemPrice.innerHTML = total + "₽"

                totalPriceBasket.innerHTML = `Оформить заказ на сумму: ${arrayPrice.reduce((t, a) => t + a)}₽`

            })

            plus.addEventListener('mouseenter', () => {
                if (value > amount - 1) {
                    tooltip.classList.add('basket-count--active')
                }
            })
            plus.addEventListener('mouseleave', () => {
                if (value > amount - 1) {
                    tooltip.classList.remove('basket-count--active')
                }
            })
        })

        if (arrayPrice.length !== 0) {
            totalPriceBasket.innerHTML = `Оформить заказ на сумму: ${arrayPrice.reduce((t, a) => t + a)}₽`
        }
        else {
            totalPriceBasket.innerHTML = `Ваша корзина пуста`
        }
    }

    render() {
        let basket = ''
        basketCatalog = CATALOG.filter(({ item, title, img, price, amount }) => {
            if ((localStorageProducts.getItem()).indexOf(item) !== -1) {
                basket += `
                <div class="shopping-item basket-item">
                <div class="item-area">
                <div class="images">
                <img class="images__item images__item--active" src="${img[0]}" alt="#">
                <img class="images__item" src="${img[1]}" alt="#">
                <img class="images__item" src="${img[2]}" alt="#">
                </div>
                <div class="navigation">
                </div>
                </div>
                <div class="information-item basket-information-item">
                <h2 class="information-item__title basket-information-item__title">${title}</h2>
                <div class="container-price__price" data-index="${item}">${price}₽</div>
                <div class="basket-count" data-index="${item}">
                <button class="basket-count__minus btn-basket-count basket-count__minus--deactive">-</button>
                <input class="basket-count__number">
                <div class="basket-count__tooltip">${amount} изделия доступно для заказа</div>
                <button class="basket-count__plus btn-basket-count">+</button>
                </div>
                <div class="btn-basket-area" id="${item}">
                <span class="btn-basket-area__delete"></span>
                <span class="btn-basket-area__delete"></span>
                </div>
                </div>
                </div>
                `
                return ((localStorageProducts.getItem()).indexOf(item) !== -1)
            }
        })
        const html = `
        <div class="total-amount">
        <div class="total-amount__title">В корзине ${(localStorageProducts.getItem()).length} товаров</div>
        </div>
        <div class="basket-product">
        ${basket}
        </div>
        <div class="total-price">
        <button class="total-price__btn">Оформить заказ на сумму:₽</button>
        </div>
        `
        modal.innerHTML = html
        renderDots()
        this.ChooseAmount(basketCatalog)
    }
}




const basket = new Basket()

basket.circleNavigationBasket()
let CATALOG = []


basket.render()
fetch("http://myjson.dit.upm.es/api/bins/1tkf")
    .then(response => response.json())
    .then((data) => {
        CATALOG = data
    })


function modalContains(e) {
    let value = e.target.classList.value
    if (
        value == 'btn-basket-area__delete' ||
        value == 'btn-area__btn btn-area__btn--active' ||
        value == 'btn-area__btn' ||
        value == 'btn-basket-area' ||
        modal.contains(e.target) ||
        basketProduct.contains(e.target)
    ) return
    modal.classList.remove('basket-modal--active')

}
document.addEventListener('click', modalContains)


basketProduct.addEventListener('click', () => {
    modal.classList.toggle('basket-modal--active')

})








export { basket }