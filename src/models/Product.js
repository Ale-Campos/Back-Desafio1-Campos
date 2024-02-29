export default class Product {
    constructor(id, title, description,code, price, status, stock, category, thumbnail){
        this.id = id
        this.title = title
        this.description = description
        this.code = code
        this.price = price
        this.status = status
        this.stock = stock
        this.category = category
        this.thumbnail = thumbnail
    }

    static isValid(producto) {

        let validation = {result: true, error: ''}
        let validationFields = Object.keys(new Product())

        for(let key in producto) {
            if(!validationFields.includes(key)) {
                validation = {result: false, error: `Invalid key: ${key}`}
            }
        }

        validationFields.forEach(field => {
            if(field != 'thumbnail' && field!="id" && (producto[field] === undefined || producto[field] === '')) {
                validation = {result: false, error: `Required field: ${field}`}
            }
        })
        return validation
    }

    static hasEmptyProps(producto) {
        let validation = {result: true, error: ''}
        let requiredFields = []
        for(let key in producto) {
            if(producto[key] === '') {
                requiredFields.push(key)
            }
        }
        if(requiredFields.length > 0) {
            validation = {result: false, error: `Required fields: ${requiredFields.join(', ')}`}
        }
        return validation
    }
}