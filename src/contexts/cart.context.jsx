import {createContext, useEffect, useReducer, useState} from "react";

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

export const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_COUNT: 'SET_CART_COUNT',
    SET_CART_TOTAL: 'SET_CART_TOTAL'
}

const cartReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload
            }
        case CART_ACTION_TYPES.SET_CART_COUNT:
            return {
                ...state,
                cartCount: payload
            }
        case CART_ACTION_TYPES.SET_CART_TOTAL:
            return {
                ...state,
                cartTotal: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cart reducer`)
    }

}
const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

export const CartProvider = ({children}) => {
   // const [isCartOpen, setIsCartOpen] = useState(false)
   //  const [cartItems, setCartItems] = useState([])
   //  const [cartCount, setCartCount] = useState(0)
   //  const [cartTotal, setCartTotal] = useState(0)

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
    const { isCartOpen, cartItems, cartCount, cartTotal } = state

    useEffect(() => {
        const newCardCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        dispatch({type: CART_ACTION_TYPES.SET_CART_COUNT, payload: newCardCount})
        // setCartCount(newCardCount)
    }, [cartItems])

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)
        dispatch({type: CART_ACTION_TYPES.SET_CART_TOTAL, payload: total})
        // setCartTotal(total)
    },[cartItems])

    const addItemToCart = (productToAdd) => {
        // setCartItems(addCartItem(cartItems, productToAdd))
        dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: addCartItem(cartItems, productToAdd)})
    }

    const decrementQuantity = (item) => {
      // setCartItems(decrementCartItem(cartItems, item))
        dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: decrementCartItem(cartItems, item)})
    }

    const deleteFromCart = (item) => {
       // setCartItems(deleteFromCartLocal(cartItems, item))
        dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: deleteFromCartLocal(cartItems, item)})
    }

    const incQuantity = (item) => {
       // setCartItems(incQuantityItem(cartItems, item))
        dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: incQuantityItem(cartItems, item)})
    }

    const setIsCartOpen = (isOpen) =>  {
        dispatch({type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: isOpen})

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
