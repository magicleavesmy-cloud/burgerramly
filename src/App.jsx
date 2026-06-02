import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";

const categories = ["Burger", "Pizza", "Drinks", "Dessert"];

const addOnsByCategory = {
  Burger: [
    { id: "extra-egg", name: "Extra Egg", price: 1.5 },
    { id: "extra-cheese", name: "Extra Cheese", price: 1 },
    { id: "black-pepper-sauce", name: "Black Pepper Sauce", price: 0 },
    { id: "spicy-sauce", name: "Spicy Sauce", price: 0 },
    { id: "extra-patty", name: "Extra Patty", price: 3 },
  ],
  Pizza: [
    { id: "extra-cheese", name: "Extra Cheese", price: 2 },
    { id: "pepperoni", name: "Pepperoni", price: 3 },
    { id: "mushroom", name: "Mushroom", price: 1.5 },
    { id: "garlic-sauce", name: "Garlic Sauce", price: 0 },
    { id: "chili-flakes", name: "Chili Flakes", price: 0 },
  ],
  Drinks: [
    { id: "less-ice", name: "Less Ice", price: 0 },
    { id: "no-ice", name: "No Ice", price: 0 },
    { id: "extra-ice", name: "Extra Ice", price: 0 },
    { id: "less-sugar", name: "Less Sugar", price: 0 },
    { id: "lemon-slice", name: "Lemon Slice", price: 1 },
  ],
  Dessert: [
    { id: "extra-chocolate", name: "Extra Chocolate", price: 2 },
    { id: "extra-cream", name: "Extra Cream", price: 1.5 },
    { id: "strawberry-sauce", name: "Strawberry Sauce", price: 1 },
    { id: "oreo-crumbs", name: "Oreo Crumbs", price: 1.5 },
    { id: "nuts", name: "Nuts", price: 1 },
  ],
};

const foods = [
  {
    id: 1,
    name: "Truffle Burger Ramly",
    category: "Burger",
    price: 28,
    description:
      "A premium Ramly-style burger with a juicy grilled patty, soft bun, melted cheese and a deep truffle glaze.",
    image:
      "https://images.deliveryhero.io/image/fd-my/LH/r708-listing.jpg",
  },
  {
    id: 2,
    name: "Lamb Oblong",
    category: "Burger",
    price: 8,
    description:
      "Two smoky patties layered with cheese, pickles and house sauce for a rich street-food finish.",
    image:
      "https://asibburger.my/__static/ecab3ddd06274184f2eebd36012e32ef/dsc02265.jpg",
  },
  {
    id: 3,
    name: "Firehouse Pepperoni",
    category: "Pizza",
    price: 36,
    description:
      "Crispy crust, spiced pepperoni, tomato base and bubbling mozzarella with a little heat.",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Mozzarella Garden Pizza",
    category: "Pizza",
    price: 34,
    description:
      "A bright mozzarella pizza with roasted vegetables, fragrant herbs and golden baked edges.",
    image:
      "https://images.unsplash.com/photo-1604917877934-07d8d248d396?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Iced Citrus Cola",
    category: "Drinks",
    price: 12,
    description:
      "Cold cola poured over citrus, ice and a glossy finish made to cut through rich burgers.",
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Berry Cream Sundae",
    category: "Dessert",
    price: 18,
    description:
      "Velvety cream, berry sauce and a chilled spoonful of sweetness after the main event.",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Chocolate Lava Stack",
    category: "Dessert",
    price: 22,
    description:
      "Warm chocolate layers with a molten center, finished with a soft, glossy dessert-shop texture.",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop",
  },
];

const heroVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.04 } },
};

function formatPrice(value) {
  return `RM ${value.toFixed(2)}`;
}

function App() {
  const [activeCategory, setActiveCategory] = useState("Burger");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const filteredFoods = useMemo(
    () => foods.filter((food) => food.category === activeCategory),
    [activeCategory],
  );

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const availableAddOns = selectedProduct
    ? addOnsByCategory[selectedProduct.category] ?? []
    : [];
  const selectedAddOnItems = availableAddOns.filter((addOn) =>
    selectedAddOns.includes(addOn.id),
  );
  const modalTotal =
    (selectedProduct?.price ?? 0) +
    selectedAddOnItems.reduce((total, addOn) => total + addOn.price, 0);

  const openProductModal = (food) => {
    setSelectedProduct(food);
    setSelectedAddOns([]);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setSelectedAddOns([]);
  };

  const toggleAddOn = (addOnId) => {
    setSelectedAddOns((currentAddOns) =>
      currentAddOns.includes(addOnId)
        ? currentAddOns.filter((id) => id !== addOnId)
        : [...currentAddOns, addOnId],
    );
  };

  const addToCart = (food, customAddOns = []) => {
    const sortedAddOnIds = customAddOns.map((addOn) => addOn.id).sort();
    const cartKey = `${food.id}-${sortedAddOnIds.join("-") || "plain"}`;
    const finalPrice =
      food.price + customAddOns.reduce((total, addOn) => total + addOn.price, 0);

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
          ...food,
          cartKey,
          addOns: customAddOns,
          basePrice: food.price,
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

  return (
    <main className="app">
      <button className="cart-button" onClick={() => setIsCartOpen(true)}>
        <span>Cart</span>
        <strong>{cartCount}</strong>
      </button>

      <motion.section
        className="hero"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-content">
          <motion.p className="eyebrow" variants={itemVariants}>
            Open now | 20 minute delivery
          </motion.p>

          <motion.h1 variants={itemVariants}>Burger Ramly</motion.h1>

          <motion.p className="subtitle" variants={itemVariants}>
            Charred patties, molten cheese, crisp fries and cold signatures
            plated with a late-night luxury finish.
          </motion.p>

          <motion.div className="hero-actions" variants={itemVariants}>
            <button onClick={() => setActiveCategory("Burger")}>
              Order Now
            </button>
            <span className="rating">
              <span className="rating-mark">4.9</span>
              2.4k premium reviews
            </span>
          </motion.div>
        </div>
      </motion.section>

      <section className="menu-section" aria-label="Menu">
        <div className="section-heading">
          <p>Curated Menu</p>
          <h2>Fresh from the kitchen</h2>
        </div>

        <div className="categories" aria-label="Food categories">
          {categories.map((category) => (
            <button
              className={`pill ${activeCategory === category ? "active" : ""}`}
              key={category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.section
            className="product-grid"
            key={activeCategory}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 12 }}
          >
            {filteredFoods.map((food) => (
              <motion.article
                className="product-card"
                key={food.id}
                variants={itemVariants}
                whileHover={{ y: -12, scale: 1.015 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openProductModal(food)}
              >
                <img src={food.image} alt={food.name} />

                <div className="card-body">
                  <span>{food.category}</span>
                  <h3>{food.name}</h3>

                  <div className="card-footer">
                    <p>{formatPrice(food.price)}</p>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        openProductModal(food);
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.section>
        </AnimatePresence>
      </section>

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
                      const isSelected = selectedAddOns.includes(addOn.id);

                      return (
                        <button
                          className={`addon-option ${
                            isSelected ? "selected" : ""
                          }`}
                          key={addOn.id}
                          onClick={() => toggleAddOn(addOn.id)}
                        >
                          <span className="addon-check">
                            {isSelected ? "On" : ""}
                          </span>
                          <span>{addOn.name}</span>
                          <strong>
                            {addOn.price === 0
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
                <button disabled={cart.length === 0}>Checkout</button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
