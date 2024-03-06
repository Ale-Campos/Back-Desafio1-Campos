// alert('Hola')

const socket = io()
let ul = document.getElementById('products')

socket.on('newProduct', (data) => {
    ul.innerHTML = ''
    for(let product of data) {
        let li = document.createElement('li')
        li.appendChild(document.createTextNode(product.title))
        ul.appendChild(li)
    }
})