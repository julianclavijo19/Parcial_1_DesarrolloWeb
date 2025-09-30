const productTemplate = document.createElement('template');
productTemplate.innerHTML = `
    <link rel="stylesheet" href="css/product-card.css">
    <div class="product-card">
        <img src="" alt="Imagen del producto">
        <div class="card-content">
            <h3></h3>
            <p class="description"></p>
            <p class="price"></p>
            <button class="btn-add">Añadir al Carrito</button>
        </div>
    </div>
`;

class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(productTemplate.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['name', 'description', 'price', 'image-src'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'name':
                this.shadowRoot.querySelector('h3').textContent = newValue;
                break;
            case 'description':
                this.shadowRoot.querySelector('.description').textContent = newValue;
                break;
            case 'price':
                this.shadowRoot.querySelector('.price').textContent = newValue;
                break;
            case 'image-src':
                this.shadowRoot.querySelector('img').setAttribute('src', newValue);
                this.shadowRoot.querySelector('img').setAttribute('alt', `Imagen de ${this.getAttribute('name')}`);
                break;
        }
    }
}

customElements.define('product-card', ProductCard);
