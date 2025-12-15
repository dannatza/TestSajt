// Učitaj i prikaži artikle iz korpe
function loadCart() {
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');

    if (cart.items.length === 0) {
        cartItems.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    }

    cartItems.style.display = 'block';
    emptyCart.style.display = 'none';

    cartItems.innerHTML = cart.items.map(item => `
        <div class="cart-item">
            <div class="item-image">${item.image}</div>
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="item-category">${item.category}</p>
                ${item.selectedOptions && Object.keys(item.selectedOptions).length > 0 ? `
                    <p class="item-options">
                        ${Object.entries(item.selectedOptions).map(([key, value]) => `<span>${key}: ${value}</span>`).join(' | ')}
                    </p>
                ` : ''}
                <p class="item-price">$${item.price}</p>
            </div>
            <div class="item-quantity">
                <label for="qty-${item.id}">Кол:</label>
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">−</button>
                    <input type="number" id="qty-${item.id}" value="${item.quantity}" readonly>
                    <button class="qty-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <div class="item-total">
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
        </div>
    `).join('');

    updateSummary();
}

// Ažuriraj količinu artikla
function updateCartQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    cart.updateQuantity(productId, newQuantity);
    loadCart();
}

// Ukloni artikal iz korpe
function removeFromCart(productId) {
    cart.removeItem(productId);
    loadCart();
    cart.showNotification('Производ уклоњен из корпе');
}

// Ažuriraj sažetak narudžbine
function updateSummary() {
    const subtotal = cart.getTotal();
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 50 ? 0 : 10;
    const total = subtotal + tax + shipping;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'БЕСПЛАТНО' : `$${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Apply promo code
function applyPromo() {
    const promoCode = document.getElementById('promoCode').value.toUpperCase();
    const promoCodes = {
        'TECH10': 0.10,
        'SAVE20': 0.20,
        'SUMMER': 0.15
    };

    if (promoCodes[promoCode]) {
        const discount = cart.getTotal() * promoCodes[promoCode];
        const newTotal = (cart.getTotal() * (1 - promoCodes[promoCode]) + (cart.getTotal() * (1 - promoCodes[promoCode])) * 0.08);
        
        document.getElementById('total').textContent = `$${newTotal.toFixed(2)}`;
        cart.showNotification(`Промо код је примењен! Уштедели сте $${discount.toFixed(2)}`);
        document.getElementById('promoCode').value = '';
    } else {
        cart.showNotification('Неважећи промо код');
    }
}

// Checkout function
function checkout() {
    if (cart.items.length === 0) {
        alert('Ваша корпа је празна!');
        return;
    }

    alert(`Наруџба потврђена! Укупно: $${cart.getTotal().toFixed(2)}\n\nХвала што сте куповали у TechHub-у!`);
    cart.clearCart();
    loadCart();
    cart.updateCartCount();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
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
