/**On commence par afficher les éléments du localStorage*/
let multipleProducts = [];
let productData = [];
let cart = JSON.parse(localStorage.getItem("products"));

/** FONCTION POUR RECUPERER LES PRODUITS */
const getProducts = async () => {
    await fetch(`http://localhost:3000/api/products/`)
        .then((res) => res.json())
        .then((promise) => {
            productData = promise;
            console.log(promise);
            console.log(productData.price);
        });
};

/** FONCTION QUI CALCULE LE PRIX AVEC LA QUANTITE */

const PriceMath = (id, quantity) => {
    let filteredRecord = productData.filter(function (item) {
        return item._id == id;
    });
    console.log("données reçues : " + id, quantity, filteredRecord);
    return filteredRecord[0].price * quantity;
};

/**Fonction permettant d'afficher les produits présents dans le localStorage*/
const displayCart = async () => {
    console.log("test");

    if (cart) {
        await getProducts();
        console.log(productData);
        console.log(cart);
        await cart;
        /**product.price * product.quantity.toString().replace(/00/, "")*/
        console.log(cart);
        cart__items.innerHTML = cart.map(
            (product) => `<article class="cart__item" data-id="${product._id
                }" data-color="${product.color}">
    <div class="cart__item__img">
      <img src="${product.imageUrl}" alt="${product.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${product.color}</p>
        
 <p>${PriceMath(product._id, product.quantity)} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity
                }">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${product._id}" data-color="${product.color
                }" data-quantity="${product.quantity}">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
</section>`
        );
        /** Fonction permettant de supprimer un produit*/
        removeProduct();
        /** Fonction permettant de modifier la quantité d'un produit*/
        addQuantity();
    } else {
        alert(
            "Panier vide, veuillez ajouter des produits au panier pour continuer !"
        );
    }
};
/** Fonction permettant d'afficher le prix total du panier de manière dynamique*/
const displayTotalPrice = async () => {
    if (cart) {
        await getProducts();
        await cart;
        console.log(cart);
        /** Calcul du prix total*/
        let totalPrice = 0;

        cart.forEach((productInCart) => {
            console.log(productInCart);
            totalPrice +=
                parseInt(productInCart.quantity) *
                PriceMath(productInCart._id, parseInt(productInCart.quantity));
        });
        /**Insertion du HTML du prix total après que l'on ait affiché les produits du panier*/
        const displayQuality = document.querySelector("#totalQuantity");
        displayQuality.innerHTML = `${cart.length}`;
       
        const displayPrice = document.querySelector("#totalPrice");
        displayPrice.innerHTML = `${totalPrice}`;
        
    }
};
displayTotalPrice();

displayCart();
/** fonction qui permet de supprimer un produit de la page panier*/
const removeProduct = async (displayCart) => {
    await displayCart;
    console.log("test de la fonction");

    let items = document.getElementsByClassName("deleteItem");
    console.log(items);
    let cartLength = cart.length;
    for (let item of items) {
        item.addEventListener("click", () => {
            if (cartLength == 1) {
                return (
                    localStorage.removeItem("products"),
                    console.log("panier vidé"),
                    location.reload()
                );
            } else {
                multipleProducts = cart.filter((el) => {
                    if (item.dataset.id != el._id || item.dataset.color != el.color) {
                        return true;
                    }
                });
                console.log(multipleProducts);
                localStorage.setItem("products", JSON.stringify(multipleProducts));
                console.log("remove du produit");
            }
            location.reload();
        });
    }
};
/** Fonction permettant de prendre en compte dans le localStorage la modification d'une quantité en page panier*/
const addQuantity = async (displayCart) => {
    await displayCart;
    let quantitySelectors = document.querySelectorAll(".itemQuantity");
    quantitySelectors.forEach((element) => {
        element.addEventListener("change", (event) => {
            console.log(event);

            console.log(
                element.parentNode.parentNode.parentNode.parentNode.dataset.id
            );

            for (i = 0; i < cart.length; i++) {
                let datasetIdOfHtmlElement =
                    element.parentNode.parentNode.parentNode.parentNode.dataset.id;
                let datasetColorOfHtmlElement =
                    element.parentNode.parentNode.parentNode.parentNode.dataset.color;
                if (
                    cart[i]._id == datasetIdOfHtmlElement &&
                    cart[i].color == datasetColorOfHtmlElement
                ) {
                    cart[i].quantity = element.value;
                    localStorage.setItem("products", JSON.stringify(cart));
                    location.reload();
                }
            }
        });
    });
};
addQuantity();
