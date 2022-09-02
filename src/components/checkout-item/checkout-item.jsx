import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {
    Arrow,
    BaseSpan,
    CheckoutItemContainer,
    ImageContainer,
    Quantity,
    RemoveButton,
    Value
} from "./checkout-item.styles";

const CheckoutItem = ({cartItem}) => {
    const { name, price, imageUrl, quantity } = cartItem
    const {decrementQuantity, deleteFromCart, addItemToCart} = useContext(CartContext)

    const decrementQuantityFromCart = () => decrementQuantity(cartItem)
    const incQuantityFromCart = () => addItemToCart(cartItem)
    const deleteItemFromCart = () => deleteFromCart(cartItem)

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