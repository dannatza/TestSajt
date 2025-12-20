// Dobij ID proizvoda iz URL-a
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

// Učitaj detalje proizvoda
function loadProductDetails() {
    const productId = getProductIdFromURL();
    const product = products.find(p => p.id === productId);

    if (!product) {
        document.body.innerHTML = '<div style="text-align: center; padding: 50px;"><h2>Производ није пронађен</h2></div>';
        return;
    }

    // Update page elements
    document.getElementById('productName').textContent = product.name;
    document.getElementById('imageDisplay').innerHTML = `<img src="${product.image}" alt="${product.name}">`;
    document.getElementById('productStars').textContent = '★'.repeat(Math.floor(product.rating));
    document.getElementById('productRating').textContent = product.rating;
    document.getElementById('productReviews').textContent = `(${product.reviews})`;
    document.getElementById('productPrice').textContent = `$${product.price}`;
    document.getElementById('productOriginalPrice').textContent = `$${product.originalPrice}`;
    document.getElementById('productDescription').textContent = product.description;

    // Calculate and display discount
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    document.getElementById('discountBadge').textContent = `-${discount}%`;

    // Display specifications
    const specsGrid = document.getElementById('specsGrid');
    specsGrid.innerHTML = Object.entries(product.specs).map(([key, value]) => `
        <div class="spec-item">
            <span class="spec-label">${key.charAt(0).toUpperCase() + key.slice(1)}:</span>
            <span class="spec-value">${value}</span>
        </div>
    `).join('');

    // Stock status
    const stockStatus = document.getElementById('stockStatus');
    const stock = getProductStock(product.id);
    const isOutOfStock = stock === 0;
    
    if (isOutOfStock) {
        stockStatus.textContent = `✗ Нема на залихи`;
        stockStatus.classList.add('out-of-stock');
        stockStatus.classList.remove('in-stock');
    } else {
        stockStatus.textContent = `✓ На залихи`;
        stockStatus.classList.add('in-stock');
        stockStatus.classList.remove('out-of-stock');
    }

    // Učitaj opcije proizvoda
    if (product.options) {
        const optionsContainer = document.getElementById('productOptions');
        optionsContainer.innerHTML = Object.entries(product.options).map(([optionName, optionValues]) => `
            <div class="product-option-detail">
                <label for="option-${optionName}">${optionName === 'color' ? 'Боја' : optionName === 'storage' ? 'Меморија' : optionName === 'size' ? 'Величина' : optionName.charAt(0).toUpperCase() + optionName.slice(1)}:</label>
                <select id="option-${optionName}" onchange="updateDetailOptionSelection(${product.id}, '${optionName}', this.value)" class="option-select-detail">
                    <option value="">Одаберите ${optionName === 'color' ? 'боју' : optionName === 'storage' ? 'меморију' : optionName === 'size' ? 'величину' : optionName}...</option>
                    ${optionValues.map(val => `<option value="${val}">${val}</option>`).join('')}
                </select>
            </div>
        `).join('');
    }

    // Učitaj povezane proizvode
    loadRelatedProducts(product.category, product.id);
}

// Učitaj povezane proizvode
function loadRelatedProducts(category, currentProductId) {
    const related = products.filter(p => 
        p.category === category && p.id !== currentProductId
    ).slice(0, 4);

    const relatedGrid = document.getElementById('relatedGrid');
    relatedGrid.innerHTML = related.map(product => `
        <div class="product-card">
            <div class="product-image"><img src="${product.image}" alt="${product.name}"></div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${'★'.repeat(Math.floor(product.rating))}</span>
                    <span class="rating-value">${product.rating}</span>
                    <span class="reviews">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price}</span>
                    <span class="original-price">$${product.originalPrice}</span>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToCartQuick(${product.id})">Додај у корпу</button>
                    <a href="product.html?id=${product.id}" class="btn btn-secondary">Прикажи детаље</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Kontrole količine
function increaseQuantity() {
    const qty = document.getElementById('quantity');
    qty.value = parseInt(qty.value) + 1;
}

function decreaseQuantity() {
    const qty = document.getElementById('quantity');
    if (parseInt(qty.value) > 1) {
        qty.value = parseInt(qty.value) - 1;
    }
}

// Čuvaj odabrane opcije za stranicu detaljа
let detailSelectedOptions = {};

// Ažuriraj izbor opcije na stranici detaljа
function updateDetailOptionSelection(productId, optionName, optionValue) {
    if (!detailSelectedOptions[productId]) {
        detailSelectedOptions[productId] = {};
    }
    detailSelectedOptions[productId][optionName] = optionValue;
}

// Dodaj u korpу iz stranice detaljа proizvoda
function addToCartFromDetails() {
    const productId = getProductIdFromURL();
    const product = products.find(p => p.id === productId);
    const quantity = parseInt(document.getElementById('quantity').value);

    if (product) {
        // Proverite da li proizvod ima obavezne opcije
        if (product.options) {
            const options = detailSelectedOptions[productId] || {};
            const requiredOptions = Object.keys(product.options);
            const selectedOptionKeys = Object.keys(options).filter(key => options[key] !== '');
            
            if (selectedOptionKeys.length < requiredOptions.length) {
                cart.showNotification('Molimo odaberite sve opcije!');
                return;
            }
        }
        
        // Proverite da li ima dovoljno skladišta dostupno
        const stock = getProductStock(product.id);
        if (stock < quantity) {
            cart.showNotification(`Имате само ${stock} артикала на залихи!`);
            return;
        }
        
        // Smanji skladište za svaki artikal
        for (let i = 0; i < quantity; i++) {
            if (!decreaseStock(product.id)) break;
        }
        
        const cartItem = {
            ...product,
            selectedOptions: detailSelectedOptions[productId] || {}
        };
        cart.addItem(cartItem, quantity);
        // Resetuj količinu i opcije
        document.getElementById('quantity').value = 1;
        detailSelectedOptions[productId] = {};
        
        // Ponovno učitaj detalje proizvoda da prikaži ažurirano skladište
        loadProductDetails();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Load stock first
    loadStock();
    
    loadProductDetails();
    cart.updateCartCount();

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchBar = document.querySelector('.search-bar');
    
    if (searchBtn && searchBar) {
        searchBtn.addEventListener('click', () => {
            window.location.href = `index.html?search=${encodeURIComponent(searchBar.value)}`;
        });

        searchBar.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                window.location.href = `index.html?search=${encodeURIComponent(searchBar.value)}`;
            }
        });
    }
});
