
document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // 1. SELECT HTML ELEMENTS
    // ==============================

    const searchInput = document.querySelector("#searchInput");
    const searchBtn = document.querySelector("#searchBtn");

    const categoryCards = document.querySelectorAll(".category-card");
    const productGrid = document.querySelector("#productGrid");
    const productCards = document.querySelectorAll(".product-card");

    const sortProducts = document.querySelector("#sortProducts");

    const cartBtn = document.querySelector("#cartBtn");
    const cartSection = document.querySelector("#cartSection");
    const closeCart = document.querySelector("#closeCart");

    const cartItems = document.querySelector("#cartItems");
    const cartTotal = document.querySelector("#cartTotal");
    const cartCount = document.querySelector("#cartCount");

    const checkoutBtn = document.querySelector("#checkoutBtn");


    // ==============================
    // 2. CART DATA
    // ==============================

    let cart = JSON.parse(localStorage.getItem("warriorsCart")) || [];

    let selectedCategory = "all";


    // ==============================
    // 3. SAVE CART TO LOCAL STORAGE
    // ==============================

    function saveCart() {
        localStorage.setItem("warriorsCart", JSON.stringify(cart));
    }


    // ==============================
    // 4. DISPLAY PRODUCTS
    // ==============================

    function filterProducts() {

        const searchValue = searchInput.value.toLowerCase().trim();

        productCards.forEach(product => {

            const productName = product.querySelector("h3")?.textContent.toLowerCase() || "";

            const productCategory = product.dataset.category;

            const matchesSearch = productName.includes(searchValue);

            const matchesCategory =
                selectedCategory === "all" ||
                productCategory === selectedCategory;

            product.classList.toggle(
                "hide",
                !(matchesSearch && matchesCategory)
            );

        });

    }


    // ==============================
    // 5. SEARCH PRODUCTS
    // ==============================

    if (searchInput) {
        searchInput.addEventListener("input", filterProducts);
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", filterProducts);
    }


    // ==============================
    // 6. CATEGORY FILTER
    // ==============================

    categoryCards.forEach(category => {

        category.addEventListener("click", () => {

            categoryCards.forEach(card => {
                card.classList.remove("active");
            });

            category.classList.add("active");

            selectedCategory = category.dataset.category;

            filterProducts();

        });

    });


    // ==============================
    // 7. SORT PRODUCTS
    // ==============================

    if (sortProducts) {

        sortProducts.addEventListener("change", () => {

            const products = Array.from(productCards);

            const sortValue = sortProducts.value;

            products.sort((a, b) => {

                const priceA = Number(a.querySelector(".add-cart").dataset.price);
                const priceB = Number(b.querySelector(".add-cart").dataset.price);

                const nameA = a.querySelector("h3").textContent.toLowerCase();
                const nameB = b.querySelector("h3").textContent.toLowerCase();

                if (sortValue === "low") {
                    return priceA - priceB;
                }

                if (sortValue === "high") {
                    return priceB - priceA;
                }

                if (sortValue === "name") {
                    return nameA.localeCompare(nameB);
                }

                return 0;

            });

            products.forEach(product => {
                productGrid.appendChild(product);
            });

        });

    }


    // ==============================
    // 8. ADD PRODUCT TO CART
    // ==============================

    productGrid.addEventListener("click", (event) => {

        const button = event.target.closest(".add-cart");

        if (!button) return;

        const productName = button.dataset.name;
        const productPrice = Number(button.dataset.price);

        const existingProduct = cart.find(
            item => item.name === productName
        );

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });

        }

        saveCart();
        displayCart();

        button.textContent = "ADDED ✓";

        setTimeout(() => {
            button.textContent = "ADD TO CART";
        }, 1000);

    });


    // ==============================
    // 9. DISPLAY CART
    // ==============================

    function displayCart() {

        cartItems.innerHTML = "";

        let total = 0;
        let totalQuantity = 0;

        if (cart.length === 0) {

            cartItems.innerHTML = `
                <p class="empty-cart">
                    Your cart is empty!
                </p>
            `;

        }

        cart.forEach((item, index) => {

            const itemTotal = item.price * item.quantity;

            total += itemTotal;
            totalQuantity += item.quantity;

            const cartItem = document.createElement("div");

            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <p>₹${item.price.toLocaleString("en-IN")}</p>

                </div>

                <div class="cart-item-actions">

                    <button class="quantity-btn"
                        data-index="${index}"
                        data-action="decrease">−</button>

                    <span>${item.quantity}</span>

                    <button class="quantity-btn"
                        data-index="${index}"
                        data-action="increase">+</button>

                    <button class="remove-btn"
                        data-index="${index}">✕</button>

                </div>

                <p class="item-total">
                    ₹${itemTotal.toLocaleString("en-IN")}
                </p>
            `;

            cartItems.appendChild(cartItem);

        });

        cartTotal.textContent = `₹${total.toLocaleString("en-IN")}`;

        cartCount.textContent = totalQuantity;

        saveCart();

    }


    // ==============================
    // 10. INCREASE / DECREASE QUANTITY
    // ==============================

    cartItems.addEventListener("click", (event) => {

        const button = event.target.closest("button");

        if (!button) return;

        const index = Number(button.dataset.index);

        if (!cart[index]) return;

        const action = button.dataset.action;

        if (action === "increase") {

            cart[index].quantity++;

        }

        if (action === "decrease") {

            cart[index].quantity--;

            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }

        }

        if (button.classList.contains("remove-btn")) {

            cart.splice(index, 1);

        }

        saveCart();
        displayCart();

    });


    // ==============================
    // 11. OPEN CART
    // ==============================

    if (cartBtn) {

        cartBtn.addEventListener("click", () => {

            cartSection.classList.add("show");

        });

    }


    // ==============================
    // 12. CLOSE CART
    // ==============================

    if (closeCart) {

        closeCart.addEventListener("click", () => {

            cartSection.classList.remove("show");

        });

    }


    // ==============================
    // 13. CHECKOUT
    // ==============================

    if (checkoutBtn) {

        checkoutBtn.addEventListener("click", () => {

            if (cart.length === 0) {

                alert("Your cart is empty!");

                return;

            }

            let message = "Hello WARRIORS! I want to order:\n\n";

            cart.forEach(item => {

                message +=
                    `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;

            });

            const total = cart.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            message += `\nTotal: ₹${total}`;

            const whatsappURL =
                `https://wa.me/?text=${encodeURIComponent(message)}`;

            window.open(whatsappURL, "_blank");

        });

    }


    // ==============================
    // 14. INITIALIZE CART
    // ==============================

    displayCart();

    filterProducts();

});
