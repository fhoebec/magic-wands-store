
document.addEventListener('DOMContentLoaded', () => {
    const wands = Array.from({ length: 30 }, (_, i) => {
        const hasColors = i % 2 === 0;
        return {
            name: `Magic Wand ${i + 1}`,
            image: `images/wand${i + 1}.jpg`,
            colors: hasColors ? ["Black", "Brown", "Silver", "Golden"] : null
        };
    });

    const grid = document.getElementById('product-grid');
    const cartCountElement = document.getElementById('cart-count');
    const cartIcon = document.getElementById('cart-icon');
    let cart = [];

    wands.forEach(wand => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        card.innerHTML = `
            <img src="${wand.image}" alt="${wand.name}">
            <h2>${wand.name}</h2>
            ${wand.colors ? `
                <div class="color-options">
                    <label>Select Color:</label>
                    <select>
                        ${wand.colors.map(color => `<option>${color}</option>`).join('')}
                    </select>
                </div>
            ` : `<p>No color options</p>`}
            <button class="add-to-cart-btn">Add to Cart</button>
        `;

        grid.appendChild(card);

        const btn = card.querySelector('.add-to-cart-btn');
        btn.addEventListener('click', () => {
            let selectedColor = wand.colors ? card.querySelector('select').value : "Default";
            cart.push({ name: wand.name, color: selectedColor });
            updateCartCount();
            alert(`${wand.name} in ${selectedColor} added to cart!`);
        });
    });

    function updateCartCount() {
        cartCountElement.textContent = cart.length;
    }

    cartIcon.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
        } else {
            const cartDetails = cart.map(item => `${item.name} - ${item.color}`).join('\n');
            alert(`Items in Cart:\n${cartDetails}`);
        }
    });
});
