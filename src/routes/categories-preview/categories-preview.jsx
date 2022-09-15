import {Fragment, useContext} from "react";
import { CategoriesContext} from "../../contexts/categories-context";
import CategoryPreview from "../../components/category-preview/category-preview";
import {useSelector} from "react-redux";
import {selectCategoriesMap} from "../../store/catagories/categories.selector";

const CategoriesPreview = () => {
    // const {categoriesMap} = useContext(CategoriesContext)
    const categoriesMap = useSelector(selectCategoriesMap)
    return (
        <Fragment>
            {Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title]
                return (<CategoryPreview key={title} title={title} products={products} />)
            })}
        </Fragment>
    )
}
export default CategoriesPreview