import {dataitems} from '../data/products.js';
import {cart, removeFromCart} from '../data/cart.js';
import {formattingMoney} from './utils/foramtingMoney.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';



let cartSummaryHtml = '';

cart.forEach((item) => {
    let matchingitem;
    const productId = item.itemId;
    dataitems.forEach((product) => {
        if (product.id === productId) {
            matchingitem = product;
        }
    });
    const itemdelivaryoptionid = item.deliveryOptionsId;
    let itemOptionDay;
    deliveryOptions.forEach((option) => {
        if(option.id === itemdelivaryoptionid) {
            itemOptionDay = option;
        }
    });

    const today = dayjs();
    const deliveryDate = today.add(itemOptionDay.deliverydays, 'day');
    const deliveryDateString= deliveryDate.format('dddd, MMMM D');

    if (matchingitem) {
        cartSummaryHtml += `
            <div class="cart-item-container js-cart-items-container-${matchingitem.id}">
                <div class="delivery-date">
                    Delivery date: ${deliveryDateString}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${matchingitem.image}">

                    <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingitem.name}
                    </div>
                    <div class="product-price">
                        $${formattingMoney(matchingitem.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                        Quantity: <span class="quantity-label">${item.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                        Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingitem.id}">
                        Delete
                        </span>
                    </div>
                    </div>

                    <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHtml(matchingitem, item)}
                    </div>
                </div>
                </div>
            `;
    }
});

document.querySelector(".js-cart-items-display").innerHTML = cartSummaryHtml;


function deliveryOptionsHtml(matchingItems,cartItems){
    let html= '';
    deliveryOptions.forEach((options) => {
        const today = dayjs();
        const deliveryDate = today.add(options.deliverydays, 'day');
        const deliveryDateString= deliveryDate.format('dddd, MMMM D');
        const deliveryPrice = options.priceCents === 0 ? 'Free ' : `$${formattingMoney(options.priceCents)} - `;
        const isChecked = options.id === cartItems.deliveryOptionsId;

       html += `<div class="delivery-option">
                        <input type="radio" ${isChecked ? 'checked' : ''}
                        class="delivery-option-input"
                        name="delivery-option-${matchingItems.id}">
                        <div>
                        <div class="delivery-option-date">
                            ${deliveryDateString}
                        </div>
                        <div class="delivery-option-price">
                            ${deliveryPrice} Shipping
                        </div>
                        </div>
                    </div>`
    });
    return html;
}



// Adding event listeners to delete links
document.querySelectorAll('.js-delete-link')
.forEach((link) => {
    link.addEventListener('click', () => {
        const productid = link.dataset.productId;
        removeFromCart(productid);
        const cartItemsDisplay = document.querySelector(`.js-cart-items-container-${productid}`);
        cartItemsDisplay.remove();
    });
});