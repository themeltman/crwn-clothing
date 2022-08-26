import './checkout-items.styles.scss'
import {useContext, useEffect} from "react";
import {CartContext} from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item";

const CheckoutItems = () => {
    const {cartItems, setTotal, total} = useContext(CartContext)
    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)
        setTotal(total)
    },[cartItems])
    return (
        <div>
            <div className={'header'}>
                <div className={'checkout-header'}>
                    <h3 className={'name'}>Product</h3>
                    <h3 className={'name'}>Description</h3>
                    <h3 className={'quantity'}>Quantity</h3>
                    <h3 className={'price'}>Price</h3>
                    <h3>Remove</h3>
                </div>
                <hr/>
                {cartItems.map((cartItem) => <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)}
            </div>
            <div className={'checkout-total'}>
                <h1>TOTAL: ${total}</h1>
            </div>
        </div>
    )
}
export default CheckoutItems