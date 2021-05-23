import CATALOG from "../Catalog/Catalog.js"
const amount = document.querySelector('.amount-products')
let length = CATALOG.length


function lastword(element) {
    return element.toString().endsWith(0) ? 'изделий' : element.toString().endsWith(1)

}

console.log(lastword(10));
export default 'amount'