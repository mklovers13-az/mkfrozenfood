/* =========================================================
   MK FROZEN FOOD
   Main Frontend JavaScript
   ========================================================= */


/* BUSINESS WHATSAPP
   Pakistan number converted to international format.
   Current frontend uses wa.me as a temporary fallback.

   IMPORTANT:
   This is NOT WhatsApp Cloud API.
   Cloud API will be connected later through a secure backend.
*/
const BUSINESS_WHATSAPP = "9234838905694";


/* =========================================================
   PRODUCTS
   ========================================================= */

const products = [

  {
    id: "p1",
    name: "Chicken Samosa",
    category: "Samosas",
    price: 40,
    unit: "each",
    image: "chicken-samosa.jpg",
    description: "Crispy chicken-filled samosa."
  },

  {
    id: "p2",
    name: "Chicken Vegetable Roll",
    category: "Rolls",
    price: 50,
    unit: "each",
    image: "Chicken Vegetable Roll.jpg",
    description: "Chicken and vegetable filled crispy roll."
  },

  {
    id: "p3",
    name: "Chicken Sticks",
    category: "Chicken",
    price: 60,
    unit: "each",
    image: "Chicken Sticks.jpg",
    description: "Crispy chicken sticks, perfect for snacks."
  },

  {
    id: "p4",
    name: "Chicken Popcorn",
    category: "Snacks",
    price: 300,
    unit: "30 pieces",
    image: "Chicken Popcorn.jpg",
    description: "30 pieces of delicious chicken popcorn."
  },

  {
    id: "p5",
    name: "Chicken Zinger Strips",
    category: "Chicken",
    price: 350,
    unit: "10 pieces",
    image: "Chicken Zinger Strips.jpg",
    description: "10 crispy chicken zinger strips."
  },

  {
    id: "p6",
    name: "Dynamite Chicken",
    category: "Chicken",
    price: 200,
    unit: "10 pieces",
    image: "Dynamite Chicken.jpg",
    description: "10 pieces of spicy dynamite chicken."
  }

];


/* =========================================================
   DEALS
   ========================================================= */

const deals = [

  {
    id: "d1",
    name: "Deal",
    price: 960,
    pieces: "18 pieces",
    emoji: "🔥",
     image: "d1.jpg",

    description:
      "6 Chicken Tikka Samosas + 6 Pizza Samosas + 6 Chicken Sticks.",

    items: [
      {
        name: "Chicken Tikka Samosa",
        qty: 6
      },
      {
        name: "Pizza Samosa",
        qty: 6
      },
      {
        name: "Chicken Sticks",
        qty: 6
      }
    ]
  },

  {
    id: "d2",
    name: "Special Deal",
    price: 1080,
    pieces: "24 pieces",
    emoji: "💖",
    image: "d2.jpg",

    description:
      "12 Chicken Samosas + 12 Chicken Vegetable Rolls.",

    items: [
      {
        name: "Chicken Samosa",
        qty: 12
      },
      {
        name: "Chicken Vegetable Roll",
        qty: 12
      }
    ]
  },

  {
    id: "d3",
    name: "Special Deal",
    price: 2000,
    pieces: "44 pieces",
    emoji: "👑",
    image: "d3.jpg",

    description:
      "12 Chicken Samosas + 12 Chicken Rolls + 10 Chicken Sticks + 10 Chicken Tikka Samosas.",

    items: [
      {
        name: "Chicken Samosa",
        qty: 12
      },
      {
        name: "Chicken Vegetable Roll",
        qty: 12
      },
      {
        name: "Chicken Sticks",
        qty: 10
      },
      {
        name: "Chicken Tikka Samosa",
        qty: 10
      }
    ]
  },

  {
    id: "d4",
    name: "12 Pieces Deal",
    price: 600,
    pieces: "12 pieces",
    emoji: "🎉",
    image: "d4.jpg",

    description:
      "4 Chicken Samosas + 4 Chicken Rolls + 4 Chicken Sticks.",

    items: [
      {
        name: "Chicken Samosa",
        qty: 4
      },
      {
        name: "Chicken Roll",
        qty: 4
      },
      {
        name: "Chicken Sticks",
        qty: 4
      }
    ]
  }

];


