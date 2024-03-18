

let listCart=[];
function checkCart() {
    // Retrieve cart data from localStorage
    if (localStorage.getItem('cart')) {
        listCart = JSON.parse(localStorage.getItem('cart'));
    }
}
function addCartToHTML() {
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;

    if (listCart) {
        listCart.forEach(item => {
            console.log(listCart); // Add this line to check the `item` object
            if (item) {
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                let image = item['image'] ;//////////
                console.log(item.price);
                newCart.innerHTML =
                    `<img src="${image}">
                    <div class="info">
                        <div class="name">${item.name}</div>
                        <div class="price">$${item.price}/1 product</div>
                    </div>
                    <div class="quantity">${item.quantity}</div>
                    <div class="returnPrice">$${item.price * item.quantity}</div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity += item.quantity;
                totalPrice += item.price * item.quantity;
                
            }
        });
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '$' + totalPrice.toFixed(2); 
}
document.addEventListener('DOMContentLoaded', function () {
    checkCart();
    addCartToHTML();
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Retrieve full name and phone number from the form
        const fullName = document.querySelector('input[name="name"]').value;
        const phoneNumber = document.querySelector('input[name="phone"]').value;

        // Retrieve cart details from localStorage
        const cartDetails = JSON.parse(localStorage.getItem('cart'));

        // Send the cart details to the server along with full name and phone number
        fetch('/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullName, phoneNumber, cartDetails }) // Include fullName and phoneNumber
        })
        .then(response => {
            if (response.ok) {
                // If the request was successful, redirect to a success page or do something else
                window.alert('Order placed successfully!');
            } else {
                // Handle errors
                throw new Error('Failed to submit form');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

});


let shoppingCart = document.querySelector(".list"); // Select the list container
let totalQuantity = document.querySelector(".totalQuantity");
let totalPrice = document.querySelector(".totalPrice");

let basket = JSON.parse(localStorage.getItem("cart")) || [];

const calculation = () => {
  let quantity = basket.reduce((acc, item) => acc + item.quantity, 0); // Calculate total quantity
  let price = basket.reduce((acc, item) => acc + item.price * item.quantity, 0); // Calculate total price

  totalQuantity.textContent = quantity;
  totalPrice.textContent = `$${price.toFixed(2)}`; // Format price with 2 decimal places
};

const generateCartItems = () => {
  if (basket.length === 0) {
    shoppingCart.innerHTML = "";
    return;
  }

  shoppingCart.innerHTML = basket
  .map((item) => {
    if (item.price !== undefined) {
      return `
        <div class="cart-item">
          <img width="100" src="${item.image}" alt="${item.name}" />
          <div class="details">
            <div class="title-price-x">
              <h4 class="title-price">
                <p>${item.name}</p>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
              </h4>
            </div>
          </div>
        </div>
      `;
    } else {
      return ""; // Skip rendering if price is undefined
    }
  })
  .join("");
};
