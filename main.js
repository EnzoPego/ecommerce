//fetch('https://api.escuelajs.co/api/v1/products')
//.then(respuesta => respuesta.json())
//.then(datos => console.log(datos))


// Variables inicales
let articulosCarrito = []
let total = 0
let contenedorProductos = document.querySelector('.shop-items')
let contenidoCarrito = document.querySelector('.cart-items')


// Peticion al servidor
async function obtenerDatos() {
    try {
        const respuesta = await fetch('https://api.escuelajs.co/api/v1/products')
        const datos = await respuesta.json()

        // Trae los productos del cuarto al septimo del arreglo de la api
        const productos = datos.slice(3,7)
        console.log(productos)

        iterarProductos(productos)

    } catch (error) {
        console.log(error)
    }
}

obtenerDatos()

// Imprimir productos en pantalla
function iterarProductos(productos) {
    productos.forEach(producto => {
        contenedorProductos.innerHTML += `
        <div class="shop-item" id=${producto.id}>
            <span class="shop-item-title">${producto.title} </span>
                <img class="shop-item-image" src=${producto.images[0]}>
                <div class="shop-item-details">
                    <span class="shop-item-price">$${producto.price}</span>
                    <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
                </div>
        </div>`
    });

    // Escucho cuando se hace click en en boton ADD TO CART
    let addBtns = document.querySelectorAll('.shop-item-button')
    // Convertir de nodelist a un arreglo para acceder a todos los metodos propios de un arreglo
    addBtns = [...addBtns]
    console.log(addBtns)

    addBtns.forEach(btn => {
        btn.addEventListener('click', evento => {
           
            // Buscar el id del producto
            let actualId = parseInt (evento.target.parentElement.parentElement.id)
            console.log(actualId)


            // Con el id encontrar el objeto actual
            let productoActual = productos.find(producto => producto.id == actualId)
            console.log(productoActual)

            // Agregar el producto al arreglo articulosCarrito
            contenidoCarrito.innerHTML += `
            <div class="cart-row">
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src=${productoActual.images[0]} >
                    <span class="cart-item-title">${productoActual.title} </span>
                </div>
                <span class="cart-price cart-column">$${productoActual.price} </span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" min="1" type="number" value="1">
                    <button class="btn btn-danger" type="button">REMOVE</button>
            </div>`
        })
    })
}

