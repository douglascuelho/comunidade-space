document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItems = document.querySelector(".cart-items");
    const totalElement = document.querySelector(".total");
    let total = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const product = button.parentElement;
            const productName = product.querySelector("h3").textContent;
            const productPrice = parseFloat(button.dataset.price);

            addToCart(productName, productPrice);
            updateTotal();
        });
    });

    function addToCart(name, price) {
        const existingItem = cartItems.querySelector(`[data-name="${name}"]`);
        if (existingItem) {
            const quantityElement = existingItem.querySelector(".quantity");
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;
        } else {
            const cartItem = document.createElement("li");
            cartItem.classList.add("cart-item");
            cartItem.dataset.name = name;
            cartItem.innerHTML = `
                <img src="product-placeholder.jpg" alt="${name}">
                <div class="item-info">
                    <p>${name}</p>
                    <p>Preço: R$ ${price}</p>
                    <p>Quantidade: <span class="quantity">1</span></p>
                </div>
                <button class="remove-item">Remover</button>
            `;
            cartItems.appendChild(cartItem);

            const removeButton = cartItem.querySelector(".remove-item");
            removeButton.addEventListener("click", function () {
                cartItems.removeChild(cartItem);
                updateTotal();
            });
        }
    }

    function updateTotal() {
        total = 0;
        const items = cartItems.querySelectorAll(".cart-item");
        items.forEach(item => {
            const price = parseFloat(item.querySelector(".item-info p:nth-child(2)").textContent.replace("Preço: R$ ", ""));
            const quantity = parseInt(item.querySelector(".quantity").textContent);
            total += price * quantity;
        });
        totalElement.textContent = total.toFixed(2);
    }
});
