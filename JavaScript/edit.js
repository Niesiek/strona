function getAssetIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}


async function fetchAsset(id) {
    try {
        const response = await fetch(`http://localhost:3000/assets/${id}`);
        const asset = await response.json();

        document.getElementById('producent').value = asset.producent;
        document.getElementById('name').value = asset.name;
        document.getElementById('description').value = asset.description;
    } catch (error) {
        console.error('Błąd podczas pobierania assetu:', error);
    }
}


// Przypisanie nowych wartości Assetowi
document.getElementById('editForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const id = getAssetIdFromUrl();
    const producent = document.getElementById('producent').value;  
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;


    try {
        const response = await fetch(`http://localhost:3300/assets/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ producent, name, description }) 
        });
        const result = await response.json();
// Sprawdzanie czy zaktualizowano
        if (result.success) {
            alert('Asset został zaktualizowany.');
            setTimeout(() => window.location.href = 'dashboard.html', 2000);
        } else {
            alert('Błąd podczas aktualizacji assetu.');
        }
    } catch (error) {
        console.error('Błąd podczas aktualizacji assetu:', error);
    }
});

const assetId = getAssetIdFromUrl();
fetchAsset(assetId);