/* =========================================================
   STATE
   ========================================================= */

let cart = [];

let selectedCategory = "All";

let selectedCoords = null;

let lastOrder = null;


/* =========================================================
   DOM
   ========================================================= */

const searchInput = document.querySelector("#search");
const mobileSearchInput = document.querySelector("#mobileSearch");

const productsGrid = document.querySelector("#productsGrid");
const dealsGrid = document.querySelector("#dealsGrid");

const emptySearch = document.querySelector("#emptySearch");

const cartBtn = document.querySelector("#cartBtn");
const cartDrawer = document.querySelector("#cartDrawer");
const closeCartBtn = document.querySelector("#closeCartBtn");

const overlay = document.querySelector("#overlay");

const cartItems = document.querySelector("#cartItems");
const cartEmpty = document.querySelector("#cartEmpty");
const cartFooter = document.querySelector("#cartFooter");

const cartCount = document.querySelector("#cartCount");
const cartSubtotal = document.querySelector("#cartSubtotal");
const cartTotal = document.querySelector("#cartTotal");

const checkoutBtn = document.querySelector("#checkoutBtn");

const checkoutModal = document.querySelector("#checkoutModal");
const closeCheckoutBtn = document.querySelector("#closeCheckoutBtn");

const checkoutItems = document.querySelector("#checkoutItems");
const checkoutTotal = document.querySelector("#checkoutTotal");

const customerName = document.querySelector("#customerName");
const customerPhone = document.querySelector("#customerPhone");
const deliveryAddress = document.querySelector("#deliveryAddress");

const gpsBtn = document.querySelector("#gpsBtn");
const gpsBtnText = document.querySelector("#gpsBtnText");
const gpsStatus = document.querySelector("#gpsStatus");

const placeOrderBtn = document.querySelector("#placeOrderBtn");

const successModal = document.querySelector("#successModal");
const successMessage = document.querySelector("#successMessage");
const orderNumber = document.querySelector("#orderNumber");

const whatsappBtn = document.querySelector("#whatsappBtn");
const continueBtn = document.querySelector("#continueBtn");

const toast = document.querySelector("#toast");

const sortSelect = document.querySelector("#sortSelect");


/* =========================================================
   HELPERS
   ========================================================= */

function money(amount) {
  return "Rs. " + Number(amount).toLocaleString("en-PK");
}


function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function showToast(message) {

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {

    toast.classList.remove("show");

  }, 2200);

}


function getCartQuantity() {

  return cart.reduce((total, item) => {
    return total + item.qty;
  }, 0);

}


function getCartTotal() {

  return cart.reduce((total, item) => {

    return total + (item.price * item.qty);

  }, 0);

}


/* =========================================================
   PRODUCTS
   ========================================================= */

function getFilteredProducts() {

  const desktopQuery = searchInput
    ? searchInput.value.trim().toLowerCase()
    : "";

  const mobileQuery = mobileSearchInput
    ? mobileSearchInput.value.trim().toLowerCase()
    : "";

  const query = mobileQuery || desktopQuery;


  let list = products.filter(product => {

    const categoryMatch =
      selectedCategory === "All" ||
      selectedCategory === "Deals" ||
      product.category === selectedCategory;


    const searchMatch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);


    return categoryMatch && searchMatch;

  });


  const sort = sortSelect ? sortSelect.value : "default";


  if (sort === "low") {

    list.sort((a, b) => a.price - b.price);

  }


  if (sort === "high") {

    list.sort((a, b) => b.price - a.price);

  }


  return list;

}


