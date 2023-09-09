const containerCards = document.querySelector(".container-cards");

const cardsAHtml = array => {
    const cards = array.products.reduce((acc, element) => {
        const typeText = element.category ? `Category: ${element.category}` : '';

        return acc + `
        <div class="card" id="card-${element.id}">
            <button class="button-card" id="button-${element.id}">
                <i class="fa-solid fa-cart-shopping"></i>
            </button>       
            <h2>
                ${element.title}
            </h2>
            <figure class="container-card">
                <img src="${element.thumbnail || "not-found.jpg"}" alt="imagen del producto ${element.title}">
            </figure>
            <h4>
                ${typeText}
            </h4>
            <h4>
                Price: $${element.price}
            </h4>
        </div>`;
    }, "");

    containerCards.innerHTML = cards;
};

const allCards = document.querySelectorAll(".button-card");

let productosCarrito = JSON.parse(localStorage.getItem("productos")) || [];

const eventoCards = (nodos, array) => {
    for (let i = 0; i < nodos.length; i++) {
        nodos[i].onclick = (e) => {
            const id = e.currentTarget.id.slice(7);
            const buscarProducto = array.products.find(element => element.id === Number(id));

            agregarAlCarrito(buscarProducto);
        };
    }
};


const agregarAlCarrito = producto => {
    productosCarrito.push(producto);


    localStorage.setItem("productos", JSON.stringify(productosCarrito));

    Toastify({
        text: `Se ha añadido a ${producto.title} al carrito.`,
        className: "info",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();


    mostrarProductosEnCarrito();
};


fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(productsData => {
        cardsAHtml(productsData);
        eventoCards(allCards, productsData);
    })
    .catch(error => {
        console.error('Error al cargar datos desde la API:', error);
    });

const mostrarProductosEnCarrito = () => {
    const containerCarrito = document.querySelector(".container-cards");

    const productosCarrito = JSON.parse(localStorage.getItem("productos")) || [];

    if (productosCarrito.length === 0) {
        containerCarrito.innerHTML = "<p>El carrito está vacío.</p>";
    } else {
        const carritoHTML = productosCarrito.map(producto => `
            <div class="producto-en-carrito">
                <h3>${producto.title}</h3>
                <p>Precio: $${producto.price}</p>
            </div>
        `).join("");

        containerCarrito.innerHTML = carritoHTML;
    }
};


mostrarProductosEnCarrito();