import './components/product-card.js';

export const loadProducts = async () => {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    try {
        const response = await fetch('data/productos.json');
        const products = await response.json();
        products.forEach(product => {
            const productCard = document.createElement('product-card');
            productCard.setAttribute('name', product.nombre);
            productCard.setAttribute('description', product.descripcion);
            productCard.setAttribute('price', `${product.precio.toLocaleString('es-CO')}`);
            productCard.setAttribute('image-src', product.imagen);
            productList.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
};

export const initCarousels = () => {
    document.querySelectorAll('#productos .carousel-container').forEach(carousel => {
        const cardContainer = carousel.querySelector('.card-container');
        const leftArrow = carousel.querySelector('.left-arrow');
        const rightArrow = carousel.querySelector('.right-arrow');

        if (leftArrow && rightArrow && cardContainer) {
            const firstCard = cardContainer.querySelector('product-card');
            if (!firstCard) return;
            
            const cardWidth = firstCard.offsetWidth;
            const gap = parseFloat(getComputedStyle(cardContainer).gap);
            const scrollAmount = cardWidth + gap;

            leftArrow.addEventListener('click', () => cardContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
            rightArrow.addEventListener('click', () => cardContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
        }
    });
};