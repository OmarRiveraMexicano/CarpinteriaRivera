import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

const CartContext = createContext(null);

function getInitialCart() {
    try {
        const savedCart = localStorage.getItem(
            "omar-carpinteria-cart"
        );

        return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
        console.error(
            "No se pudo cargar el carrito:",
            error
        );

        return [];
    }
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(getInitialCart);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        try {
            localStorage.setItem(
                "omar-carpinteria-cart",
                JSON.stringify(cartItems)
            );
        } catch (error) {
            console.error(
                "No se pudo guardar el carrito:",
                error
            );
        }
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        setCartItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                return currentItems.map((item) =>
                    item.id === product.id
                        ? {
                              ...item,
                              quantity:
                                  item.quantity + quantity,
                          }
                        : item
                );
            }

            return [
                ...currentItems,
                {
                    ...product,
                    quantity,
                },
            ];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((currentItems) =>
            currentItems.filter(
                (item) => item.id !== productId
            )
        );
    };

    const increaseQuantity = (productId) => {
        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.id === productId
                    ? {
                          ...item,
                          quantity: item.quantity + 1,
                      }
                    : item
            )
        );
    };

    const decreaseQuantity = (productId) => {
        setCartItems((currentItems) =>
            currentItems
                .map((item) =>
                    item.id === productId
                        ? {
                              ...item,
                              quantity: item.quantity - 1,
                          }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const openCart = () => {
        setIsCartOpen(true);
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    const toggleCart = () => {
        setIsCartOpen((current) => !current);
    };

    const cartItemsCount = useMemo(() => {
        return cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );
    }, [cartItems]);

    const cartTotal = useMemo(() => {
        return cartItems.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );
    }, [cartItems]);

    const value = useMemo(
        () => ({
            cartItems,
            cartItemsCount,
            cartTotal,
            isCartOpen,
            addToCart,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity,
            clearCart,
            openCart,
            closeCart,
            toggleCart,
        }),
        [
            cartItems,
            cartItemsCount,
            cartTotal,
            isCartOpen,
        ]
    );

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart debe utilizarse dentro de CartProvider"
        );
    }

    return context;
}