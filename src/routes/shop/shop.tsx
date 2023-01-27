import { Routes, Route } from "react-router-dom";

import CategoriesPreview from "../categories-preview/categories-preview";
import Category from "../category/category";
import {useEffect} from "react";
import {fetchCategoriesStart} from "../../store/catagories/categories.actions";
import {useDispatch} from "react-redux";

const Shop = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCategoriesStart())
    }, [])


    return (
      <Routes>
          <Route index element={<CategoriesPreview/>} />
          <Route path={":category"} element={<Category/>} />
      </Routes>
    )
}
export default Shop