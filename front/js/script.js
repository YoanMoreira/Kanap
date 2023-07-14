/**Recuperation de l'api */
const url = "http://localhost:3000/api/products/";
/**recuperation des élément */
const container = document.getElementById("items");
/**recuperation des informations */
const getArticles = () => {
  fetch(url)
    .then(function (res) {
      return res.json()
    })
    .then(function (data) {
      console.log(data)
      /**creation d'une boucle */
      for (product in data) {
        container.innerHTML +=
        /**creation de nos fiche produit en récuperant  leurs donnée */
          `<a href="./product.html?id=${data[product]._id}">
            <article>
              <img src="${data[product].imageUrl}"alt="${data[product].altTxt}">
              <h3 class="productName">${data[product].name}</h3>
              <p class="productDescription">${data[product].description}</p>
            </article>
          </a>`
      }
    })
}

getArticles()