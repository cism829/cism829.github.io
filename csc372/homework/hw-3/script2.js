const buttons = document.querySelectorAll('.crtbtn');
let cartTotal = 0;

for (let index = 0; index < buttons.length; index++) {
    const element = buttons[index];
    element.addEventListener('click', addtoCart);
}

/**
 * getting the data attributes fro the button then calling addTotal function
 * @param {MouseEvent} event 
 */
function addtoCart(event) {
    const button = event.target;


    const itemName = button.getAttribute('data-item');
    const itemPrice = button.getAttribute('data-price') * 1; // forgot it was a string and not an int so i just multipled by 1 :P

    addTotal(itemName, itemPrice);
}

/**
 * making a list of items selected from button then calculating and displaying the total
 * @param {string} itemName 
 * @param {number} itemPrice 
 */
function addTotal(itemName, itemPrice) {

    const cartItems = document.getElementById('cart-items');


    const newItem = document.createElement('li');
    newItem.textContent = itemName + ": " + itemPrice.toFixed(2); // only using it so it'll be $0.00 instead of $0.0

    cartItems.appendChild(newItem);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove Item';
    removeBtn.classList.add('removebtn');
    newItem.appendChild(removeBtn);

    removeBtn.addEventListener('click', function() {
        removeItem(newItem, itemPrice);
    });

    cartTotal += itemPrice;
    document.getElementById('total').textContent = "Total: $" + cartTotal.toFixed(2); 
}

/**
 * adding a button to remove desried dish, then fixing the total
 * @param {string} newItem 
 * @param {string} itemPrice 
 */
function removeItem(newItem, itemPrice) {
    const cartItems = document.getElementById('cart-items');
    cartItems.removeChild(newItem); 
    cartTotal -= itemPrice; 
    document.getElementById('total').textContent = "Total: $" + cartTotal.toFixed(2);
}