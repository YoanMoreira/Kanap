// Récupération des informations client et produit depuis le localStorage
let cart = JSON.parse(localStorage.getItem("products"));
let user = JSON.parse(localStorage.getItem("users")).pop();
let orderNumber; // Variable pour stocker le numéro de commande

// Suite au chargement du DOM, on récupère le numéro de commande et on l'affiche
document.addEventListener("DOMContentLoaded", () => {
  let promise = submitOrder();
  promise
    .then((res) => res.json())
    .then((result) => {
      console.log("resultat", result);
      
      // Récupérer le numéro de commande
      orderNumber = result.orderId;
      
      // Afficher le numéro de commande sur la page de confirmation
      document.getElementById("orderId").innerHTML = orderNumber;
      
      // Ajouter le numéro de commande à l'URL de la page de confirmation
      window.history.replaceState({}, "", `?order=${orderNumber}`);
      
      // Nettoyer le localStorage si nécessaire
      localStorage.clear();
    });
});

// Affectation de l'id du produit à productId
cart.forEach((element) => {
  element.productId = element._id;
});
cart = cart.map((e) => {
  return e.productId;
});

// Création de payLoad, qui va contenir les informations client et produit en même temps
let payLoad = { contact: user, products: cart };
console.log(payLoad);

