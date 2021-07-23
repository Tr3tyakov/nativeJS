function sortProductsIncrease(array) {
    return array.sort((a, b) => a.price - b.price)
}
function sortProductsDecrease(array) {
    return array.sort((a, b) => b.price - a.price)
}

function ProductDiscount(price, percent) {
    let lastPrice = ''
    if (percent == null) {
        percent = ''
    } else {
        lastPrice = price + price / 100 * percent + "₽"
        percent += '%'
    }
    return { lastPrice, percent }
}
function ProductRaiting(raiting) {
    let star = `<img class="raiting__star" src="./images/products/star.png" alt="">`
    let amountStar = star.repeat(raiting)
    return amountStar
}


export { sortProductsIncrease, sortProductsDecrease, ProductDiscount, ProductRaiting }