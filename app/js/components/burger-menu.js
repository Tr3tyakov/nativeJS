
let burger = document.querySelector('.burger-menu')
let burgerModal = document.querySelector('.burger-modal')
let body = document.querySelector('body')


burger.addEventListener('click', (e) => {
    e.preventDefault()
    burger.classList.toggle('burger-menu--active')
    burgerModal.classList.toggle('burger-modal--active')
    body.classList.toggle('stop-scrolling')

})

function checks(e) {
    e.preventDefault()
    if (burger.contains(e.target) || burgerModal.contains(e.target)) return
    burgerModal.classList.remove('burger-modal--active')
    burger.classList.remove('burger-menu--active')
    body.classList.remove('stop-scrolling')

}
document.addEventListener('click', checks)



export default 'burger'