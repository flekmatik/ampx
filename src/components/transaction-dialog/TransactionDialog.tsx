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
    const amountSign = transaction.amount < 0 ? -1 : 1;
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
                    value={amountSign}
                    onChange={(event) => setTransaction({
                        ...transaction,
                        amount: Math.abs(transaction.amount) * (event.target.value as unknown as number)
                    })}
                    SelectProps={{
                        native: true,
                    }}
                    variant="standard"
                >
                    <option value={1}>
                        Income
                    </option>
                    <option value={-1}>
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
                    value={Math.abs(transaction.amount)}
                    variant="standard"
                    onChange={event => setTransaction({
                        ...transaction,
                        amount: parseFloat(event.target.value) * amountSign,
                    })}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onCancel}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={() => props.onConfirm(transaction)}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}
