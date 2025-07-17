// This is the cart array that will hold the items added to the cart
export const cart = [
{
    itemId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1
},
{    itemId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 2
}

];

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










