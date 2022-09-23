import {Category} from "../../pages/MainPage/MainPage";
import {Box} from "@mui/material";

interface CategoryItemProps {
    category: Category;
}

export const CategoryItem = (props: CategoryItemProps) => (
    <Box sx={{ display: 'flex', alignItems: 'center'}}>
        <div style={{width: 10, height: 10, backgroundColor: props.category.color, margin: 10}}/>
        {props.category.title}
    </Box>
);
