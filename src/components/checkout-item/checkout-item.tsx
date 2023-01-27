import {
    Arrow,
    BaseSpan,
    CheckoutItemContainer,
    ImageContainer,
    Quantity,
    RemoveButton,
    Value
} from "./checkout-item.styles";
import {addItemToCart, decrementQuantity, deleteFromCart} from "../../store/cart/cart.actions";
import {useDispatch, useSelector} from "react-redux";
import {selectCartItems} from "../../store/cart/cart.selector";
import {CartItem} from "../../store/cart/cart.types";
import {FC} from "react";

type CheckoutItemProp = {
    cartItem: CartItem
}
const CheckoutItem: FC<CheckoutItemProp> = ({cartItem}) => {
    const { name, price, imageUrl, quantity } = cartItem
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch()
    const decrementQuantityFromCart = () => dispatch(decrementQuantity(cartItems, cartItem))
    const incQuantityFromCart = () => dispatch(addItemToCart(cartItems, cartItem))
    const deleteItemFromCart = () => dispatch(deleteFromCart(cartItems, cartItem))

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name}/>
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={decrementQuantityFromCart}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={incQuantityFromCart}>&#10095;</Arrow>
            </Quantity>
            <BaseSpan>${price}</BaseSpan>
            <RemoveButton onClick={deleteItemFromCart}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem