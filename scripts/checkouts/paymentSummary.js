import {cart} from '../../data/cart.js';
import {getProduct, dataitems} from '../../data/products.js';
import {getdeliveryOptions} from '../../data/deliveryOptions.js';
import {formattingMoney} from '../utils/foramtingMoney.js';

export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    cart.forEach((cartItem) => {
       const product = getProduct(cartItem.itemId);
       productPriceCents += product.priceCents * cartItem.quantity;
       const deliveryOption = getdeliveryOptions(cartItem.deliveryOptionsId);
       shippingPriceCents += deliveryOption.priceCents;
    });
    const totalBeforeTaxcents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxcents * 0.1; 
    const totalCents = totalBeforeTaxcents + taxCents;

    const paymentSummaryHtml = `
            <div class="payment-summary-title">
                    Order Summary
                </div>

                <div class="payment-summary-row">
                    <div>Items (3):</div>
                    <div class="payment-summary-money">$${formattingMoney(productPriceCents)}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Shipping &amp; handling:</div>
                    <div class="payment-summary-money">$${formattingMoney(shippingPriceCents)}</div>
                </div>

                <div class="payment-summary-row subtotal-row">
                    <div>Total before tax:</div>
                    <div class="payment-summary-money">$${formattingMoney(totalBeforeTaxcents)}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Estimated tax (10%):</div>
                    <div class="payment-summary-money">$${formattingMoney(taxCents)}</div>
                </div>

                <div class="payment-summary-row total-row">
                    <div>Order total:</div>
                    <div class="payment-summary-money">$${formattingMoney(totalCents)}</div>
                </div>

                <button class="place-order-button button-primary">
                    Place your order
                </button>
    `;

    document.querySelector('.js-payment-summary-display').innerHTML = paymentSummaryHtml;
}