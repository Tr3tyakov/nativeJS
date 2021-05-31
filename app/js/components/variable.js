const increaseBtn = document.querySelector('.sort-price__increase')
const decreaseBtn = document.querySelector('.sort-price__decrease')
const ChooseProductBtn = document.querySelector('.choose-products__btn')

const SHOPPING = document.querySelector('.shopping')
const circleBasket = document.querySelector('.basket__circle')


let minInput
let maxInput

let ObjInputValue = {
    minInput: '',
    maxInput: '',
}



export { SHOPPING, increaseBtn, decreaseBtn, ChooseProductBtn, ObjInputValue, circleBasket }
