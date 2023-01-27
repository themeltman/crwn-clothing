import {ActionWithPayload, createAction, withMatcher} from "../../utils/reducer/reducer.utils";
import {CART_ACTION_TYPES, CartItem} from "./cart.types";
import {CategoryItem} from "../catagories/categories.types";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
    let existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id ?
                {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
    } else {
        return [ ...cartItems, {quantity: 1, ...productToAdd}]
    }
}

const decrementCartItem = (cartItems: CartItem[], deleteItem: CartItem): CartItem[] => {
    const deletedItem = cartItems.filter((cartItem) => !(cartItem.id === deleteItem.id && cartItem.quantity === 1))
    return deletedItem.map((cartItem) => (cartItem.id === deleteItem.id && cartItem.quantity > 1) ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem)
}

const deleteFromCartLocal = (cartItems: CartItem[], deleteItem: CartItem): CartItem[] => {
    return cartItems.filter((cartItem) => cartItem.id !== deleteItem.id  )
}

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>
export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>

export const setIsCartOpen = withMatcher((isOpen: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen))
export const setCartItem = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems))
export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem): SetCartItems =>
    setCartItem(addCartItem(cartItems, productToAdd))

export const decrementQuantity = (cartItems:CartItem[], item:CartItem): SetCartItems =>
    setCartItem(decrementCartItem(cartItems, item))


export const deleteFromCart = (cartItems:CartItem[], item:CartItem): SetCartItems =>
    setCartItem(deleteFromCartLocal(cartItems, item))


