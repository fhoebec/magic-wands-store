
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

const grid = document.getElementById('product-grid');
if (grid) {
    const wands = Array.from({ length: 30 }, (_, i) => {
        const hasColors = i % 2 === 0;
        return {
            name: `Magic Wand ${i + 1}`,
            image: `images/wand${i + 1}.jpg`,
            colors: hasColors ? ["Black", "Brown", "Silver", "Golden"] : null,
            price: Math.floor(Math.random() * 41) + 10
        };
    });

    wands.forEach(wand => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        card.innerHTML = \`
            <img src="\${wand.image}" alt="\${wand.name}">
            <h2>\${wand.name}</h2>
            \${wand.colors ? \`
                <div class="color-options">
                    <label>Select Color:</label>
                    <select>
                        \${wand.colors.map(color => \`<option>\${color}</option>\`).join('')}
                    </select>
                </div>
            \` : \`<p>No color options</p>\`}
            <button class="add-to-cart-btn">Add to Cart</button>
        \`;

        grid.appendChild(card);

        const btn = card.querySelector('.add-to-cart-btn');
        btn.addEventListener('click', () => {
            let selectedColor = "";
            if (wand.colors) {
                selectedColor = card.querySelector('select').value;
            }

            const existingItem = cart.find(item => item.name === wand.name && item.color === selectedColor);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: wand.name,
                    color: selectedColor,
                    quantity: 1,
                    price: wand.price
                });
            }

            saveCart();
            updateCartCount();
            alert(\`\${wand.name} \${selectedColor ? 'in ' + selectedColor : ''} added to cart!\`);
        });
    });
}

updateCartCount();
