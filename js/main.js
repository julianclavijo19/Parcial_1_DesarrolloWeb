import { loadComponent } from './componentLoader.js';
import { handleLoginForm } from './loginForm.js';
import { loadProducts, initCarousels } from './products.js';
import { initReservationSystem } from './reservations.js';
import { initAnimations } from './animations.js';

const initIndexPage = async () => {
    await Promise.all([
        loadComponent('components/header.html', 'header-container'),
        loadComponent('components/footer.html', 'footer-container')
    ]);

    initAnimations();

    await loadComponent('components/sections/banner.html', 'banner-section-container');
    await loadComponent('components/sections/cortes.html', 'cortes-section-container');
    await loadComponent('components/sections/productos.html', 'productos-section-container');
    await loadProducts();
    await loadComponent('components/sections/barberos.html', 'barberos-section-container');
    await loadComponent('components/sections/reservas.html', 'reservas-section-container');
    
    initCarousels();
    initReservationSystem();
};

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('login-form')) {
        handleLoginForm();
    } else if (document.getElementById('main-content')) {
        initIndexPage();
    }
});