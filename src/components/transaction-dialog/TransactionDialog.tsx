import {Transaction} from "../transactions/Transactions";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField} from "@mui/material";
import {useState} from "react";
import "./TransactionDialog.css";

interface TransactionDialogProps {
    initial: Transaction;
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
        <Dialog open onClose={props.onCancel} fullWidth>
            <DialogTitle>Edit transaction</DialogTitle>
            <DialogContent className="Content">
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
                    value={transaction.amount}
                    variant="standard"
                    inputProps={{inputMode: 'numeric', pattern: '([0-9]*[.])?[0-9]*'}}
                    onChange={event => setTransaction({
                        ...transaction,
                        amount: parseFloat(event.target.value),
                    })}
                />
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