function renderProducts() {

  const list = getFilteredProducts();


  if (!list.length) {

    productsGrid.innerHTML = "";

    emptySearch.classList.remove("hidden");

    return;

  }


  emptySearch.classList.add("hidden");


  productsGrid.innerHTML = list.map(product => {

    return `

      <article class="product-card">

        <div class="product-image">

          <div class="product-emoji">
            ${product.emoji}
          </div>

        </div>


        <div class="product-content">

          <div class="product-category">
            ${escapeHTML(product.category)}
          </div>

          <h3>
            ${escapeHTML(product.name)}
          </h3>

          <p class="product-description">
            ${escapeHTML(product.description)}
          </p>


          <div class="product-bottom">

            <div>

              <div class="product-price">
                ${money(product.price)}
              </div>

              <span class="product-unit">
                ${escapeHTML(product.unit)}
              </span>

            </div>


            <button
              class="add-product-btn"
              data-add-product="${product.id}"
              aria-label="Add ${escapeHTML(product.name)}"
            >
              +
            </button>

          </div>

        </div>

      </article>

    `;

  }).join("");

}


/* =========================================================
   DEALS
   ========================================================= */

function renderDeals() {

  dealsGrid.innerHTML = deals.map((deal, index) => {

    const badge =
      index === 0
        ? "POPULAR"
        : index === 2
          ? "FAMILY FAVOURITE"
          : "SPECIAL";


    return `

      <article class="deal-card">

        <div class="deal-badge">
          ${badge}
        </div>

        <div class="deal-emoji">
          ${deal.emoji}
        </div>

        <h3>
          ${escapeHTML(deal.name)}
        </h3>

        <p class="deal-description">
          ${escapeHTML(deal.description)}
        </p>


        <div class="deal-bottom">

          <div>

            <div class="deal-price">
              ${money(deal.price)}
            </div>

            <div class="deal-pieces">
              ${escapeHTML(deal.pieces)}
            </div>

          </div>


          <button
            class="deal-add"
            data-add-deal="${deal.id}"
          >
            Add Deal +
          </button>

        </div>

      </article>

    `;

  }).join("");

}


/* =========================================================
   CART
   ========================================================= */

function addProduct(productId) {

  const product = products.find(
    item => item.id === productId
  );


  if (!product) return;


  const existing = cart.find(
    item => item.id === productId
  );


  if (existing) {

    existing.qty += 1;

  } else {

    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      unit: product.unit,
      qty: 1
    });

  }


  renderCart();

  showToast(`${product.name} added to cart 🛒`);

}


function addDeal(dealId) {

  const deal = deals.find(
    item => item.id === dealId
  );


  if (!deal) return;


  const existing = cart.find(
    item => item.id === dealId
  );


  if (existing) {

    existing.qty += 1;

  } else {

    cart.push({

      id: deal.id,

      name: deal.name,

      price: deal.price,

      emoji: deal.emoji,

      unit: deal.pieces,

      description: deal.description,

      qty: 1,

      isDeal: true

    });

  }


  renderCart();

  showToast(`${deal.name} added to cart 🔥`);

}


function changeQuantity(id, amount) {

  const item = cart.find(
    product => product.id === id
  );


  if (!item) return;


  item.qty += amount;


  if (item.qty <= 0) {

    cart = cart.filter(
      product => product.id !== id
    );

  }


  renderCart();

}


function removeFromCart(id) {

  cart = cart.filter(
    item => item.id !== id
  );

  renderCart();

}


