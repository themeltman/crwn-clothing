import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ProductCard from "../../components/product-card/product-card";
import {CategoryContainer, CategoryTitle} from "./category.styles";
import {useSelector} from "react-redux";
import {selectCategoriesIsLoading, selectCategoriesMap} from "../../store/catagories/categories.selector";
import Spinner from "../../components/spinner/spinner";

type CategoryRouteParams ={
    category: string
}
const Category = () => {
    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams
    // const { categoriesMap } = useContext(CategoriesContext)
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)
    const [products, setProducts ] = useState(categoriesMap[category])
    useEffect(() => setProducts(categoriesMap[category]), [category, categoriesMap])

    return (
        <>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            {isLoading ?
            (<Spinner/>) :
            (<CategoryContainer>
                { products &&
                    products.map((product) => <ProductCard key={product.id} product={product}/>)
                }
            </CategoryContainer>)}
        </>
    )
}

export default Category