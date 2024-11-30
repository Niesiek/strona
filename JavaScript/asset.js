async function fetchAssets() {
    try {
        const response = await fetch('http://localhost:3300/assets'); 
        const assets = await response.json();           // Oczekiwanie na plik JSON
        renderAssets(assets);                           // Wywołanie funkcji renderującej
    } catch (error) {
        console.error('Błąd podczas pobierania assetów:', error); // Błąd pobierania
    }
}

function renderAssets(assets) {                             // Tablica renderująca obiektowe zasoby
    const container = document.getElementById('assetsContainer');   // Kontener do renderowania
    container.innerHTML = '';                          
    assets.forEach(asset => {                                   // Iteracja po zapisie
        const assetDiv = document.createElement('div');      
        assetDiv.classList.add('asset');                    // Stworzenie zasobów dla ASSET

        assetDiv.innerHTML = `<div class=assety>              
            <h3>${asset.name} (${asset.producent})</h3>     
            <p>${asset.description}</p>
            <div class="buttons">
                <button onclick="editAsset(${asset.id})">Edytuj</button>    
                <button onclick="deleteAsset(${asset.id})">Usuń</button>  
            </div>
            </div>
        `;

        // Użycie szablonów literowych do wstawienia obiektów z wartości 'asset' 
        // Utworzenie pierwszego przycisku (EDIT ZASOBÓW)
        // Utworzenie drugiego przycisku( USUNIĘCIE ZASOBÓW)

        container.appendChild(assetDiv);   //Dodanie elementów do kontenera
    });
}

function editAsset(id) {
    window.location.href = `edit.html?id=${id}`; // Przekierowanie do strony edycji
}

async function deleteAsset(id) {
    if (!confirm('Czy na pewno chcesz usunąć ten asset?')) return; 

    try {
        const response = await fetch(`http://localhost:3300/assets/${id}`, { 
            method: 'DELETE'
        });
        const result = await response.json();  // Oczekiwanie na opowiedź pliku JS

        if (result.success) {
            alert('Asset został usunięty.'); 
            fetchAssets();
        } else {
            alert('Błąd podczas usuwania assetu.');
        }
    } catch (error) {
        console.error('Błąd podczas usuwania assetu:', error);
    }
}

fetchAssets();