function renderCart() {

  const quantity = getCartQuantity();

  const total = getCartTotal();


  cartCount.textContent = quantity;

  cartSubtotal.textContent = money(total);

  cartTotal.textContent = money(total);


  if (!cart.length) {

    cartItems.innerHTML = "";

    cartEmpty.classList.remove("hidden");

    cartFooter.classList.add("hidden");

    return;

  }


  cartEmpty.classList.add("hidden");

  cartFooter.classList.remove("hidden");


  cartItems.innerHTML = cart.map(item => {

    return `

      <div class="cart-row">

        <div class="cart-row-image">
          ${item.emoji}
        </div>


        <div>

          <div class="cart-row-name">
            ${escapeHTML(item.name)}
          </div>

          <div class="cart-row-price">
            ${money(item.price)} • ${escapeHTML(item.unit || "")}
          </div>


          <div class="quantity-controls">

            <button
              data-minus="${item.id}"
              aria-label="Decrease quantity"
            >
              −
            </button>

            <span class="quantity-number">
              ${item.qty}
            </span>

            <button
              data-plus="${item.id}"
              aria-label="Increase quantity"
            >
              +
            </button>

            <button
              data-remove="${item.id}"
              title="Remove"
              style="margin-left:4px;color:#e52e79;"
            >
              ×
            </button>

          </div>

        </div>


        <div class="cart-row-total">
          ${money(item.price * item.qty)}
        </div>

      </div>

    `;

  }).join("");

}


/* =========================================================
   CART DRAWER
   ========================================================= */

function openCart() {

  cartDrawer.classList.add("open");

  overlay.classList.remove("hidden");

  document.body.style.overflow = "hidden";

}


function closeCart() {

  cartDrawer.classList.remove("open");

  overlay.classList.add("hidden");

  document.body.style.overflow = "";

}


function toggleCart() {

  if (cartDrawer.classList.contains("open")) {

    closeCart();

  } else {

    openCart();

  }

}


/* =========================================================
   CHECKOUT
   ========================================================= */

function openCheckout() {

  if (!cart.length) {

    showToast("Your cart is empty.");

    return;

  }


  closeCart();

  renderCheckout();


  checkoutModal.classList.remove("hidden");

  document.body.style.overflow = "hidden";

}


function closeCheckout() {

  checkoutModal.classList.add("hidden");

  document.body.style.overflow = "";

}


function renderCheckout() {

  checkoutItems.innerHTML = cart.map(item => {

    return `

      <div class="checkout-item">

        <div>

          <strong>
            ${escapeHTML(item.name)}
          </strong>

          <small>
            ${item.qty} × ${money(item.price)}
          </small>

        </div>

        <strong>
          ${money(item.price * item.qty)}
        </strong>

      </div>

    `;

  }).join("");


  checkoutTotal.textContent =
    money(getCartTotal());

}


/* =========================================================
   GPS
   ========================================================= */

function getCurrentLocation() {

  if (!navigator.geolocation) {

    gpsStatus.textContent =
      "GPS is not supported by this browser.";

    return;

  }


  gpsBtn.disabled = true;

  gpsBtnText.textContent =
    "Getting your location...";

  gpsStatus.textContent =
    "Please allow location permission if your browser asks.";


  navigator.geolocation.getCurrentPosition(

    position => {

      selectedCoords = {

        lat: position.coords.latitude,

        lng: position.coords.longitude

      };


      gpsBtn.disabled = false;

      gpsBtnText.textContent =
        "Location Selected ✓";


      gpsStatus.textContent =
        `GPS selected: ${selectedCoords.lat.toFixed(6)}, ${selectedCoords.lng.toFixed(6)}`;


      showToast("Location selected successfully 📍");

    },


    error => {

      gpsBtn.disabled = false;

      gpsBtnText.textContent =
        "Use My Current Location";


      if (error.code === 1) {

        gpsStatus.textContent =
          "Location permission was denied. Please enter your address manually.";

      } else {

        gpsStatus.textContent =
          "Could not get your location. Please enter your address manually.";

      }

    },


    {
      enableHighAccuracy: true,

      timeout: 10000,

      maximumAge: 0

    }

  );

}


/* =========================================================
   PLACE ORDER
   ========================================================= */

