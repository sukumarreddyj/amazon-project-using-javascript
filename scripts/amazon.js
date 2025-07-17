import { dataitems } from '../data/products.js';
import { cart, addToCart } from '../data/cart.js';
import { formattingMoney } from './utils/foramtingMoney.js';

// loading the items on to the webpage till now I just loaded the data
let productItemsHtml = '';

dataitems.forEach((dataitem) => {
    productItemsHtml += `
     <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${dataitem.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${dataitem.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${dataitem.rating.stars *10}.png">
            <div class="product-rating-count link-primary">
              ${dataitem.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formattingMoney(dataitem.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-item-id="${dataitem.id}">
            Add to Cart
          </button>
        </div>
    `;
   
});
document.querySelector(".product-items-display").innerHTML= productItemsHtml;


// this function will update the cart quantity in the header
function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((product) => {
    cartQuantity += product.quantity;
  });
  document.querySelector(".js-cart-quantity").textContent = cartQuantity;
}


// adding the event listener to the add to cart button
// this will add the item to the cart and update the cart quantity
document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
  button.addEventListener("click",(event)=>{
    const itemId = button.dataset.itemId;
    addToCart(itemId);
    updateCartQuantity();
  });
});
