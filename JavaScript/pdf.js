    // Import jsPDF 
    document.addEventListener('DOMContentLoaded', () => {
        const generatePDFButton = document.getElementById('generatePDF');
    
        generatePDFButton.addEventListener('click', async () => {
            try {
                // Odwołanie do Assetów
                const response = await fetch('http://localhost:3300/assets');
                const assets = await response.json();
    
                // Inicjalizacja generowania PDF
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF();
    
                // Dodanie tytułu
                pdf.setFontSize(10);
                pdf.setFont('normal')
                pdf.text('Lista Assetów', 10, 10);
    
                // Dodanie assetów metodą dynamiczną
                let yOffset = 20;
                assets.forEach((asset, index) => {
                    const content = `${index + 1}. ${asset.name} (${asset.producent}) - ${asset.description}`;
                    pdf.text(content, 10, yOffset);
                    yOffset += 10;

                    

    
                    // Dodanie strony jeżeli limit słów przekracza 200 słów
                    if (yOffset > 280) {
                        pdf.addPage();
                        yOffset = 10;
                    }
                });
    
                // Zapis PDF
                pdf.save('assets.pdf');
            } catch (error) {
                //Powiadomienie o nieudanym generowaniu pliku
                console.error('Błąd podczas generowania PDF:', error);
                alert('Nie udało się wygenerować PDF.');
            }
        });
    });
    