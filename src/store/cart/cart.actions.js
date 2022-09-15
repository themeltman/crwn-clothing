import {createAction} from "../../utils/reducer/reducer.utils";
import {CART_ACTION_TYPES} from "./cart.types";




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

export const setIsCartOpen = (isOpen) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen)

export const addItemToCart = (cartItems, productToAdd) =>
     createAction(CART_ACTION_TYPES.SET_CART_ITEMS, addCartItem(cartItems, productToAdd)
)

export const decrementQuantity = (cartItems, item) => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, decrementCartItem(cartItems, item))
}

export const deleteFromCart = (cartItems, item) => {
   return  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, deleteFromCartLocal(cartItems, item))
}

