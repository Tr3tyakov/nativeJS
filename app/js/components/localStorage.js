let LocalStorageAdd = false

let objLocalStorage = {
    LocalStorageAdd: false
}

class LocalStorage {
    constructor() {
        this.product = 'products'
    }

    getItem() {
        let productsLocalStorage = localStorage.getItem(this.product)
        if (productsLocalStorage !== null) {
            return JSON.parse(productsLocalStorage)
        }
        return []
    }

    setItem(id) {
        let products = this.getItem()
        let index = products.indexOf(id)
        if (index == -1) {
            products.push(id)
            LocalStorageAdd = true
        }
        else {
            products.splice(index, 1)
            LocalStorageAdd = false
        }
        localStorage.setItem(this.product, JSON.stringify(products))
        return { products, LocalStorageAdd }
    }

}
let localStorageProducts = new LocalStorage()



export { localStorageProducts }