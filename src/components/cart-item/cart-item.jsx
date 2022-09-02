import {CartItemContainer} from "./cart-item.styles";

const CartItem = ({cartItem}) => {
    const {name, quantity, price, imageUrl} = cartItem
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <div className={'item-details'}>
                <span className='name'>{name}</span>
                <span className='price'>{quantity} x ${price}</span>
            </div>
        </CartItemContainer>
    )
}

export default CartItem