// Cart Management System
class Cart {
    constructor() {
        this.items = this.loadCart();
    }

    // Load cart from localStorage
    loadCart() {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    // Add item to cart
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                ...product,
                quantity: quantity
            });
        }

        this.saveCart();
        this.showNotification(`Додано ${quantity} x ${product.name} у корпу`);
    }

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
    }

    // Update item quantity
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
        }
    }

    // Get cart total
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get item count
    getCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    // Clear cart
    clearCart() {
        this.items = [];
        this.saveCart();
    }

    // Update cart count in navbar
    updateCartCount() {
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = this.getCount();
        }
    }

    // Show notification toast
    showNotification(message) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        }
    }
}

// Initialize cart
const cart = new Cart();

// Filter state
let activeFilters = {
    price: { min: 0, max: 2000 },
    brands: [],
    types: [],
    rating: []
};

// Product stock storage
let productStock = {};

// Load stock from localStorage
function loadStock() {
    const saved = localStorage.getItem('productStock');
    if (saved) {
        productStock = JSON.parse(saved);
    } else {
        // Initialize stock from products
        products.forEach(p => {
            productStock[p.id] = p.stock || 10;
        });
        saveStock();
    }
}

// Save stock to localStorage
function saveStock() {
    localStorage.setItem('productStock', JSON.stringify(productStock));
}

// Get stock for a product
function getProductStock(productId) {
    if (!productStock.hasOwnProperty(productId)) {
        const product = products.find(p => p.id === productId);
        productStock[productId] = product ? product.stock || 10 : 0;
    }
    return productStock[productId];
}

// Decrease stock for a product
function decreaseStock(productId) {
    if (getProductStock(productId) > 0) {
        productStock[productId]--;
        saveStock();
        return true;
    }
    return false;
}

// Get unique brands and types
function getUniqueBrands() {
    return [...new Set(products.map(p => p.brand))];
}

function getUniqueTypes() {
    return [...new Set(products.map(p => p.type))];
}

// Initialize filter UI
function initializeFilters() {
    // Populate brand filter
    const brandFilter = document.getElementById('brandFilter');
    if (brandFilter) {
        const brands = getUniqueBrands();
        brandFilter.innerHTML = brands.map(brand => `
            <label>
                <input type="checkbox" value="${brand}" onchange="applyBrandFilter()"> ${brand}
            </label>
        `).join('');
    }

    // Populate type filter
    const typeFilter = document.getElementById('typeFilter');
    if (typeFilter) {
        const types = getUniqueTypes();
        typeFilter.innerHTML = types.map(type => `
            <label>
                <input type="checkbox" value="${type}" onchange="applyTypeFilter()"> ${type}
            </label>
        `).join('');
    }
}
function displayProducts(productsToShow = products) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = productsToShow.map(product => {
        const stock = getProductStock(product.id);
        const isOutOfStock = stock === 0;
        return `
        <div class="product-card ${isOutOfStock ? 'out-of-stock' : ''}">
            <div class="product-image">${product.image}</div>
            ${isOutOfStock ? '<div class="stock-badge">Нема на залихи</div>' : ''}
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
                ${stock > 0 ? `<div class="stock-info">Залихе: ${stock}/10</div>` : ''}
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToCartQuick(${product.id})" ${isOutOfStock ? 'disabled' : ''}>
                        ${isOutOfStock ? 'Нема на залихи' : 'Додај у корпу'}
                    </button>
                    <a href="product.html?id=${product.id}" class="btn btn-secondary">Прикажи детаље</a>
                </div>
            </div>
        </div>
    `}).join('');
}

// Add to cart with quick add
function addToCartQuick(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        if (decreaseStock(productId)) {
            cart.addItem(product, 1);
            // Refresh display to update stock
            displayProducts();
        } else {
            cart.showNotification('Производ није доступан!');
        }
    }
}

