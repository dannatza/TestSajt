// Get product ID from URL
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

// Load product details
function loadProductDetails() {
    const productId = getProductIdFromURL();
    const product = products.find(p => p.id === productId);

    if (!product) {
        document.body.innerHTML = '<div style="text-align: center; padding: 50px;"><h2>Производ није пронађен</h2></div>';
        return;
    }

    // Update page elements
    document.getElementById('productBreadcrumb').textContent = product.name;
    document.getElementById('productName').textContent = product.name;
    document.getElementById('imageDisplay').textContent = product.image;
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
    if (product.inStock) {
        stockStatus.textContent = '✓ На залихи';
        stockStatus.classList.add('in-stock');
    } else {
        stockStatus.textContent = '✗ Нема на залихи';
        stockStatus.classList.remove('in-stock');
        stockStatus.classList.add('out-of-stock');
    }

    // Load related products
    loadRelatedProducts(product.category, product.id);
}

// Load related products
function loadRelatedProducts(category, currentProductId) {
    const related = products.filter(p => 
        p.category === category && p.id !== currentProductId
    ).slice(0, 4);

    const relatedGrid = document.getElementById('relatedGrid');
    relatedGrid.innerHTML = related.map(product => `
        <div class="product-card">
            <div class="product-image">${product.image}</div>
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

// Quantity controls
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

// Add to cart from product details page
function addToCartFromDetails() {
    const productId = getProductIdFromURL();
    const product = products.find(p => p.id === productId);
    const quantity = parseInt(document.getElementById('quantity').value);

    if (product) {
        cart.addItem(product, quantity);
        // Reset quantity
        document.getElementById('quantity').value = 1;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
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
