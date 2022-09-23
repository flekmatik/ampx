import {Transaction} from "../transactions/Transactions";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment, MenuItem,
    Stack,
    TextField
} from "@mui/material";
import {useState} from "react";
import "./TransactionDialog.css";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {Category} from "../../pages/main/MainPage";
import {CategoryItem} from "../CategoryItem/CategoryItem";

interface TransactionDialogProps {
    initial: Transaction;
    categories: Category[];
    onCancel: () => void;
    onConfirm: (value: Transaction) => void;
}

export const TransactionDialog = (props: TransactionDialogProps) => {
    const [transaction, setTransaction] = useState({
        ...props.initial,
        amount: Math.abs(props.initial.amount),
    });
    const [isExpense, setIsExpense] = useState(props.initial.amount < 0);
    return (
        <Dialog open={true} onClose={props.onCancel} fullWidth>
            <DialogTitle>Edit transaction</DialogTitle>
            <DialogContent sx={{display: 'flex', flexDirection: 'column'}}>
                <Stack sx={{marginTop: 1}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Date"
                            inputFormat="DD/MM/YYYY"
                            value={transaction.date}
                            onChange={(date) => setTransaction({
                                ...transaction,
                                date: date!,
                            })}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        margin="dense"
                        variant="standard"
                        label="Description"
                        value={transaction.description}
                        onChange={event => setTransaction({
                            ...transaction,
                            description: event.target.value,
                        })}
                    />
                    <TextField
                        select
                        margin="dense"
                        label="Category"
                        value={transaction.categoryId}
                        onChange={event => setTransaction({
                            ...transaction,
                            categoryId: event.target.value,
                        })}
                        variant="standard"
                    >
                        {props.categories.map(category => (
                            <MenuItem key={category.id} value={category.id}>
                                <CategoryItem category={category} />
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        margin="dense"
                        label="Type"
                        value={isExpense ? 1 : 0}
                        onChange={event => setIsExpense(!!event.target.value)}
                        SelectProps={{
                            native: true,
                        }}
                        variant="standard"
                    >
                        <option value={0}>
                            Income
                        </option>
                        <option value={1}>
                            Expense
                        </option>
                    </TextField>
                    <TextField
                        label="Amount"
                        margin="dense"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                        }}
                        type="number"
                        value={transaction.amount || ''}
                        variant="standard"
                        onChange={event => setTransaction({
                            ...transaction,
                            amount: parseFloat(event.target.value),
                        })}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onCancel}>Cancel</Button>
                <Button
                    type="submit"
                    disabled={!transaction.amount || !transaction.description}
                    variant="contained"
                    onClick={() => props.onConfirm({
                        ...transaction,
                        amount: transaction.amount * (isExpense ? -1 : 1)
                    })}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}
