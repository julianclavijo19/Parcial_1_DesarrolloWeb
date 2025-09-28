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
        let selectedBarber = null; // Variable para almacenar el barbero seleccionado

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
                                productCard.setAttribute('price', `${product.precio.toLocaleString('es-CO')}`);
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
                const cutSelectionInput = document.getElementById('cut-selection'); // Nuevo input para el corte
                const clearSelectionButton = document.getElementById('clear-selection-btn');

                serviceButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const card = button.closest('.service-card');
                        selectedCut = card.querySelector('h3').textContent; // Almacenar el corte seleccionado
                        cutSelectionInput.value = selectedCut; // Mostrar el corte seleccionado
                        // console.log(`Service selected: ${selectedCut}, Current Barber: ${selectedBarber}`);

                        if (selectedBarber) {
                            // console.log('Barber already selected, going to reservation.');
                            reservasSection.scrollIntoView({ behavior: 'smooth' });
                        } else {
                            // console.log('Barber not selected, going to barber selection.');
                            barberosSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    });
                });

                barberButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const card = button.closest('.barber-card');
                        selectedBarber = card.querySelector('h3').textContent; // Almacenar el barbero seleccionado
                        barberSelectionInput.value = selectedBarber; // Mostrar el barbero seleccionado inmediatamente
                        // console.log(`Barber selected: ${selectedBarber}, Current Cut: ${selectedCut}`);

                        if (!selectedCut) {
                            // console.log('Cut not selected, going to cut selection.');
                            cortesSection.scrollIntoView({ behavior: 'smooth' });
                            return;
                        }

                        // console.log('Cut and Barber selected, going to reservation.');
                        reservasSection.scrollIntoView({ behavior: 'smooth' });
                    });
                });

                if (clearSelectionButton) {
                    clearSelectionButton.addEventListener('click', () => {
                        selectedCut = null;
                        selectedBarber = null;
                        cutSelectionInput.value = '';
                        barberSelectionInput.value = '';
                        // console.log('Selections cleared.');
                        // Opcional: scroll a la sección de cortes o al inicio
                        cortesSection.scrollIntoView({ behavior: 'smooth' });
                    });
                }

                // Lógica para los carouseles
                // console.log('Initializing carousels...');
                const carousels = document.querySelectorAll('#productos .carousel-container');
                // console.log(`Found ${carousels.length} carousels.`);

                carousels.forEach(carousel => {
                    // console.log('Processing a carousel.');
                    const cardContainer = carousel.querySelector('.card-container');
                    const leftArrow = carousel.querySelector('.left-arrow');
                    const rightArrow = carousel.querySelector('.right-arrow');

                    // console.log(`  cardContainer: ${cardContainer}`);
                    // console.log(`  leftArrow: ${leftArrow}`);
                    // console.log(`  rightArrow: ${rightArrow}`);

                    if (leftArrow && rightArrow && cardContainer) {
                        // console.log('  All carousel elements found. Attaching event listeners.');
                        let scrollAmount = 370; // Default scroll amount

                        // Try to get the actual card width + gap for more accurate scrolling
                        const firstCard = cardContainer.querySelector('.service-card, .barber-card');
                        if (firstCard) {
                            const cardWidth = firstCard.offsetWidth;
                            const gap = parseFloat(getComputedStyle(cardContainer).gap);
                            scrollAmount = cardWidth + gap;
                        }

                        // console.log(`Carousel: ${carousel.id || carousel.className}`);
                        // console.log(`  Scroll Amount: ${scrollAmount}`);
                        // console.log(`  Card Container Scroll Width: ${cardContainer.scrollWidth}`);
                        // console.log(`  Card Container Client Width: ${cardContainer.clientWidth}`);
                        // console.log(`  Overflow: ${cardContainer.scrollWidth > cardContainer.clientWidth ? 'Yes' : 'No'}`);

                        leftArrow.addEventListener('click', () => {
                            // console.log('Left arrow clicked!');
                            cardContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                        });

                        rightArrow.addEventListener('click', () => {
                            // console.log('Right arrow clicked!');
                            cardContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                        });
                    } else {
                        // console.log('  Missing one or more carousel elements.');
                    }
                });

                // Lógica para la animación de scroll del main-container
                const mainContainer = document.querySelector('.main-container');
                const bannerSection = document.getElementById('banner-section-container');

                const handleScrollAnimation = () => {
                    if (mainContainer && bannerSection) {
                        const bannerHeight = bannerSection.offsetHeight; // Get the actual height of the banner
                        // console.log(`Banner Height: ${bannerHeight}`);
                        // console.log(`Window ScrollY: ${window.scrollY}`);
                        if (window.scrollY > bannerHeight * 0.5) { // Trigger when scrolled halfway past the banner
                            // console.log('Adding show-content class to main-container');
                            mainContainer.classList.add('show-content');
                            window.removeEventListener('scroll', handleScrollAnimation);
                        }
                    }
                };

                window.addEventListener('scroll', handleScrollAnimation);

                // Trigger on load if already scrolled past the banner
                handleScrollAnimation();
            })
            .catch(error => console.error('Error al cargar una sección principal:', error));
    }
});