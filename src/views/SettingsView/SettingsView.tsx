import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, IconButton, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { useState } from 'react';
import { CategoryItem } from '../../components/CategoryItem/CategoryItem';
import { CategoryDialog } from '../../dialogs/CategoryDialog/CategoryDialog';
import { Category } from '../../pages/MainPage/MainPage';

interface SettingsViewProps {
    categories: Category[];
    usedCategoryIds: string[];
    onChange: (value: Category[]) => void;
}

export const SettingsView = (props: SettingsViewProps) => {
    const [editedCategory, setEditedCategory] = useState<Category>();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 300 }}>
            <Typography variant="h5">Categories</Typography>
            <Table><TableBody>
                {props.categories.map((item) => (
                    <TableRow
                        key={item.id}
                    >
                        <TableCell>
                            <CategoryItem category={item}/>
                        </TableCell>
                        <TableCell align="right">
                            <IconButton aria-label="delete" size="small" onClick={() => setEditedCategory(item)}>
                                <EditIcon/>
                            </IconButton>
                            <IconButton
                                aria-label="delete"
                                size="small"
                                disabled={props.usedCategoryIds.includes(item.id) || props.categories.length < 2}
                                onClick={() => props.onChange(props.categories.filter(c => c.id !== item.id))}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody></Table>
            <Button
                color="primary"
                aria-label="add"
                className="Fab"
                sx={{ alignSelf: 'center' }}
                onClick={() => setEditedCategory({
                    title: '',
                    id: crypto.randomUUID(),
                    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                })}
            >
                Add Category
            </Button>
            {editedCategory && (
                <CategoryDialog
                    initial={editedCategory}
                    onCancel={() => setEditedCategory(undefined)}
                    onConfirm={value => {
                        props.onChange(props.categories.some(item => item.id === value.id)
                            ? props.categories.map(item => item.id === value.id ? value : item)
                            : [...props.categories, value]);
                        setEditedCategory(undefined);
                    }}
                />
            )}
        </Box>
    );
};
