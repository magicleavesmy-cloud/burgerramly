import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";

const categories = ["Burger", "Pizza", "Drinks", "Dessert"];
const productsStorageKey = "burger-ramly-products";
const adminSessionKey = "burger-ramly-admin";
const whatsappNumber = "601165302622";

const sectionLabels = {
  Burger: "Burgers",
  Pizza: "Pizza",
  Drinks: "Drinks",
  Dessert: "Dessert",
};

const categoryAddOns = {
  Burger: [
    { name: "Extra Egg", price: 1.5, free: false },
    { name: "Extra Cheese", price: 1, free: false },
    { name: "Black Pepper Sauce", price: 0, free: true },
    { name: "Spicy Sauce", price: 0, free: true },
    { name: "Extra Patty", price: 3, free: false },
  ],
  Pizza: [
    { name: "Extra Cheese", price: 2, free: false },
    { name: "Pepperoni", price: 3, free: false },
    { name: "Mushroom", price: 1.5, free: false },
    { name: "Garlic Sauce", price: 0, free: true },
    { name: "Chili Flakes", price: 0, free: true },
  ],
  Drinks: [
    { name: "Less Ice", price: 0, free: true },
    { name: "No Ice", price: 0, free: true },
    { name: "Extra Ice", price: 0, free: true },
    { name: "Less Sugar", price: 0, free: true },
    { name: "Lemon Slice", price: 1, free: false },
  ],
  Dessert: [
    { name: "Extra Chocolate", price: 2, free: false },
    { name: "Extra Cream", price: 1.5, free: false },
    { name: "Strawberry Sauce", price: 1, free: false },
    { name: "Oreo Crumbs", price: 1.5, free: false },
    { name: "Nuts", price: 1, free: false },
  ],
};

const defaultProducts = [
  {
    id: 1,
    name: "Ramly Chicken Burger",
    category: "Burger",
    price: 6.32,
    description:
      "Classic Ramly chicken burger with a tender grilled patty, soft bun and savory street-style sauce.",
    image: "https://images.deliveryhero.io/image/fd-my/LH/r708-listing.jpg",
    addons: categoryAddOns.Burger,
  },
  {
    id: 2,
    name: "Ramly Chicken Special",
    category: "Burger",
    price: 7.12,
    description:
      "Chicken burger wrapped with egg and finished with the familiar Ramly special sauce blend.",
    image:
      "https://asibburger.my/__static/ecab3ddd06274184f2eebd36012e32ef/dsc02265.jpg",
    addons: categoryAddOns.Burger,
  },
  {
    id: 3,
    name: "Ramly Chicken Cheeseburger",
    category: "Burger",
    price: 7.12,
    description:
      "A juicy Ramly chicken burger layered with melted cheese and warm burger sauce.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
    addons: categoryAddOns.Burger,
  },
  {
    id: 4,
    name: "Ramly Chicken Cheese Special",
    category: "Burger",
    price: 8.72,
    description:
      "Chicken special with egg wrap, melted cheese and a rich late-night stall finish.",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
    addons: categoryAddOns.Burger,
  },
  {
    id: 5,
    name: "Ramly Double Chicken Burger",
    category: "Burger",
    price: 9.52,
    description:
      "Double chicken patties stacked in a soft bun with sauce, onions and classic Ramly flavor.",
    image:
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=1200&auto=format&fit=crop",
    addons: categoryAddOns.Burger,
  },
  {
    id: 6,
    name: "Ramly Chicken Double Special",
    category: "Burger",
    price: 10.32,
    description:
      "Double chicken patties with special egg wrap and bold sauces for a fuller bite.",
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e2d5337e?q=80&w=1200&auto=format&fit=crop",
    addons: categoryAddOns.Burger,
  },
  {
    id: 7,
    name: "Ramly Chicken Double Cheese",
    category: "Burger",
    price: 11.12,
    description:
      "Double chicken burger with extra cheese richness and a compact premium street-food feel.",
    image:
      "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?q=80&w=1200&auto=format&fit=crop",
    addons: categoryAddOns.Burger,
  },
  {
    id: 8,
    name: "Ramly Chicken Double Cheese Special",
    category: "Burger",
    price: 11.92,
    description:
      "The full Ramly chicken build: double patty, cheese, egg wrap and saucy special finish.",
    image:
      "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?q=80&w=1200&auto=format&fit=crop",
    addons: categoryAddOns.Burger,
  },
  {
    id: 9,
    name: "Firehouse Pepperoni",
    category: "Pizza",
    price: 12,
    description:
      "Crispy crust, spiced pepperoni, tomato base and bubbling mozzarella with a little heat.",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
    addons: categoryAddOns.Pizza,
  },
  {
    id: 10,
    name: "Mozzarella Garden Pizza",
    category: "Pizza",
    price: 14,
    description:
      "A bright mozzarella pizza with roasted vegetables, fragrant herbs and golden baked edges.",
    image:
      "https://images.unsplash.com/photo-1604917877934-07d8d248d396?q=80&w=1200&auto=format&fit=crop",
    addons: categoryAddOns.Pizza,
  },
  {
    id: 11,
    name: "Iced Citrus Cola",
    category: "Drinks",
    price: 12,
    description:
      "Cold cola poured over citrus, ice and a glossy finish made to cut through rich burgers.",
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=1200&auto=format&fit=crop",
    addons: categoryAddOns.Drinks,
  },
  {
    id: 12,
    name: "Berry Cream Sundae",
    category: "Dessert",
    price: 18,
    description:
      "Velvety cream, berry sauce and a chilled spoonful of sweetness after the main event.",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1200&auto=format&fit=crop",
    addons: categoryAddOns.Dessert,
  },
  {
    id: 13,
    name: "Chocolate Lava Stack",
    category: "Dessert",
    price: 11,
    description:
      "Warm chocolate layers with a molten center, finished with a soft, glossy dessert-shop texture.",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop",
    addons: categoryAddOns.Dessert,
  },
];

