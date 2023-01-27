import {BackgroundImage, DirectoryItemBody, DirectoryItemContainer} from "./directory-item.styles";
import { useNavigate } from "react-router-dom";
import {FC} from "react";
import {DirectoryCategory} from "../directory/directory";

type DirectoryItemProp = {
    category: DirectoryCategory
}
const DirectoryItem:FC<DirectoryItemProp> = ({ category }) => {
    const { imageUrl, title, route} = category
    const navigate = useNavigate()
    const gotoDirectoryItem = () => navigate(route)
return (
    <DirectoryItemContainer onClick={gotoDirectoryItem}>
        <BackgroundImage imageUrl={imageUrl} />
        <DirectoryItemBody>
            <h2>{title}</h2>
            <p>Shop Now</p>
        </DirectoryItemBody>
    </DirectoryItemContainer>
)
}

export default DirectoryItem