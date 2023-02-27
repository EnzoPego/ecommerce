//fetch('https://api.escuelajs.co/api/v1/products')
//.then(respuesta => respuesta.json())
//.then(datos => console.log(datos))


// Variables inicales
let articulosCarrito = []
let total = 0
let contenedorProductos = document.querySelector('.shop-items')
let contenidoCarrito = document.querySelector('.cart-items')
let precioFinal = document.querySelector('.cart-total-title')

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
            
            if(productoActual.quantity === undefined){
                productoActual.quantity = 1
            }

            // Pregunta si el producto que estoy agregando ya existe
            
            let existe = false
            articulosCarrito.forEach(articulo =>{
                if(actualId == articulo.id){
                    existe = true
                }
            })

            if (existe){
                productoActual.quantity++
                
            }else{
                // Pasa el producto seleccionado al arreglo articulosCarrito 
                articulosCarrito.push(productoActual)
            }

            imprimirCarrito()
  
            // Actualizar el precio total del carrito
            obtenerTotal() 
                       
            
        })
    })
}

function obtenerTotal(){
    let sumTotal
    let total = articulosCarrito.reduce((acc,item)=>{
        sumTotal = acc + item.quantity*item.price
        return sumTotal
    },0)
    // Imprime el total en el html
    precioFinal.innerHTML = `$${total}`
}


function imprimirCarrito() {
    // Limpia el HTML para no repetir los productos
    contenidoCarrito.innerHTML = ``

    articulosCarrito.forEach(item => {
        contenidoCarrito.innerHTML += `
            <div class="cart-row">
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src=${item.images[0]} >
                    <span class="cart-item-title">${item.title} </span>
                </div>
                <span class="cart-price cart-column">$${item.price} </span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" min="1" type="number" value="${item.quantity}">
                    <button class="btn btn-danger" type="button">REMOVE</button>
            </div>`
    })

}