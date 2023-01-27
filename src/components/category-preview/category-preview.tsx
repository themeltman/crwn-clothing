import ProductCard from "../product-card/product-card";
import {CategoryPreviewContainer, Preview, Title} from "./category-preview.styles";
import {CategoryItem} from "../../store/catagories/categories.types";
import {FC} from "react";

type CategoryInputType = {
    title: string
    products: CategoryItem[]
}
const CategoryPreview: FC<CategoryInputType> = ({title, products}) => {
    return(
        <CategoryPreviewContainer>
            <h2>
                <Title to={title}>{title.toUpperCase()}</Title>
            </h2>
            <Preview>
                {
                    products
                        .filter((_, idx) => idx < 4)
                        .map((product) => <ProductCard key={product.id} product={product}  />)
                }
            </Preview>
        </CategoryPreviewContainer>
    )

}

export default CategoryPreview