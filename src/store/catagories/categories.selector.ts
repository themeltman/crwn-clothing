import { createSelector} from "reselect";
import {categoriesReducer, CategoriesState} from "./categories.reducer";
import {CategoryMap} from "./categories.types";

const selectCategoryReducer = (state): CategoriesState => state.categories

const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories): CategoryMap =>
        categories.reduce((acc, category) => {
        const  { title, items } = category
        acc[title.toLowerCase()] = items
        return acc
    }, {} as CategoryMap)
)

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)
