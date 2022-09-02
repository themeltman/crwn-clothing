import './cart-dropdown.styles'
import Button from "../button/button";
import CartItem from "../cart-item/cart-item";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {Link, useNavigate} from "react-router-dom";
import {CartDropdownContainer, CartItems, EmptyMessage} from "./cart-dropdown.styles";

const CartDropdown = () => {
    const  {cartItems} = useContext(CartContext)
    const navigate = useNavigate()

    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length > 0 ?
                    (cartItems.map((cartItem) => <CartItem key={cartItem.id}  cartItem={cartItem}/>)):
                        (<EmptyMessage>Your cart is empty</EmptyMessage>)
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown