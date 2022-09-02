import DirectoryItem from '../directory-item/directory-item'
import {CategoriesContainer} from "./categories-list.styles";

const CategoriesList = ({categories}) => {

    return (
        <CategoriesContainer>
            {categories.map((category) => (
                <DirectoryItem key={category.id} category={category} />
            ))}
        </CategoriesContainer>
    );
};

export default CategoriesList;