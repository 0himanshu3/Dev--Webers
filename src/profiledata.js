
// let profilelist = [];
// window.onload = function () {
//     fetch('/profile')
//     .then(response => {
//         console.log('Response:', response);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const contentType = response.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//             throw new TypeError('Response is not in JSON format');
//         }

//         return response.json(); // Parse the response as JSON
//     })
//     .then(data => {
//         profilelist = data;
//         renderProfileList();
//     })
//         .catch(error => console.error('Error fetching or processing data:', error));
// };


// // Function to render profile list
// function renderProfileList() {
//     const profileListContainer = document.getElementById('profileList');
//     profileListContainer.innerHTML = ''; 

//     profilelist.forEach(order => {
//         const row = document.createElement('tr');
        
//         const fullNameCell = document.createElement('td');
//         fullNameCell.textContent = order.fullName;
//         row.appendChild(fullNameCell);

//         const phoneNumberCell = document.createElement('td');
//         phoneNumberCell.textContent = order.phoneNumber;
//         row.appendChild(phoneNumberCell);

//         // Create a table to display cart details
//         const cartDetailsTable = document.createElement('table');

//         // Loop through cart details array
//         order.cartDetails.forEach(item => {
//             const cartRow = document.createElement('tr');

//             const nameCell = document.createElement('td');
//             nameCell.textContent = item.name;
//             cartRow.appendChild(nameCell);

//             const quantityCell = document.createElement('td');
//             quantityCell.textContent = item.quantity;
//             cartRow.appendChild(quantityCell);

//             const priceCell = document.createElement('td');
//             priceCell.textContent = item.price;
//             cartRow.appendChild(priceCell);

//             // Append each cart row to the cart details table
//             cartDetailsTable.appendChild(cartRow);
//         });

//         // Append the cart details table to the row
//         const cartDetailsCell = document.createElement('td');
//         cartDetailsCell.appendChild(cartDetailsTable);
//         row.appendChild(cartDetailsCell);

//         profileListContainer.appendChild(row);
//     });
// }
