import './checkout-item.styles.scss'
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";

const CheckoutItem = ({cartItem}) => {
    const { name, price, imageUrl, quantity } = cartItem
    const {decrementQuantity, deleteFromCart, incQuantity} = useContext(CartContext)
    const decrementQuantityFromCart = () => {
        decrementQuantity(cartItem)
    }
    const incQuantityFromCart = () => {
        incQuantity(cartItem)
    }
    const deleteItemFromCart = () => {
        deleteFromCart(cartItem)
    }
    return (
        <div>
            <div  className={'cart-item'}>
                <div className={'image-container'}>
                    <img src={imageUrl} alt={name}/>
                </div>
                <h2 className={'name'}>{name}</h2>
                <div className={'dec-inc quantity'}>
                    <button className={'checkout-button'} type={'button'} onClick={decrementQuantityFromCart}>&lt;</button>
                    <h2>{quantity}</h2>
                    <button className={'checkout-button'} type={'button'} onClick={incQuantityFromCart}>&gt;</button>
                </div>
                <h2 className={'price'}>${price * quantity}</h2>
                <button className={'checkout-button'} type={'button'} onClick={deleteItemFromCart}>X</button>
            </div>
            <hr/>
        </div>
    )
}

export default CheckoutItem