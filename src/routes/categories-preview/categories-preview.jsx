import {Fragment, useContext} from "react";
import { CategoriesContext} from "../../contexts/categories-context";
import CategoryPreview from "../../components/category-preview/category-preview";
import {useSelector} from "react-redux";
import {selectCategoriesIsLoading, selectCategoriesMap} from "../../store/catagories/categories.selector";
import Spinner from "../../components/spinner/spinner";

const CategoriesPreview = () => {
    // const {categoriesMap} = useContext(CategoriesContext)
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)
    return (
        <Fragment>
            {
                isLoading ? (<Spinner/>) :
                (Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title]
                return (<CategoryPreview key={title} title={title} products={products} />)
            }))
            }
        </Fragment>
    )
}
export default CategoriesPreview