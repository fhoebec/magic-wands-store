
const wands = Array.from({ length: 30 }, (_, i) => {
    const hasColors = i % 2 === 0;
    return {
        name: `Magic Wand ${i + 1}`,
        image: `images/wand${i + 1}.jpg`,
        colors: hasColors ? ["Black", "Brown", "Silver", "Golden"] : null
    };
});

const grid = document.getElementById('product-grid');
const cartCount = document.getElementById('cart-count');
let cartItems = 0;

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
        let selectedColor = "";
        if (wand.colors) {
            selectedColor = card.querySelector('select').value;
            alert(`${wand.name} in ${selectedColor} added to cart!`);
        } else {
            alert(`${wand.name} added to cart!`);
        }

        cartItems++;
        cartCount.textContent = cartItems;
    });
});
