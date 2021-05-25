import CATALOG from '../Catalog/Catalog.js'

let sortCatalog = CATALOG

function ChoosePrice(min, max) {
    return sortCatalog = CATALOG.filter(e => e.price < max && e.price > min)
}

function sortProductsIncrease(array) {
    return array.sort((a, b) => a.price - b.price)
}
function sortProductsDecrease(array) {
    return array.sort((a, b) => b.price - a.price)
}

export { sortProductsIncrease, sortProductsDecrease, ChoosePrice }