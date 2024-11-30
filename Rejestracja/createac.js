document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    fetch('http://localhost:3300/register', {
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
            messageDiv.textContent = `Konto zostało pomyślnie utworzone! Mozesz się zalogować`;
            setTimeout(() => {
                window.location.href = 'index.html'; 
            }, 3000);
        } else {
            messageDiv.textContent = "Błąd: " + data.message;
        }
    })
    .catch(error => {
        console.error('Błąd w żądaniu:', error);
    });
});