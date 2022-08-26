import {createContext, useEffect, useState} from "react";

const addCartItem = (cartItems, productToAdd) => {
    let existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
             cartItem.id === productToAdd.id ?
                {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
    } else {
        return [ ...cartItems, {quantity: 1, ...productToAdd}]
    }
}

const decrementCartItem = (cartItems, deleteItem) => {
    const deletedItem = cartItems.filter((cartItem) => !(cartItem.id === deleteItem.id && cartItem.quantity === 1))
    return deletedItem.map((cartItem) => (cartItem.id === deleteItem.id && cartItem.quantity > 1) ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem)
}

const deleteFromCartLocal = (cartItems, deleteItem) => {
    return cartItems.filter((cartItem) => cartItem.id !== deleteItem.id  )
}

const incQuantityItem = (cartItems, incItem) => {
    return cartItems.map((cartItem) => cartItem.id === incItem.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    incQuantity: () => {},
    decrementQuantity: () => {},
    deleteFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
})

export const CartProvider = ({children}) => {
   const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        const newCardCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCardCount)
    }, [cartItems])

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)
        setCartTotal(total)
    },[cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const decrementQuantity = (item) => {
      setCartItems(decrementCartItem(cartItems, item))
    }

    const deleteFromCart = (item) => {
       setCartItems(deleteFromCartLocal(cartItems, item))
    }

    const incQuantity = (item) => {
       setCartItems(incQuantityItem(cartItems, item))
    }
    const value = {
       isCartOpen,
       setIsCartOpen,
        addItemToCart,
        incQuantity,
        cartItems,
        cartCount,
        cartTotal,
        decrementQuantity,
        deleteFromCart
   }
   return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}
