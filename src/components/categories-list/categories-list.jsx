import DirectoryItem from '../directory-item/directory-item'
import './categories-list.styles.scss'

const CategoriesList = ({categories}) => {

    return (
        <div className={"categories-container"}>
            {categories.map((category) => (
                <DirectoryItem key={category.id} category={category} />
            ))}
        </div>
    );
};

export default CategoriesList;