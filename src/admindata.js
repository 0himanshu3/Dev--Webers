let orderHistoriesList = [];
let userslist = [];

// Fetch userslist data
window.onload = function () {
  fetch('/admin')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
              return response.json();
          } else {
              throw new TypeError('Response is not in JSON format');
          }
      })
      .then(data => {
        if (!data || !data.hasOwnProperty('userslist') || !Array.isArray(data.userslist)) {
            throw new Error('Invalid data received');
        }
        userslist = data.userslist.reverse();
        renderUsersList();

        if (!data || !data.hasOwnProperty('orderHistoriesList') || !Array.isArray(data.orderHistoriesList)) {
            throw new Error('Invalid data received');
        }
        orderHistoriesList = data.orderHistoriesList.reverse();
        renderOrderHistoriesList();
      })
      .catch(error => console.error('Error fetching or processing data:', error));
};


// Function to render users list
function renderUsersList() {
    const userListContainer = document.getElementById('userList');
    
    // Check if userListContainer exists before setting innerHTML
    if (userListContainer) {
        userListContainer.innerHTML = ''; 

        userslist.forEach(user => {
            const row = document.createElement('tr');
            
            const usernameCell = document.createElement('td');
            usernameCell.textContent = user.username;
            row.appendChild(usernameCell);

            const userTypeCell = document.createElement('td');
            userTypeCell.textContent = user.usertype;
            row.appendChild(userTypeCell);

            userListContainer.appendChild(row);
        });
    } else {
        console.error('userListContainer element not found.');
    }
}
function renderOrderHistoriesList() {
    const orderHistoriesListContainer = document.getElementById('orderHistoriesList');

    // Check if orderHistoriesListContainer exists before setting innerHTML
    if (orderHistoriesListContainer) {
        orderHistoriesListContainer.innerHTML = ''; 

        orderHistoriesList.forEach(orderHistory => {
            const row = document.createElement('tr');

            const fullNameCell = document.createElement('td');
            fullNameCell.textContent = orderHistory.fullName;
            row.appendChild(fullNameCell);

            const phoneNumberCell = document.createElement('td');
            phoneNumberCell.textContent = orderHistory.phoneNumber;
            row.appendChild(phoneNumberCell);

            // const orderIdCell = document.createElement('td');
            // orderIdCell.textContent = orderHistory._id;
            // row.appendChild(orderIdCell);

            const cartDetailsTable = document.createElement('table');
            cartDetailsTable.style.borderCollapse = 'collapse';
            cartDetailsTable.style.width = '100%';

            orderHistory.cartDetails.forEach((item, index) => {
                const row = document.createElement('tr');

                const nameCell = document.createElement('td');
                nameCell.textContent = item.name;
                row.appendChild(nameCell);

                // const productIdCell = document.createElement('td');
                // productIdCell.textContent = item.product_id;
                // row.appendChild(productIdCell);

                const quantityCell = document.createElement('td');
                quantityCell.textContent = item.quantity;
                row.appendChild(quantityCell);

                const priceCell = document.createElement('td');
                priceCell.textContent = item.price;
                row.appendChild(priceCell);

                const imageCell = document.createElement('td');const image = document.createElement('img');
                image.src = item.image;
                image.style.width = '50px';
                image.style.height = '50px';
                imageCell.appendChild(image);
                row.appendChild(imageCell);

                cartDetailsTable.appendChild(row);
            });

            const cartDetailsCell = document.createElement('td');
            cartDetailsCell.appendChild(cartDetailsTable);
            row.appendChild(cartDetailsCell);

            orderHistoriesListContainer.appendChild(row);
        });
    } else {
        console.error('orderHistoriesListContainer element not found.');
    }
}
