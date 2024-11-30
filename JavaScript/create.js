document.getElementById('createForm').addEventListener('submit', async function(event) { 
    event.preventDefault();
    const producent = document.getElementById('producent').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value; 

    try {
        const response = await fetch('http://localhost:3300/assets', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ producent, name, description })  // Konwersja danych na JSON
        });
        const result = await response.json(); // odpowiedz JS do java scripta

        if (result.success) {
            document.getElementById('message').textContent = 'Asset został dodany!'; // 'Asset został dodany!';
            setTimeout(() => window.location.href = 'dashboard.html', 2000); // Przekierowanie na stronę główną
        } else {
            document.getElementById('message').textContent = 'Błąd podczas dodawania assetu.'; // W przypadku błędu wyświetl komunikat
        }
    } catch (error) {
        console.error('Błąd podczas dodawania assetu:', error); // W przypadku błędu wyświetla komunikat o błędzie dodania assetu
        document.getElementById('message').textContent = 'Wystąpił błąd.'; // W przypadku błędu wyświetl komunikat
    }
});