import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {CategoriesContext} from "../../contexts/categories-context";
import ProductCard from "../../components/product-card/product-card";
import {CategoryContainer, CategoryTitle} from "./category.styles";
import {useSelector} from "react-redux";
import {selectCategoriesIsLoading, selectCategoriesMap} from "../../store/catagories/categories.selector";
import Spinner from "../../components/spinner/spinner";

const Category = () => {
    const { category } = useParams()
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