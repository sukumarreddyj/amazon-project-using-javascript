// This is the cart array that will hold the items added to the cart
export const cart = [];

// this is the fuction that will add the items to the cart
// it will check if the item is already in the cart, if it is then it will
export function addToCart(itemId) {
     let matchingItem;
    cart.forEach((product)=>{
      if(itemId === product.itemId){
        matchingItem = product;
      }
    });
    
    if(matchingItem){
        matchingItem.quantity++;
      } else {
        cart.push({
          itemId: itemId,
          quantity: 1
        });
      }
    }










