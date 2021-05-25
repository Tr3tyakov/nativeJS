function renderDots(elements) {
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


export { renderDots }