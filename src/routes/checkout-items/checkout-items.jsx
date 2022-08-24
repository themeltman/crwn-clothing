import './checkout-items.styles.scss'
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item";

const CheckoutItems = () => {
    const {cartItems} = useContext(CartContext)
    return (
        <div>
            <div className={'header'}>
                <h3>Product</h3>
                <h3>Description</h3>
                <h3>Quantity</h3>
                <h3>Price</h3>
                <h3>Remove</h3>

                {cartItems.map((cartItem) => <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)}
            </div>
        </div>
    )
}
export default CheckoutItems