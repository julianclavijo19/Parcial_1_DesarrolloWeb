const productTemplate = document.createElement('template');
productTemplate.innerHTML = `
    <style>
        :host {
            display: flex; /* Make the host a flex container */
            font-family: 'Montserrat', sans-serif;
        }
        .product-card {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            display: flex;
            flex-direction: column;
            width: 100%; /* Ensure it fills the host */
        }
        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 15px rgba(0,0,0,0.1);
        }
        img {
            width: 100%;
            height: 220px;
            object-fit: cover;
        }
        .card-content {
            padding: 30px 20px;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            text-align: center;
            gap: 1rem; /* Adds space between elements */
        }
        h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            margin: 0 0 10px 0;
            color: #1a1a1a;
        }
        .description {
            font-size: 0.9rem;
            color: #777;
            margin: 0 0 15px 0;
            flex-grow: 1; /* Allow description to take up space */
        }
        .price {
            font-size: 1.2rem;
            font-weight: 500;
            color: #c5a47e;
            margin-bottom: 20px;
        }
        .btn-add {
            background-color: #1a1a1a;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 10px 20px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            margin-top: auto; /* Push button to the bottom */
        }
        .btn-add:hover {
            background-color: #333;
        }
    </style>
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
