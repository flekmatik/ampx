import {Fab, IconButton, Table, TableBody, TableCell, TableRow} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";
import {TransactionDialog} from "../transaction-dialog/TransactionDialog";
import "./Transactions.css";
import {TransactionAmount} from "../TransactionAmount/TransactionAmount";

export interface Transaction {
    transactionId: string;
    amount: number;
    description: string;
    categoryId?: string;
}

interface TransactionsProps {
    items: Transaction[];
    onChange: (value: Transaction[]) => void;
}

export const Transactions = (props: TransactionsProps) => {
    const [editedTransaction, setEditedTransaction] = useState<Transaction>();
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'start',
            }}
        >
            <Table style={{width: 700}}><TableBody>
                {props.items.map((item) => (
                    <TableRow key={item.transactionId}>
                        <TableCell>
                            {item.description}
                        </TableCell>
                        <TableCell align="right">
                            <TransactionAmount transaction={item}/>
                        </TableCell>
                        <TableCell width={100}>
                            <IconButton
                                edge="end"
                                aria-label="edit transaction"
                                onClick={() => setEditedTransaction(item)}
                            >
                                <EditIcon/>
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="delete transaction"
                                onClick={() => props.onChange(props.items.filter(i => i.transactionId !== item.transactionId))}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody></Table>
            <Fab
                color="primary"
                sx={{
                    right: 16,
                    bottom: 16,
                    position: 'absolute',
                }}
                aria-label="add"
                className="Fab"
                onClick={() => setEditedTransaction({amount: 0, description: '', transactionId: crypto.randomUUID()})}
            >
                <AddIcon/>
            </Fab>
            {editedTransaction && (
                <TransactionDialog
                    initial={editedTransaction}
                    onCancel={() => setEditedTransaction(undefined)}
                    onConfirm={transaction => {
                        props.onChange(props.items.some(item => item.transactionId === transaction?.transactionId)
                            ? props.items.map(item => item.transactionId === transaction?.transactionId ? transaction : item)
                            : [...props.items, transaction]);
                        setEditedTransaction(undefined);
                    }}
                />
            )}
        </div>
    );
}