const emptyProduct = {
  name: "",
  category: "Burger",
  price: "",
  image: "",
  description: "",
  addons: categoryAddOns.Burger,
};

const heroVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] },
  },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.03 } },
};

function formatPrice(value) {
  return `RM ${value.toFixed(2)}`;
}

function normalizeProduct(product) {
  return {
    ...product,
    price: Number(product.price) || 0,
    addons:
      product.addons?.map((addon) => ({
        name: addon.name,
        price: addon.free ? 0 : Number(addon.price) || 0,
        free: Boolean(addon.free),
      })) ?? categoryAddOns[product.category] ?? [],
  };
}

function loadProducts() {
  const storedProducts = localStorage.getItem(productsStorageKey);

  if (!storedProducts) {
    localStorage.setItem(productsStorageKey, JSON.stringify(defaultProducts));
    return defaultProducts;
  }

  try {
    const parsedProducts = JSON.parse(storedProducts);
    return Array.isArray(parsedProducts)
      ? parsedProducts.map(normalizeProduct)
      : defaultProducts;
  } catch {
    return defaultProducts;
  }
}

function buildWhatsAppOrderMessage(cart, subtotal) {
  const itemLines = cart
    .map((item) => {
      const addOnLines =
        item.addOns?.map((addOn) => `  + ${addOn.name}`).join("\n") ?? "";
      const itemTotal = item.price * item.quantity;

      return [
        `- ${item.name} x${item.quantity}`,
        addOnLines,
        `  ${formatPrice(itemTotal)}`,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");

  return [
    "Burger Ramly Order",
    "",
    "Items:",
    itemLines,
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
  ].join("\n");
}

function App() {
  const [products, setProducts] = useState(loadProducts);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const isAdminRoute = window.location.pathname === "/admin";

  const saveProducts = (nextProducts) => {
    const normalizedProducts = nextProducts.map(normalizeProduct);
    localStorage.setItem(productsStorageKey, JSON.stringify(normalizedProducts));
    setProducts(normalizedProducts);
  };

  if (isAdminRoute) {
    return <AdminPage products={products} saveProducts={saveProducts} />;
  }

  const menuSections = categories
    .map((category) => ({
      category,
      title: sectionLabels[category],
      items: products.filter((product) => product.category === category),
    }))
    .filter((section) => section.items.length > 0);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const availableAddOns = selectedProduct?.addons ?? [];
  const selectedAddOnItems = availableAddOns.filter((addOn) =>
    selectedAddOns.includes(addOn.name),
  );
  const modalTotal =
    (selectedProduct?.price ?? 0) +
    selectedAddOnItems.reduce((total, addOn) => total + addOn.price, 0);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setSelectedAddOns([]);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setSelectedAddOns([]);
  };

  const toggleAddOn = (addOnName) => {
    setSelectedAddOns((currentAddOns) =>
      currentAddOns.includes(addOnName)
        ? currentAddOns.filter((name) => name !== addOnName)
        : [...currentAddOns, addOnName],
    );
  };

  const addToCart = (product, customAddOns = []) => {
    const sortedAddOnNames = customAddOns.map((addOn) => addOn.name).sort();
    const cartKey = `${product.id}-${sortedAddOnNames.join("-") || "plain"}`;
    const finalPrice =
      product.price +
      customAddOns.reduce((total, addOn) => total + addOn.price, 0);

    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.cartKey === cartKey);

      if (existingItem) {
        return currentCart.map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          cartKey,
          addOns: customAddOns,
          basePrice: product.price,
          price: finalPrice,
          quantity: 1,
        },
      ];
    });
  };

  const addCustomizedItem = () => {
    if (!selectedProduct) {
      return;
    }

    addToCart(selectedProduct, selectedAddOnItems);
    closeProductModal();
    setIsCartOpen(true);
  };

  const updateQuantity = (cartKey, change) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (cartKey) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.cartKey !== cartKey),
    );
  };

  const checkoutViaWhatsApp = () => {
    if (cart.length === 0) {
      return;
    }

    const message = buildWhatsAppOrderMessage(cart, subtotal);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="app">
      <div className="app-shell">
        <header className="top-bar">
          <button className="icon-button" aria-label="Open menu">
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>

          <div className="brand-lockup">
            <span>Fast delivery</span>
            <strong>Burger Ramly</strong>
          </div>

          <button
            className="icon-button cart-icon-button"
            onClick={() => setIsCartOpen(true)}
            aria-label="Open cart"
          >
            <span className="cart-glyph">Cart</span>
            {cartCount > 0 && <strong>{cartCount}</strong>}
          </button>
        </header>

        <motion.section
          className="hero"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-content">
            <motion.p className="eyebrow" variants={itemVariants}>
              Open now | Made fresh
            </motion.p>

            <motion.h1 variants={itemVariants}>BURGER RAMLY</motion.h1>

            <motion.p className="subtitle" variants={itemVariants}>
              Premium burgers, made for you.
            </motion.p>

            <motion.div className="hero-actions" variants={itemVariants}>
              <a href="#burger-section">Order Now</a>
            </motion.div>
          </div>

        </motion.section>

        <section className="menu-section" aria-label="Menu">
          {menuSections.map((section) => (
            <section
              className="product-section"
              id={`${section.category.toLowerCase()}-section`}
              key={section.category}
            >
              <div className="section-heading">
                <h2>{section.title}</h2>
                <button>See All</button>
              </div>

              <motion.div
                className="product-row"
                variants={gridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {section.items.map((product) => (
                  <motion.article
                    className="product-card"
                    key={product.id}
                    variants={itemVariants}
                    whileHover={{ y: -8, scale: 1.015 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => openProductModal(product)}
                  >
                    <img src={product.image} alt={product.name} />

                    <div className="card-body">
                      <span>{product.category}</span>
                      <h3>{product.name}</h3>

                      <div className="card-footer">
                        <p>{formatPrice(product.price)}</p>
                        <button
                          aria-label={`Add ${product.name}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            openProductModal(product);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </section>
          ))}
        </section>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProductModal}
          >
            <motion.section
              className="product-modal"
              initial={{ opacity: 0, y: 34, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 26, scale: 0.97 }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              aria-label={`${selectedProduct.name} details`}
            >
              <div className="modal-image-wrap">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
                <button
                  className="modal-close"
                  onClick={closeProductModal}
                  aria-label="Close product details"
                >
                  X
                </button>
              </div>

              <div className="modal-content">
                <div className="modal-title-row">
                  <div>
                    <span>{selectedProduct.category}</span>
                    <h2>{selectedProduct.name}</h2>
                  </div>
                  <strong>{formatPrice(selectedProduct.price)}</strong>
                </div>

                <p className="modal-description">
                  {selectedProduct.description}
                </p>

                <section className="personalize-section">
                  <div className="personalize-heading">
                    <p>Personalize your order</p>
                    <span>Optional add-ons</span>
                  </div>

                  <div className="addons-list">
                    {availableAddOns.map((addOn) => {
                      const isSelected = selectedAddOns.includes(addOn.name);

                      return (
                        <button
                          className={`addon-option ${
                            isSelected ? "selected" : ""
                          }`}
                          key={addOn.name}
                          onClick={() => toggleAddOn(addOn.name)}
                        >
                          <span className="addon-check">
                            {isSelected ? "On" : ""}
                          </span>
                          <span>{addOn.name}</span>
                          <strong>
                            {addOn.free || addOn.price === 0
                              ? "Free"
                              : `+${formatPrice(addOn.price)}`}
                          </strong>
                        </button>
                      );
                    })}
                  </div>
                </section>

                <button className="modal-add-button" onClick={addCustomizedItem}>
                  Add to cart | {formatPrice(modalTotal)}
                </button>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.button
              className="cart-backdrop"
              aria-label="Close cart"
              onClick={() => setIsCartOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              className="cart-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 210, damping: 28, mass: 0.9 }}
              aria-label="Shopping cart"
            >
              <div className="cart-header">
                <div>
                  <p>Your Order</p>
                  <h2>{cartCount} items</h2>
                </div>
                <button onClick={() => setIsCartOpen(false)}>Close</button>
              </div>

              <div className="cart-items">
                {cart.length === 0 ? (
                  <p className="empty-cart">
                    Your cart is ready for something excellent.
                  </p>
                ) : (
                  cart.map((item) => (
                    <div className="cart-item" key={item.cartKey}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-content">
                        <h3>{item.name}</h3>
                        {item.addOns?.length > 0 && (
                          <span className="cart-addons">
                            {item.addOns.map((addOn) => addOn.name).join(", ")}
                          </span>
                        )}
                        <p>{formatPrice(item.price)}</p>
                        <div className="quantity-row">
                          <button onClick={() => updateQuantity(item.cartKey, -1)}>
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cartKey, 1)}>
                            +
                          </button>
                          <button
                            className="remove-button"
                            onClick={() => removeFromCart(item.cartKey)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="cart-summary">
                <div>
                  <span>Subtotal</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>
                <button
                  disabled={cart.length === 0}
                  onClick={checkoutViaWhatsApp}
                >
                  Checkout via WhatsApp
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <nav className="bottom-nav" aria-label="Mobile navigation">
        <a className="active" href="#">
          <span>Home</span>
        </a>
        <a href="#burger-section">
          <span>Menu</span>
        </a>
        <button onClick={() => setIsCartOpen(true)}>
          <span>Cart</span>
          {cartCount > 0 && <strong>{cartCount}</strong>}
        </button>
        <a href="#about">
          <span>About</span>
        </a>
      </nav>
    </main>
  );
}

function AdminPage({ products, saveProducts }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem(adminSessionKey) === "true",
  );
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formProduct, setFormProduct] = useState(emptyProduct);

  const startAddProduct = () => {
    setEditingId(null);
    setFormProduct(emptyProduct);
  };

  const startEditProduct = (product) => {
    setEditingId(product.id);
    setFormProduct({
      ...product,
      price: String(product.price),
      addons: product.addons?.length
        ? product.addons
        : categoryAddOns[product.category] ?? [],
    });
  };

  const updateFormField = (field, value) => {
    setFormProduct((currentProduct) => {
      if (field === "category") {
        return {
          ...currentProduct,
          category: value,
          addons: categoryAddOns[value] ?? [],
        };
      }

      return { ...currentProduct, [field]: value };
    });
  };

  const updateAddOn = (index, field, value) => {
    setFormProduct((currentProduct) => ({
      ...currentProduct,
      addons: currentProduct.addons.map((addon, addonIndex) =>
        addonIndex === index
          ? {
              ...addon,
              [field]:
                field === "price"
                  ? value
                  : field === "free"
                    ? value
                    : value,
              price: field === "free" && value ? 0 : addon.price,
            }
          : addon,
      ),
    }));
  };

  const addAddOn = () => {
    setFormProduct((currentProduct) => ({
      ...currentProduct,
      addons: [...currentProduct.addons, { name: "", price: 0, free: true }],
    }));
  };

  const deleteAddOn = (index) => {
    setFormProduct((currentProduct) => ({
      ...currentProduct,
      addons: currentProduct.addons.filter(
        (_addon, addonIndex) => addonIndex !== index,
      ),
    }));
  };

  const login = (event) => {
    event.preventDefault();

    if (passcode === "1234") {
      sessionStorage.setItem(adminSessionKey, "true");
      setIsLoggedIn(true);
      setLoginError("");
      return;
    }

    setLoginError("Wrong passcode");
  };

  const logout = () => {
    sessionStorage.removeItem(adminSessionKey);
    setIsLoggedIn(false);
    setPasscode("");
  };

  const saveProduct = (event) => {
    event.preventDefault();

    const productToSave = normalizeProduct({
      ...formProduct,
      id: editingId ?? Date.now(),
    });

    if (!productToSave.name.trim()) {
      return;
    }

    const nextProducts = editingId
      ? products.map((product) =>
          product.id === editingId ? productToSave : product,
        )
      : [...products, productToSave];

    saveProducts(nextProducts);
    startAddProduct();
  };

  const deleteProduct = (productId) => {
    saveProducts(products.filter((product) => product.id !== productId));

    if (editingId === productId) {
      startAddProduct();
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="admin-page">
        <section className="admin-login">
          <p>Burger Ramly Admin</p>
          <h1>Enter passcode</h1>
          <form onSubmit={login}>
            <input
              value={passcode}
              onChange={(event) => setPasscode(event.target.value)}
              placeholder="Passcode"
              type="password"
            />
            {loginError && <span>{loginError}</span>}
            <button>Login</button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <header className="admin-top">
        <div>
          <p>Burger Ramly Admin</p>
          <h1>Products</h1>
        </div>
        <div className="admin-actions">
          <a href="/">Store</a>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <section className="admin-layout">
        <form className="admin-form" onSubmit={saveProduct}>
          <div className="admin-form-heading">
            <h2>{editingId ? "Edit product" : "Add product"}</h2>
            {editingId && (
              <button type="button" onClick={startAddProduct}>
                Cancel edit
              </button>
            )}
          </div>

          <label>
            Name
            <input
              value={formProduct.name}
              onChange={(event) => updateFormField("name", event.target.value)}
              placeholder="Product name"
            />
          </label>

          <label>
            Category
            <select
              value={formProduct.category}
              onChange={(event) =>
                updateFormField("category", event.target.value)
              }
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>

          <label>
            Price
            <input
              value={formProduct.price}
              onChange={(event) => updateFormField("price", event.target.value)}
              placeholder="0.00"
              type="number"
              step="0.01"
            />
          </label>

          <label>
            Image URL
            <input
              value={formProduct.image}
              onChange={(event) => updateFormField("image", event.target.value)}
              placeholder="https://..."
            />
          </label>

          <label>
            Description
            <textarea
              value={formProduct.description}
              onChange={(event) =>
                updateFormField("description", event.target.value)
              }
              placeholder="Product description"
              rows="4"
            />
          </label>

          <div className="admin-addons">
            <div className="admin-form-heading">
              <h3>Add-ons</h3>
              <button type="button" onClick={addAddOn}>
                Add add-on
              </button>
            </div>

            {formProduct.addons.map((addon, index) => (
              <div className="admin-addon-row" key={`${addon.name}-${index}`}>
                <input
                  value={addon.name}
                  onChange={(event) =>
                    updateAddOn(index, "name", event.target.value)
                  }
                  placeholder="Add-on name"
                />
                <input
                  value={addon.price}
                  onChange={(event) =>
                    updateAddOn(index, "price", event.target.value)
                  }
                  disabled={addon.free}
                  type="number"
                  step="0.01"
                />
                <label className="free-toggle">
                  <input
                    checked={addon.free}
                    onChange={(event) =>
                      updateAddOn(index, "free", event.target.checked)
                    }
                    type="checkbox"
                  />
                  Free
                </label>
                <button type="button" onClick={() => deleteAddOn(index)}>
                  Delete
                </button>
              </div>
            ))}
          </div>

          <button className="admin-save-button">
            {editingId ? "Save product" : "Add product"}
          </button>
        </form>

        <section className="admin-products">
          {products.map((product) => (
            <article className="admin-product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div>
                <span>{product.category}</span>
                <h3>{product.name}</h3>
                <p>{formatPrice(product.price)}</p>
                <small>
                  {product.addons?.length ?? 0} add-ons
                </small>
              </div>
              <div className="admin-card-actions">
                <button onClick={() => startEditProduct(product)}>Edit</button>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}

export default App;
