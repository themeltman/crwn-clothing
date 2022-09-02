import Button, {BUTTON_TYPE_CLASSES} from "../button/button";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {Footer, Name, Price, ProductCardContainer} from "./product-card.style";

const ProductCard = ({product}) => {
    const { name, price, imageUrl } = product
    const {addItemToCart} = useContext(CartContext)
    const addProduct = () => {
        addItemToCart(product)
    }
    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <Footer>
                <Name>{name}</Name>
                <Price>${price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProduct}>Add to card</Button>
        </ProductCardContainer>
    )
}

export default ProductCard