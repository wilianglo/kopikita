document.addEventListener('Alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: 'Robusta Brazil', img: '1.img', price: 20000 },
            { id: 2, name: 'Arabica Blend', img: '2.img', price: 25000 },
            { id: 3, name: 'Primo Passo', img: '3.img', price: 30000 },
            { id: 4, name: 'Aceh Gayo', img: '4.img', price: 35000 },
            { id: 5, name: 'Sumatra Mandheling', img: '5.img', price: 40000 },
        ],
    }));
})