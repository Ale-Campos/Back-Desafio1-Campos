export default class Cart {
    constructor() {
        this.id = Date.now().toString()
        this.products = []
    }

}

export class CartProduct {
    constructor(productId, quantity) {
        this.product = productId
        this.quantity = quantity
    }
}