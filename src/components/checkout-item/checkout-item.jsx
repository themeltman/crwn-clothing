import './checkout-item.styles.scss'
import Button from "../button/button";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";

const CheckoutItem = ({cartItem}) => {
    const { name, price, imageUrl, quantity } = cartItem
    const {decrementQuantity, deleteFromCart, incQuantity} = useContext(CartContext)
    const decrementQuantity1 = () => {
        decrementQuantity(cartItem)
    }
    const incQuantity1 = () => {
        incQuantity(cartItem)
    }
    return (
        <div>
            <img src={imageUrl} alt={name}/>
            <h2 className={'name'}>{name}</h2>
            <Button type={'button'} onClick={decrementQuantity1}>&lt;</Button>
            <h2 className={'quantity'}>{quantity}</h2>
            <Button type={'button'} onClick={incQuantity1}>&gt;</Button>
            <h2 className={'price'}>${price * quantity}</h2>
            <Button type={'button'} onClick={deleteFromCart}>X</Button>
        </div>
    )
}

export default CheckoutItem