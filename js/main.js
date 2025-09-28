import './components/product-card.js';

document.addEventListener('DOMContentLoaded', () => {

    // Lógica para la página de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('error-message');

            // Credenciales quemadas
            const validEmail = '123@gmail.com';
            const validPassword = '123';

            if (email === validEmail && password === validPassword) {
                window.location.href = 'index.html';
            } else {
                errorMessage.textContent = 'Correo o contraseña incorrectos. Inténtalo de nuevo.';
            }
        });
    }

    // Lógica para la página principal (index.html)
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        let selectedCut = null; // Variable para almacenar el corte seleccionado

        const loadComponent = (url, elementId) => {
            return fetch(url)
                .then(response => response.text())
                .then(data => {
                    const element = document.getElementById(elementId);
                    if (element) {
                        element.innerHTML = data;
                    }
                })
                .catch(error => console.error(`Error al cargar el componente desde ${url}:`, error));
        };

        // Cargar componentes estáticos (header, footer)
        loadComponent('components/header.html', 'header-container');
        loadComponent('components/footer.html', 'footer-container');

        // Cargar secciones de contenido en orden
        loadComponent('components/sections/banner.html?v=' + new Date().getTime(), 'banner-section-container')
            .then(() => loadComponent('components/sections/cortes.html', 'cortes-section-container'))
            .then(() => loadComponent('components/sections/productos.html', 'productos-section-container'))
            .then(() => {
                // Una vez que la sección de productos está cargada, cargar los productos dinámicamente
                const productList = document.getElementById('product-list');
                if (productList) {
                    fetch('data/productos.json')
                        .then(response => response.json())
                        .then(products => {
                            products.forEach(product => {
                                const productCard = document.createElement('product-card');
                                productCard.setAttribute('name', product.nombre);
                                productCard.setAttribute('description', product.descripcion);
                                productCard.setAttribute('price', `$${product.precio.toLocaleString('es-CO')}`);
                                productCard.setAttribute('image-src', product.imagen);
                                productList.appendChild(productCard);
                            });
                        })
                        .catch(error => console.error('Error al cargar los productos:', error));
                }
            })
            .then(() => loadComponent('components/sections/barberos.html', 'barberos-section-container'))
            .then(() => loadComponent('components/sections/reservas.html', 'reservas-section-container'))
            .then(() => {
                // Lógica de interacción para reservas (después de que todas las secciones estén cargadas)
                const serviceButtons = document.querySelectorAll('#cortes .btn-select');
                const barberButtons = document.querySelectorAll('#barberos .btn-select-barber');
                const cortesSection = document.getElementById('cortes'); // Obtener la sección de cortes
                const barberosSection = document.getElementById('barberos');
                const reservasSection = document.getElementById('reservas');
                const barberSelectionInput = document.getElementById('barber-selection');
                const clearSelectionButton = document.getElementById('clear-selection-btn');

                serviceButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const card = button.closest('.service-card');
                        selectedCut = card.querySelector('h3').textContent; // Almacenar el corte seleccionado
                        barberosSection.scrollIntoView({ behavior: 'smooth' });
                    });
                });

                barberButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        if (!selectedCut) {
                            // Si no hay corte seleccionado, redirigir a la sección de cortes (sin alerta)
                            cortesSection.scrollIntoView({ behavior: 'smooth' });
                            return;
                        }

                        const card = button.closest('.barber-card');
                        const barberName = card.querySelector('h3').textContent;
                        barberSelectionInput.value = barberName;
                        reservasSection.scrollIntoView({ behavior: 'smooth' });
                    });
                });

                if (clearSelectionButton) {
                    clearSelectionButton.addEventListener('click', () => {
                        selectedCut = null;
                        barberSelectionInput.value = '';
                        // Opcional: scroll a la sección de cortes o al inicio
                        cortesSection.scrollIntoView({ behavior: 'smooth' });
                    });
                }
            })
            .catch(error => console.error('Error al cargar una sección principal:', error));
    }
});
