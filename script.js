// Translations for English and Hindi
const translations = {
    en: {
        logo: "ShopEasy",
        searchPlaceholder: "Search for products...",
        loginLink: "Login",
        moreLink: "More",
        electronicsText: "Electronics",
        fashionText: "Fashion",
        homeText: "Home",
        appliancesText: "Appliances",
        toysText: "Toys",
        featuredProducts: "Featured Products",
        yourCart: "Your Cart",
        totalText: "Total",
        aboutUs: "About Us",
        aboutText: "ShopEasy is your one-stop destination for all your shopping needs.",
        contact: "Contact Us",
        contactText: "Email: support@shopeasy.com",
        policy: "Policies",
        returnPolicy: "Return Policy",
        privacyPolicy: "Privacy Policy",
        addToCart: "Add to Cart",
        remove: "Remove",
        checkout: "Checkout"
    },
    hi: {
        logo: "शॉपईजी",
        searchPlaceholder: "उत्पादों की खोज करें...",
        loginLink: "लॉग इन",
        moreLink: "अधिक",
        electronicsText: "इलेक्ट्रॉनिक्स",
        fashionText: "फैशन",
        homeText: "घर",
        appliancesText: "उपकरण",
        toysText: "खिलौने",
        featuredProducts: "विशेष उत्पाद",
        yourCart: "आपकी खरीदारी",
        totalText: "कुल",
        aboutUs: "हमारे बारे में",
        aboutText: "शॉपईजी आपकी सभी खरीदारी की जरूरतों के लिए एकमात्र गंतव्य है।",
        contact: "संपर्क करें",
        contactText: "ईमेल: support@shopeasy.com",
        policy: "नीतियाँ",
        returnPolicy: "वापसी नीति",
        privacyPolicy: "गोपनीयता नीति",
        addToCart: "कार्ट में जोड़ें",
        remove: "हटाएं",
        checkout: "चेकआउट"
    }
};

// Current language
let currentLanguage = 'en';
let cart = [];
let products = [];

// DOM Elements
const languageSelector = document.getElementById('language-selector');
const logo = document.getElementById('logo');
const searchInput = document.getElementById('search-input');
const loginLink = document.getElementById('login-link');
const moreLink = document.getElementById('more-link');
const electronicsText = document.getElementById('electronics-text');
const fashionText = document.getElementById('fashion-text');
const homeText = document.getElementById('home-text');
const appliancesText = document.getElementById('appliances-text');
const toysText = document.getElementById('toys-text');
const featuredProducts = document.getElementById('featured-products');
const yourCart = document.getElementById('your-cart');
const totalText = document.getElementById('total-text');
const aboutUs = document.getElementById('about-us');
const aboutText = document.getElementById('about-text');
const contact = document.getElementById('contact');
const contactText = document.getElementById('contact-text');
const policy = document.getElementById('policy');
const returnPolicy = document.getElementById('return-policy');
const privacyPolicy = document.getElementById('privacy-policy');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Load products
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            displayProducts(products);
        })
        .catch(error => console.error('Error loading products:', error));

    // Set up event listeners
    languageSelector.addEventListener('change', changeLanguage);
    document.getElementById('cart-link').addEventListener('click', openCartModal);
    document.querySelector('.close-btn').addEventListener('click', closeCartModal);
    document.getElementById('search-btn').addEventListener('click', searchProducts);
    document.getElementById('search-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });

    // Initialize language
    updateLanguage();
});

// Change language
function changeLanguage() {
    currentLanguage = languageSelector.value;
    updateLanguage();
    displayProducts(products); // Refresh product display to update "Add to Cart" buttons
}

// Update all text elements with current language
function updateLanguage() {
    const lang = translations[currentLanguage];
    
    logo.textContent = lang.logo;
    searchInput.placeholder = lang.searchPlaceholder;
    loginLink.textContent = lang.loginLink;
    moreLink.textContent = lang.moreLink;
    electronicsText.textContent = lang.electronicsText;
    fashionText.textContent = lang.fashionText;
    homeText.textContent = lang.homeText;
    appliancesText.textContent = lang.appliancesText;
    toysText.textContent = lang.toysText;
    featuredProducts.textContent = lang.featuredProducts;
    yourCart.textContent = lang.yourCart;
    totalText.textContent = `${lang.totalText}:`;
    aboutUs.textContent = lang.aboutUs;
    aboutText.textContent = lang.aboutText;
    contact.textContent = lang.contact;
    contactText.textContent = lang.contactText;
    policy.textContent = lang.policy;
    returnPolicy.textContent = lang.returnPolicy;
    privacyPolicy.textContent = lang.privacyPolicy;
}

// Display products
function displayProducts(productsToDisplay) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    
    const lang = translations[currentLanguage];
    
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">₹${product.price}</p>
                <p class="product-rating">${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</p>
                <button class="add-to-cart" data-id="${product.id}">${lang.addToCart}</button>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
    
    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add product to cart
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    showCartNotification();
}

// Update cart count in navbar
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

// Show notification when item is added to cart
function showCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = translations[currentLanguage].addToCart;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#388e3c';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '1000';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    notification.style.animation = 'slideIn 0.3s ease';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Open cart modal
function openCartModal(e) {
    e.preventDefault();
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'flex';
    updateCartDisplay();
}

// Close cart modal
function closeCartModal() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'none';
}

// Update cart display in modal
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');
    const lang = translations[currentLanguage];
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p>${lang.yourCart} ${lang.empty}</p>`;
        totalAmountElement.textContent = '0';
        return;
    }
    
    let totalAmount = 0;
    
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;
        
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <p class="cart-item-price">₹${item.price} x ${item.quantity} = ₹${itemTotal}</p>
            </div>
            <span class="remove-item" data-id="${item.id}">${lang.remove}</span>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    totalAmountElement.textContent = totalAmount;
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
    
    // Update checkout button text
    document.getElementById('checkout-btn').textContent = lang.checkout;
}

// Remove item from cart
function removeFromCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartDisplay();
}

// Search products
function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        displayProducts(products);
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    displayProducts(filteredProducts);
}