function placeOrder() {

  const name =
    customerName.value.trim();

  const phone =
    customerPhone.value.trim();

  const address =
    deliveryAddress.value.trim();


  const payment =
    document.querySelector(
      'input[name="payment"]:checked'
    )?.value || "Cash on Delivery";


  if (!name) {

    showToast("Please enter your name.");

    customerName.focus();

    return;

  }


  if (!phone) {

    showToast("Please enter your phone number.");

    customerPhone.focus();

    return;

  }


  if (!address) {

    showToast("Please enter your delivery address.");

    deliveryAddress.focus();

    return;

  }


  if (!cart.length) {

    showToast("Your cart is empty.");

    return;

  }


  const orderId =
    "MK" +
    Date.now()
      .toString()
      .slice(-7);


  lastOrder = {

    id: orderId,

    name,

    phone,

    address,

    payment,

    total: getCartTotal(),

    coords: selectedCoords
      ? { ...selectedCoords }
      : null,

    items: cart.map(item => ({

      name: item.name,

      qty: item.qty,

      price: item.price,

      unit: item.unit,

      isDeal: item.isDeal || false

    }))

  };


  successMessage.textContent =
    `Thank you ${name}! Your order for ${money(lastOrder.total)} has been created.`;


  orderNumber.textContent =
    `Order #${orderId}`;


  closeCheckout();


  successModal.classList.remove("hidden");

  document.body.style.overflow = "hidden";

}


/* =========================================================
   WHATSAPP
   ========================================================= */

function sendWhatsAppOrder() {

  if (!lastOrder) {

    showToast("No order found.");

    return;

  }


  const lines = [];


  lines.push("🐼 *NEW MK FROZEN FOOD ORDER*");

  lines.push("");

  lines.push(`Order: ${lastOrder.id}`);

  lines.push(`Customer: ${lastOrder.name}`);

  lines.push(`Phone: ${lastOrder.phone}`);

  lines.push(`Payment: ${lastOrder.payment}`);

  lines.push("");

  lines.push("*ITEMS:*");


  lastOrder.items.forEach(item => {

    lines.push(
      `• ${item.name} × ${item.qty} = ${money(item.price * item.qty)}`
    );

  });


  lines.push("");

  lines.push(`*TOTAL: ${money(lastOrder.total)}*`);

  lines.push("");

  lines.push(`Address: ${lastOrder.address}`);


  if (lastOrder.coords) {

    lines.push("");

    lines.push(
      `GPS: https://www.google.com/maps?q=${lastOrder.coords.lat},${lastOrder.coords.lng}`
    );

  }


  const message =
    encodeURIComponent(lines.join("\n"));


  const url =
    `https://wa.me/${BUSINESS_WHATSAPP}?text=${message}`;


  window.open(url, "_blank");

}


/* =========================================================
   SUCCESS / RESET
   ========================================================= */

function closeSuccess() {

  successModal.classList.add("hidden");

  document.body.style.overflow = "";

}


function continueShopping() {

  closeSuccess();

  cart = [];

  selectedCoords = null;

  renderCart();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================================
   CATEGORY FILTER
   ========================================================= */

function setCategory(category) {

  selectedCategory = category;


  document.querySelectorAll(
    ".category-chip"
  ).forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.category === category
    );

  });


  renderProducts();


  document.querySelector(
    "#productsSection"
  ).scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/* =========================================================
   SEARCH
   ========================================================= */

function syncSearch(source, target) {

  target.value = source.value;

  renderProducts();

}


/* =========================================================
   EVENT LISTENERS
   ========================================================= */


/* Product buttons */

productsGrid.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-add-product]"
      );


    if (!button) return;


    addProduct(
      button.dataset.addProduct
    );

  }
);


/* Deal buttons */

dealsGrid.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-add-deal]"
      );


    if (!button) return;


    addDeal(
      button.dataset.addDeal
    );

  }
);


/* Cart buttons */

cartItems.addEventListener(
  "click",
  event => {

    const minus =
      event.target.closest("[data-minus]");

    const plus =
      event.target.closest("[data-plus]");

    const remove =
      event.target.closest("[data-remove]");


    if (minus) {

      changeQuantity(
        minus.dataset.minus,
        -1
      );

    }


    if (plus) {

      changeQuantity(
        plus.dataset.plus,
        1
      );

    }


    if (remove) {

      removeFromCart(
        remove.dataset.remove
      );

    }

  }
);


/* Search */

