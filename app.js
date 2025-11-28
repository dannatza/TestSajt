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

// Display products on home page
function displayProducts(productsToShow = products) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = productsToShow.map(product => `
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

// Add to cart with quick add
function addToCartQuick(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product, 1);
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
});
