
// const sliderImg = document.querySelectorAll('.slider-item')
// const cirlce = document.querySelectorAll('.cirlce-btn__item')

// const leftArrow = document.querySelector('.left-arrow')
// const rightArrow = document.querySelector('.right-arrow')

// let currentSlider = 0

// cirlce.forEach((e, index) => {
//     e.addEventListener('click', () => {
//         sliderImg.forEach(e => {
//             e.classList.remove('slider-item--active')
//         })
//         cirlce.forEach(e => {
//             e.classList.remove('cirlce-btn__item--active')
//         })

//         e.classList.add('cirlce-btn__item--active')
//         sliderImg[index].classList.add('slider-item--active')
//         currentSlider = index
//     })
// })

// leftArrow.addEventListener('click', () => {
//     sliderImg.forEach(e => {
//         e.classList.remove('slider-item--active')
//     })
//     cirlce.forEach(e => {
//         e.classList.remove('cirlce-btn__item--active')
//     })
//     currentSlider--
//     if (currentSlider < 0) {
//         currentSlider = cirlce.length - 1
//     }
//     cirlce[currentSlider].classList.add('cirlce-btn__item--active')
//     sliderImg[currentSlider].classList.add('slider-item--active')
// })

// rightArrow.addEventListener('click', () => {
//     sliderImg.forEach(e => {
//         e.classList.remove('slider-item--active')
//     })
//     cirlce.forEach(e => {
//         e.classList.remove('cirlce-btn__item--active')
//     })
//     currentSlider++
//     if (currentSlider > cirlce.length - 1) {
//         currentSlider = 0
//     }
//     cirlce[currentSlider].classList.add('cirlce-btn__item--active')
//     sliderImg[currentSlider].classList.add('slider-item--active')
// })

// function repeat() {
//     let circleActive = document.getElementsByClassName('cirlce-btn__item--active')
//     let imgActive = document.getElementsByClassName('slider-item--active')
//     function repeater() {
//         setTimeout(() => {
//             [...circleActive].forEach(circle => {
//                 circle.classList.remove('cirlce-btn__item--active')
//             });
//             [...imgActive].forEach(img => {
//                 img.classList.remove('slider-item--active')
//             });
//             cirlce[currentSlider].classList.add('cirlce-btn__item--active')
//             sliderImg[currentSlider].classList.add('slider-item--active')
//             currentSlider++
//             if (currentSlider >= cirlce.length) {
//                 currentSlider = 0
//             }
//             repeater()
//         }, 3000)
//     }
//     repeater()
// }
// repeat()

const sliders = document.querySelectorAll('.sliders-img-area')
const navigation = document.querySelector('.navigation-circles')

const leftArrow = document.querySelector('.left-arrow')
const rightArrow = document.querySelector('.right-arrow')

let currentSlide = 0

sliders.forEach((element, index) => {
    element.setAttribute('data-attribute', index)
    navigation.innerHTML += `<div class="navigation-circles__circle ${index == 0 ? "navigation-circles__circle--active" : ""}" data-attribute="${index}"></div>`
})
let navigationCircles = document.querySelectorAll('.navigation-circles__circle')
navigationCircles.forEach((element, index) => {
    element.addEventListener('click', (e) => {
        navigationCircles.forEach(e => {
            e.classList.remove('navigation-circles__circle--active')
        })
        sliders.forEach(e => {
            e.classList.remove('sliders-img-area--active')
        })
        element.classList.add('navigation-circles__circle--active')
        currentSlide = index
        document.querySelector(`.sliders-img-area[data-attribute="${e.currentTarget.dataset.attribute}"]`).classList.add('sliders-img-area--active')
    })
})


leftArrow.addEventListener('click', () => {
    currentSlide--
    if (currentSlide < 0) {
        currentSlide = navigationCircles.length - 1
    }
    navigationCircles.forEach(e => {
        e.classList.remove('navigation-circles__circle--active')
    })
    sliders.forEach(e => {
        e.classList.remove('sliders-img-area--active')
    })

    sliders[currentSlide].classList.add('sliders-img-area--active')
    navigationCircles[currentSlide].classList.add('navigation-circles__circle--active')
})

rightArrow.addEventListener('click', () => {
    currentSlide++
    if (currentSlide > navigationCircles.length - 1) {
        currentSlide = 0
    }
    navigationCircles.forEach(e => {
        e.classList.remove('navigation-circles__circle--active')
    })
    sliders.forEach(e => {
        e.classList.remove('sliders-img-area--active')
    })

    sliders[currentSlide].classList.add('sliders-img-area--active')
    navigationCircles[currentSlide].classList.add('navigation-circles__circle--active')
})

function repeat() {
    let activeNavigationCircle = document.getElementsByClassName('navigation-circles__circle--active')
    let activeImage = document.getElementsByClassName('sliders-img-area--active')

    function repeater() {
        setInterval(() => {
            [...activeImage].forEach(e => {
                e.classList.remove('sliders-img-area--active')
            });
            [...activeNavigationCircle].forEach(e => {
                e.classList.remove('navigation-circles__circle--active')
            })

            currentSlide++
            if (currentSlide > sliders.length - 1) {
                currentSlide = 0
            }
            sliders[currentSlide].classList.add('sliders-img-area--active')
            navigationCircles[currentSlide].classList.add('navigation-circles__circle--active')
        }, 2500)

    }
    repeater()
}
repeat()

export default 'Slider'