// Filter products by category
function filterByCategory(category) {
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    displayProducts(filtered);

    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Search products
function searchProducts(searchTerm) {
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayProducts(filtered);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Load stock first
    loadStock();
    
    // Display all products initially
    displayProducts();

    // Update cart count
    cart.updateCartCount();

    // Category filter listeners
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            filterByCategory(this.dataset.category);
        });
    });

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchBar = document.querySelector('.search-bar');
    
    if (searchBtn && searchBar) {
        searchBtn.addEventListener('click', () => {
            searchProducts(searchBar.value);
        });

        searchBar.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchProducts(searchBar.value);
            }
        });
    }

    // Initialize filters
    initializeFilters();

    // Filter toggle
    const filterToggle = document.getElementById('filterToggle');
    const filtersContent = document.getElementById('filtersContent');
    if (filterToggle && filtersContent) {
        filterToggle.addEventListener('click', () => {
            filtersContent.classList.toggle('active');
        });
    }
});

// Apply all active filters
function applyAllFilters() {
    let filtered = products;

    // Price filter
    filtered = filtered.filter(p => p.price >= activeFilters.price.min && p.price <= activeFilters.price.max);

    // Brand filter
    if (activeFilters.brands.length > 0) {
        filtered = filtered.filter(p => activeFilters.brands.includes(p.brand));
    }

    // Type filter
    if (activeFilters.types.length > 0) {
        filtered = filtered.filter(p => activeFilters.types.includes(p.type));
    }

    // Rating filter
    if (activeFilters.rating.length > 0) {
        filtered = filtered.filter(p => {
            return activeFilters.rating.some(minRating => p.rating >= minRating);
        });
    }

    displayProducts(filtered);
}

// Price filter
function applyPriceFilter() {
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || 2000;
    activeFilters.price = { min: minPrice, max: maxPrice };
    applyAllFilters();
}

function updatePriceDisplay(value) {
    document.getElementById('priceValue').textContent = value;
    document.getElementById('maxPrice').value = value;
}

// Brand filter
function applyBrandFilter() {
    const checkboxes = document.querySelectorAll('#brandFilter input:checked');
    activeFilters.brands = Array.from(checkboxes).map(cb => cb.value);
    applyAllFilters();
}

// Type filter
function applyTypeFilter() {
    const checkboxes = document.querySelectorAll('#typeFilter input:checked');
    activeFilters.types = Array.from(checkboxes).map(cb => cb.value);
    applyAllFilters();
}

// Rating filter
function applyRatingFilter() {
    const checkboxes = document.querySelectorAll('.filter-item input[value="5"], .filter-item input[value="4"], .filter-item input[value="3"]');
    activeFilters.rating = Array.from(document.querySelectorAll('.filter-item input:checked')).map(cb => parseInt(cb.value));
    applyAllFilters();
}

// Reset filters
function resetFilters() {
    // Reset filter state
    activeFilters = {
        price: { min: 0, max: 2000 },
        brands: [],
        types: [],
        rating: []
    };

    // Reset UI
    document.getElementById('minPrice').value = 0;
    document.getElementById('maxPrice').value = 2000;
    document.getElementById('priceSlider').value = 2000;
    document.getElementById('priceValue').textContent = 2000;
    
    document.querySelectorAll('#brandFilter input, #typeFilter input, .filter-item input').forEach(cb => {
        cb.checked = false;
    });

    // Display all products
    displayProducts(products);
    cart.showNotification('Филтери су обрисани');
}

// Filter Modal Functions
function openFilterModal() {
    const modal = document.getElementById('filterModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFilterModal() {
    const modal = document.getElementById('filterModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners for filter modal
document.addEventListener('DOMContentLoaded', function() {
    const filterOpenBtn = document.getElementById('filterOpenBtn');
    const filterCloseBtn = document.getElementById('filterCloseBtn');
    const filterModal = document.getElementById('filterModal');

    if (filterOpenBtn) {
        filterOpenBtn.addEventListener('click', openFilterModal);
    }

    if (filterCloseBtn) {
        filterCloseBtn.addEventListener('click', closeFilterModal);
    }

    // Close modal when clicking outside
    if (filterModal) {
        filterModal.addEventListener('click', function(e) {
            if (e.target === filterModal) {
                closeFilterModal();
            }
        });
    }
});