if (searchInput) {

  searchInput.addEventListener(
    "input",
    () => syncSearch(
      searchInput,
      mobileSearchInput
    )
  );

}


if (mobileSearchInput) {

  mobileSearchInput.addEventListener(
    "input",
    () => syncSearch(
      mobileSearchInput,
      searchInput
    )
  );

}


/* Categories */

document.querySelectorAll(
  ".category-chip"
).forEach(button => {

  button.addEventListener(
    "click",
    () => {

      setCategory(
        button.dataset.category
      );

    }
  );

});


/* Sort */

if (sortSelect) {

  sortSelect.addEventListener(
    "change",
    renderProducts
  );

}


/* Cart */

cartBtn.addEventListener(
  "click",
  toggleCart
);


closeCartBtn.addEventListener(
  "click",
  closeCart
);


overlay.addEventListener(
  "click",
  closeCart
);


/* Checkout */

checkoutBtn.addEventListener(
  "click",
  openCheckout
);


closeCheckoutBtn.addEventListener(
  "click",
  closeCheckout
);


/* GPS */

gpsBtn.addEventListener(
  "click",
  getCurrentLocation
);


/* Place order */

placeOrderBtn.addEventListener(
  "click",
  placeOrder
);


/* WhatsApp */

whatsappBtn.addEventListener(
  "click",
  sendWhatsAppOrder
);


/* Continue shopping */

continueBtn.addEventListener(
  "click",
  continueShopping
);


document.querySelector(
  "#startShoppingBtn"
).addEventListener(
  "click",
  () => {

    closeCart();

    document.querySelector(
      "#productsSection"
    ).scrollIntoView({
      behavior: "smooth"
    });

  }
);


/* Hero order button */

document.querySelector(
  "#orderNowBtn"
).addEventListener(
  "click",
  () => {

    document.querySelector(
      "#productsSection"
    ).scrollIntoView({
      behavior: "smooth"
    });

  }
);


/* Hero deals */

document.querySelector(
  "#heroDealsBtn"
).addEventListener(
  "click",
  () => {

    document.querySelector(
      "#dealsSection"
    ).scrollIntoView({
      behavior: "smooth"
    });

  }
);


/* View deals */

document.querySelector(
  "#viewAllDealsBtn"
).addEventListener(
  "click",
  () => {

    document.querySelector(
      "#dealsSection"
    ).scrollIntoView({
      behavior: "smooth"
    });

  }
);


/* Header location */

document.querySelector(
  "#headerLocationBtn"
).addEventListener(
  "click",
  () => {

    document.querySelector(
      "#checkoutBtn"
    );

    if (!cart.length) {

      showToast(
        "Location can be selected during checkout."
      );

    } else {

      openCheckout();

      setTimeout(
        getCurrentLocation,
        300
      );

    }

  }
);


/* Payment option visual state */

document.querySelectorAll(
  ".payment-option"
).forEach(option => {

  option.addEventListener(
    "click",
    () => {

      if (
        option.classList.contains(
          "disabled-option"
        )
      ) {
        return;
      }


      document.querySelectorAll(
        ".payment-option"
      ).forEach(item => {

        item.classList.remove(
          "selected"
        );

      });


      option.classList.add(
        "selected"
      );


      const radio =
        option.querySelector(
          "input[type=radio]"
        );


      if (radio) {

        radio.checked = true;

      }

    }
  );

});


/* Mobile menu button */

document.querySelector(
  "#mobileMenuBtn"
).addEventListener(
  "click",
  () => {

    document.querySelector(
      ".mobile-search"
    ).scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    const mobileInput =
      document.querySelector(
        "#mobileSearch"
      );

    setTimeout(
      () => mobileInput.focus(),
      300
    );

  }
);


/* Escape key */

document.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Escape") {
      return;
    }


    closeCart();

    closeCheckout();

    closeSuccess();

  }
);


/* =========================================================
   INITIAL RENDER
   ========================================================= */

renderDeals();

renderProducts();

renderCart();
