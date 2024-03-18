
function fetchOrderHistory() {
    const loggedInUsername = document.getElementById('loggedInUsername').value;

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
            if (!data || !data.hasOwnProperty('orderHistoriesList') || !Array.isArray(data.orderHistoriesList)) {
                throw new Error('Invalid data received');
            }
            const filteredOrderHistories = data.orderHistoriesList.filter(orderHistory => orderHistory.fullName === loggedInUsername);
            // Instead of rendering here, let's return the filtered data
            return filteredOrderHistories;
        })
        .then(renderOrderHistoriesList) // Render the filtered order histories here
        .catch(error => console.error('Error fetching or processing data:', error));
}

function renderOrderHistoriesList(filteredOrderHistories) {
    const orderHistoriesListContainer = document.getElementById('orderHistoriesList');

    // Check if orderHistoriesListContainer exists before setting innerHTML
    if (orderHistoriesListContainer) {
        orderHistoriesListContainer.innerHTML = ''; 

        filteredOrderHistories.forEach(orderHistory => { // Loop through filtered data instead of the global array
            const row = document.createElement('tr');

            const fullNameCell = document.createElement('td');
            fullNameCell.textContent = orderHistory.fullName;
            row.appendChild(fullNameCell);

            const phoneNumberCell = document.createElement('td');
            phoneNumberCell.textContent = orderHistory.phoneNumber;
            row.appendChild(phoneNumberCell);

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
