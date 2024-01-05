document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: 'Robusta Brazil', img: '1.jpg', price: 20000 },
            { id: 2, name: 'Arabica Blend', img: '2.jpg', price: 25000 },
            { id: 3, name: 'Primo Passo', img: '3.jpg', price: 30000 },
            { id: 4, name: 'Aceh Gayo', img: '4.jpg', price: 35000 },
            { id: 5, name: 'Sumatra Mandheling', img: '5.jpg', price: 40000 },
        ],
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            //CEK APAKAH ADA BARANG YANG SAMA DI CART
            const cartItem = this.items.find((item) => item.id === newItem.id);
            //Jika belum ada / cart masih kosong
            if (!cartItem) {
                this.items.push({...newItem, quantity: 1, total: newItem.price });
                this.quantity++;
                this.total += newItem.price;
            } else {
            //Jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
                this.items =  this.items.map( (item) => {
                    //Jika barang berbeda
                    if (item.id !== newItem.id) {
                        return item;
                    } else {
                        //jika barang sudah ada, tambah quantity dan totalnya
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                    // console.log(this.total);
                });
            }
   
        },
        remove(id) {
        //item yang akan dihapus berdasarkan id
        const cartItem = this.items.find((item) => item.id === id);

        //jika item lebih dari satu
        if (cartItem.quantity > 1) {
            //telusuri 1 1
            this.items = this.items.map((item) => {
                //jika bukan barang yg diklik
                if(item.id !== id) {
                    return item;
                } else {
                    item.quantity--;
                    item.total = item.price * item.quantity;
                    this.quantity--;
                    this.total -= item.price;
                    return item;
                }
            });
        } else if (cartItem.quantity === 1) {
            //jika barang sisa 1
            this.items = this.items.filter((item) => item.id !== id);
            this.quantity--;
            this.total -= cartItem.price;
        }
        }
    });
});
//Form Validation
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');

form.addEventListener('keyup', function() {
    for(let i=0; i < form.elements.length; i++) {
        if(form.elements[i].value.length !== 0) {
            checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
        } else {
            return false;
        }
    }
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
});
//kirim date ketika tombol checkout di klik
checkoutButton.addEventListener('click', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    const message = formatMessage(objData);
    window.open('http://wa.me/6281806213146?text=' + encodeURIComponent(message));
});
//format pesan whatsapp
const formatMessage = (obj) => {
    return `Data Customer 
            Nama: ${obj.name}
            Email: ${obj.email}
            Phone: ${obj.phone}
    Data Pesanan
    ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`)}
    TOTAL: ${rupiah(obj.total)}
    Terima kasih.`;
}

//Konversi ke rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};