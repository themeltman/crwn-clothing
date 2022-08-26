import './checkout-item.styles.scss'
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";

const CheckoutItem = ({cartItem}) => {
    const { name, price, imageUrl, quantity } = cartItem
    const {decrementQuantity, deleteFromCart, addItemToCart} = useContext(CartContext)

    const decrementQuantityFromCart = () => decrementQuantity(cartItem)
    const incQuantityFromCart = () => addItemToCart(cartItem)
    const deleteItemFromCart = () => deleteFromCart(cartItem)

    return (
        <div  className={'checkout-item-container'}>
            <div className={'image-container'}>
                <img src={imageUrl} alt={name}/>
            </div>
            <span className={'name'}>{name}</span>
            <span className={'quantity'}>
                <div className={'arrow'} onClick={decrementQuantityFromCart}>&#10094;</div>
                <span className={'value'}>{quantity}</span>
                <div className={'arrow'} onClick={incQuantityFromCart}>&#10095;</div>
            </span>
            <span className={'price'}>${price}</span>
            <div className={'remove-button'} onClick={deleteItemFromCart}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem