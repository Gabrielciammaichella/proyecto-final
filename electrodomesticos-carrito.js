const containerCards = document.querySelector(".container-carrito"); 


const mostrarProductosEnCarrito = () => {
    
    const productosCarrito = JSON.parse(localStorage.getItem("productos")) || [];

   
    if (productosCarrito.length === 0) {
        
        containerCards.innerHTML = "<p>El carrito está vacío.</p>";
    } else {
     
        const carritoHTML = productosCarrito.map(producto => `
            <div class="producto-en-carrito">
                <h3>${producto.title}</h3>
                <p>Precio: $${producto.price}</p>
            </div>
        `).join("");

       
        containerCards.innerHTML = carritoHTML;
    }
};


mostrarProductosEnCarrito();