import CATALOG from "./Catalog/Catalog.js"
import ROOT_SHOPPING from "./Root/root.js"
import slider from './components/headerSlider.js'
import rangeImport from './components/rangeInput.js'
import { changeOnFourCubes, changeOnTwoCubes } from './components/changeDirectory.js'



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
            <button class="btn-area__btn">Добавить в корзину</button>
            </div>
            </div>
            </div>
            `
        })
        // ROOT_SHOPPING.innerHTML = html
    }

    changeDirectory() {
        let html = ''
        CATALOG.forEach(({ item, title, img, about, price }) => {
            html += `

            <img class="images__item images__item--active" src="${img[0]}" alt="#">
            <img class="images__item" src="${img[1]}" alt="#">
            <img class="images__item" src="${img[2]}" alt="#">

            <button class="btn-area__btn">Добавить в корзину</button>
            `
        })
        ROOT_SHOPPING.innerHTML = html
    }


    renderDots(elements) {
        elements.forEach(element => {
            let images = element.querySelectorAll('.images__item')
            let navigation = element.querySelector('.navigation')
            images.forEach((img, index) => {
                img.setAttribute('data-attribute', index)
                navigation.innerHTML += `<div class="navigation__circle ${index == 0 ? "navigation__circle--active" : ''}"data-attribute=${index}></div>`
            })
            let circles = element.querySelectorAll('.navigation__circle')
            circles.forEach(dot => {

                dot.addEventListener('mouseenter', (e) => {
                    images.forEach(e => {
                        e.classList.remove('images__item--active')
                    })
                    circles.forEach(e => {
                        e.classList.remove('navigation__circle--active')
                    })
                    dot.classList.add('navigation__circle--active')
                    element.querySelector(`.images__item[data-attribute="${e.currentTarget.dataset.attribute}"]`).classList.add('images__item--active')
                })
                dot.addEventListener('mouseleave', () => {
                    images.forEach(e => {
                        e.classList.remove('images__item--active')
                    })
                    circles.forEach(e => {
                        e.classList.remove('navigation__circle--active')
                    })
                    circles[0].classList.add('navigation__circle--active')
                    element.querySelector(`.images__item[data-attribute="0"]`).classList.add('images__item--active')
                })
            })
        })
    }
    ChoosePrice(min, max) {
        let sortCatalog = CATALOG.filter(e => e.price < max && e.price > min)
        catalogPage.render(sortCatalog)

        const products = document.querySelectorAll('.shopping-item')
        catalogPage.renderDots(products)
    }
}

let catalogPage = new Catalog()
catalogPage.render(CATALOG)

const products = document.querySelectorAll('.shopping-item')
catalogPage.renderDots(products)


const ChooseProductBtn = document.querySelector('.choose-products__btn')
ChooseProductBtn.addEventListener('click', () => {
    let minInput = document.querySelector('.inputs-number__number1')
    let maxInput = document.querySelector('.inputs-number__number2')
    catalogPage.ChoosePrice(minInput.value, maxInput.value)
})


changeOnFourCubes.addEventListener('click', () => {
    catalogPage.changeDirectory()
})