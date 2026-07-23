// DATA KERANJANG

let cart = [];


// FORMAT RUPIAH

function formatRupiah(number) {

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);

}


// TAMBAH PRODUK

function addToCart(name, price) {

    const existingProduct = cart.find(
        item => item.name === name
    );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            quantity: 1

        });

    }


    updateCart();

    openCart();

}


// UPDATE KERANJANG

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    cartItems.innerHTML = "";


    let total = 0;

    let totalQuantity = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Keranjang masih kosong.
            </p>
        `;

    }


    cart.forEach((item, index) => {

        total +=
            item.price *
            item.quantity;

        totalQuantity +=
            item.quantity;


        cartItems.innerHTML += `

            <div class="cart-item">

                <div>

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        ${formatRupiah(item.price)}
                    </p>

                </div>


                <div class="quantity">

                    <button
                        onclick="decreaseQuantity(${index})">
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>


                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})">
                    🗑️
                </button>

            </div>

        `;

    });


    cartCount.textContent =
        totalQuantity;


    cartTotal.textContent =
        formatRupiah(total);

}


// TAMBAH JUMLAH

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}


// KURANGI JUMLAH

function decreaseQuantity(index) {

    if (
        cart[index].quantity > 1
    ) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    updateCart();

}


// HAPUS PRODUK

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// BUKA KERANJANG

function openCart() {

    document
        .getElementById("cart-sidebar")
        .classList
        .add("active");


    document
        .getElementById("cart-overlay")
        .classList
        .add("active");

}


// TUTUP KERANJANG

function closeCart() {

    document
        .getElementById("cart-sidebar")
        .classList
        .remove("active");


    document
        .getElementById("cart-overlay")
        .classList
        .remove("active");

}

// =========================
// CHECKOUT
// =========================


// BUKA CHECKOUT

function openCheckout() {

    // Cek apakah keranjang kosong

    if (cart.length === 0) {

        alert(
            "Keranjang kamu masih kosong!"
        );

        return;

    }


    // Hitung total

    let total = 0;


    cart.forEach(item => {

        total +=
            item.price *
            item.quantity;

    });


    // Tampilkan total

    document
        .getElementById(
            "checkout-total"
        )
        .textContent =
            formatRupiah(total);


    // Tutup keranjang

    closeCart();


    // Buka checkout

    document
        .getElementById(
            "checkout-overlay"
        )
        .classList
        .add("active");

}


// TUTUP CHECKOUT

function closeCheckout() {

    document
        .getElementById(
            "checkout-overlay"
        )
        .classList
        .remove("active");

}


// PROSES ORDER

document
    .getElementById(
        "checkout-form"
    )
    .addEventListener(
        "submit",
        function(event) {

            // Mencegah halaman reload

            event.preventDefault();


            // Ambil data pelanggan

            const name =
                document
                    .getElementById(
                        "customer-name"
                    )
                    .value;


            const phone =
                document
                    .getElementById(
                        "customer-phone"
                    )
                    .value;


            const address =
                document
                    .getElementById(
                        "customer-address"
                    )
                    .value;


            const note =
                document
                    .getElementById(
                        "customer-note"
                    )
                    .value;


            // NOMOR WHATSAPP TOKO

            const storeNumber =
                "6283102212053";


            // BUAT DAFTAR PRODUK

            let orderList = "";

            let total = 0;


            cart.forEach(
                (item, index) => {

                    const subtotal =
                        item.price *
                        item.quantity;


                    total += subtotal;


                    orderList +=

                        `${index + 1}. ${item.name}
Jumlah: ${item.quantity}
Harga: ${formatRupiah(subtotal)}

`;

                }
            );


            // BUAT PESAN WHATSAPP

          const message = `
Halo TOKOKITA 👋

Saya ingin melakukan pemesanan.

NAMA PEMBELI
${name}

NO. WHATSAPP
${phone}

ALAMAT PENGIRIMAN
${address}

CATATAN
${note || "-"}

DETAIL PESANAN
${orderList}

TOTAL PESANAN
${formatRupiah(total)}

Mohon konfirmasi pesanan saya.

Terima kasih 🙏
`;

            // ENCODE PESAN

            const encodedMessage =
                encodeURIComponent(
                    message
                );


            // BUAT LINK WHATSAPP

            const whatsappURL =

                `https://wa.me/${storeNumber}?text=${encodedMessage}`;


            // BUKA WHATSAPP

            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );
    // =========================
// PRODUCT DETAIL
// =========================


// BUKA DETAIL PRODUK

function openProductDetail() {

    document
        .getElementById("product-modal")
        .classList
        .add("active");

}


// TUTUP DETAIL PRODUK

function closeProductDetail() {

    document
        .getElementById("product-modal")
        .classList
        .remove("active");

}


// TAMBAH PRODUK DARI DETAIL

function addProductFromDetail() {

    addToCart(
        "Produk Premium 1",
        99000
    );

    closeProductDetail();

}

// =========================
// PILIHAN PRODUK
// =========================

const optionButtons =
    document.querySelectorAll(".option");


optionButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            function() {

                // Cari kelompok pilihan
                // yang sama

                const parent =
                    this.parentElement;


                // Hapus active
                // dari pilihan lain

                parent
                    .querySelectorAll(".option")
                    .forEach(
                        item => {

                            item.classList
                                .remove("active");

                        }
                    );


                // Aktifkan pilihan
                // yang diklik

                this.classList
                    .add("active");

            }
        );

    }
);