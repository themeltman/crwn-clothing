import {BackgroundImage, DirectoryItemBody, DirectoryItemContainer} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
    const { imageUrl, title} = category
return (
    <DirectoryItemContainer>
        <BackgroundImage imageUrl={imageUrl} />
        <DirectoryItemBody>
            <h2>{title}</h2>
            <p>Shop Now</p>
        </DirectoryItemBody>
    </DirectoryItemContainer>
)
}

export default DirectoryItem