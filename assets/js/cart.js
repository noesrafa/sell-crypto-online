const cartGlobal = document.querySelector('#cart'),
      products = document.querySelector('#products');
      cartContainer = document.querySelector('#cart-container');
      trashBtn = document.querySelector('#trash-btn');

let productsInCart = [];

// Hice una funcion que va a cargar todos los eventlisteners 
loadEventListeners();
function loadEventListeners() {
    //checa si le diste click en la seccion de product y ejecuta la funcion
    products.addEventListener('click', addProduct);
}


function addProduct (e) {
    // reventDefault ayuda si utilizamos <a> para que no se ejecute el link que tiene 
    e.preventDefault();
    // Si al que le di click (e) en su clase (classList) contiene(contains) eso
    if (e.target.classList.contains('products__btn-icon'))
    {
        // De que seleccionaste (e.target) se va al padre y de ahi al padre otra vez
        const selectedProduct = e.target.parentElement.parentElement;
        // A la funcion le pasamos la variable de que producto seleccionamos 
        readProductDetails(selectedProduct);
    }
}

// En la funcion addProducts usamos selectedProducts como productParameter
// selectedProduct = productParameter
function readProductDetails( productParameter ){
    
    const productInfo = {
        img: productParameter.querySelector('img').src,
        title: productParameter.querySelector('h3').textContent,
        price: productParameter.querySelector('span').textContent,
        // Para tomar un atributo (algo que este dentro de las etiquetas) usamos
        id: productParameter.querySelector('i').getAttribute('data-id'),
        quantity: 1,
    }

    // ========================== ELIMINA DUPLICADOS Y AUMENTA CANTIDAD ========================
    // Revisa si el curso esta duplicado y lo guarda en una variable booleana
    // Si hay algun (productParameter.some) itera sobre cada objeto (=>) y busca
    //su propiedad id (.id) checa si ya estaba
    const exists = productsInCart.some( productParameter => productParameter.id === productParameter.id );
    if(exists) {
        //Actualizamos la cantidad
        const productNoRepeat = productsInCart.map( productParameter => {
            if( productParameter.id === productInfo.id) {
                productParameter.quantity++;
                return productParameter;
                
            } else {
                return productParameter;
            }
        });
        productsInCart = [...productNoRepeat];
    } else {
        // Suma los elementos al carrito
        productsInCart = [...productsInCart, productInfo];
    }

    // productsInCart = [...productsInCart, productInfo];
    // console.log(productsInCart);

    console.log(productsInCart);
    cartHTML();
}

// Crea en el carrito nuestro objeto creado productInfo
function cartHTML() {
    
    // Limpiamos el contenido que este dentro del cartContainer para que no se
    // repitan los productos cada que agregamos mas
    clearProductsInCart();

    productsInCart.forEach( productParameter => {
        const article = document.createElement('article');
        //Sacamos las variables del productParameter
        const {img, title, price, quantity, id} = productParameter;

        article.innerHTML = `
            <div class="cart__img-bg">
                <img src="${img}" alt="" class="cart__img">
            </div>
            <div class="cart__details">
                    <h3 class="cart__title">${title}</h3>
                    <span class="cart__price">${price}</span>

                    <div class="cart__amount">
                        <div class="cart__amount-content">
                            <span class="cart__amount-box">
                                <i class='bx bx-minus' ></i>
                            </span>
                            <span class="cart__amoun-number">${quantity}</span>
                            <span class="cart__amount-box">
                                <i class='bx bx-plus'></i>
                            </span>
                        </div>

                        <i class='bx bx-trash-alt cart__amount-trash' ></i>
                    </div>
                </div>
        `;
        article.setAttribute('class', 'cart__card')

         // Metemos el html dentro del carrito en la seccion del carrito 
        cartContainer.appendChild(article);

    });
}

function clearProductsInCart() {
    // Esta es la forma lenta 
    // cartContainer.innerHTML = '';

    while(cartContainer.firstChild) {
        cartContainer.removeChild(cartContainer.firstChild);
    }
}