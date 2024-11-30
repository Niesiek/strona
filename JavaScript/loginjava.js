document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    //Podanie loginu
    const username = document.getElementById('username').value;
    //Podanie hasła 
    const password = document.getElementById('password').value;
    
    //Nawiązanie połączenia z serwerem
    fetch('http://localhost:3300/login', {  
        method: 'POST',
        headers: {
               'Content-Type': 'application/json'
                  },
           body: JSON.stringify({ username, password })
            })
    .then(response => response.json())
    .then(data => {
        const messageDiv = document.getElementById('message');
        if (data.success) {
            messageDiv.textContent = data.message;
            window.location.href = "/dashboard.html"
        } else {
            messageDiv.textContent = data.message;
        }
    //Błąd Połączenia
    })
    .catch(error => {
        console.error('Błąd:', error);
    });
});