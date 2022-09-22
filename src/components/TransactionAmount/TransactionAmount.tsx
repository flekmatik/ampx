import {Transaction} from "../transactions/Transactions";
import {Typography} from "@mui/material";

interface TransactionAmountProps {
    transaction: Transaction;
}

export const TransactionAmount = (props: TransactionAmountProps) => (
    <Typography color={props.transaction.amount < 0 ? 'red' : 'green'}>
        €{Math.abs(props.transaction.amount)}
    </Typography>
)
