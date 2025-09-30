export const initReservationSystem = () => {
    const serviceButtons = document.querySelectorAll('#cortes .btn-select');
    const barberButtons = document.querySelectorAll('#barberos .btn-select-barber');
    const cortesSection = document.getElementById('cortes');
    const barberosSection = document.getElementById('barberos');
    const reservasSection = document.getElementById('reservas');
    const cutSelectionInput = document.getElementById('cut-selection');
    const barberSelectionInput = document.getElementById('barber-selection');
    const clearSelectionButton = document.getElementById('clear-selection-btn');

    let selectedCut = null;
    let selectedBarber = null;

    serviceButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedCut = button.closest('.service-card').querySelector('h3').textContent;
            cutSelectionInput.value = selectedCut;
            (selectedBarber ? reservasSection : barberosSection).scrollIntoView({ behavior: 'smooth' });
        });
    });

    barberButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedBarber = button.closest('.barber-card').querySelector('h3').textContent;
            barberSelectionInput.value = selectedBarber;
            (selectedCut ? reservasSection : cortesSection).scrollIntoView({ behavior: 'smooth' });
        });
    });

    if (clearSelectionButton) {
        clearSelectionButton.addEventListener('click', () => {
            selectedCut = null;
            selectedBarber = null;
            cutSelectionInput.value = '';
            barberSelectionInput.value = '';
            cortesSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
};