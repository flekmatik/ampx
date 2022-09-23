import {
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import "./Transactions.css";
import {Category} from "../../pages/MainPage/MainPage";
import {CategoryItem} from "../../components/CategoryItem/CategoryItem";

interface SettingsViewProps {
    categories: Category[];
    onChange: (value: Category[]) => void;
}

export const SettingsView = (props: SettingsViewProps) => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Typography variant="h5">Categories</Typography>
            <List style={{}}>
                {props.categories.map((item) => (
                    <ListItem
                        key={item.id}
                        secondaryAction={
                            <IconButton aria-label="delete" size="small">
                                <DeleteIcon/>
                            </IconButton>
                        }
                    >
                        <CategoryItem category={item}/>
                    </ListItem>
                ))}
            </List>
            <Button
                color="primary"
                aria-label="add"
                className="Fab"
                sx={{alignSelf: 'center'}}
                onClick={() => {
                }}
            >
                Add Category
            </Button>
        </Box>
    );
}
