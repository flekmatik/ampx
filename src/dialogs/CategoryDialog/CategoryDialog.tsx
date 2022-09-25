import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { Category } from '../../interfaces';

interface TransactionDialogProps {
    initial: Category;
    onCancel: () => void;
    onConfirm: (value: Category) => void;
}

export const CategoryDialog = (props: TransactionDialogProps) => {
    const [category, setCategory] = useState(props.initial);
    return (
        <Dialog open={true} onClose={props.onCancel} fullWidth>
            <DialogTitle>Edit category</DialogTitle>
            <DialogContent aria-label="category editor">
                <Stack>
                    <TextField
                        margin="dense"
                        variant="standard"
                        type="color"
                        label="Color"
                        value={category.color}
                        onChange={event => setCategory({
                            ...category,
                            color: event.target.value,
                        })}
                    />
                    <TextField
                        margin="dense"
                        variant="standard"
                        label="Name"
                        value={category.title}
                        onChange={event => setCategory({
                            ...category,
                            title: event.target.value,
                        })}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onCancel}>Cancel</Button>
                <Button
                    type="submit"
                    disabled={!category.title}
                    variant="contained"
                    onClick={() => props.onConfirm(category)}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};
