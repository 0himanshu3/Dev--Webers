
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
          if (!data || !Array.isArray(data)) {
              throw new Error('Invalid data received');
          }
          userslist = data; // Assuming data is an array of users
          renderUsersList();
      })
      .catch(error => console.error('Error fetching or processing data:', error));
};



// Function to render users list
function renderUsersList() {
    const userListContainer = document.getElementById('userList');
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
}
