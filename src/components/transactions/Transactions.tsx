import {Fab, IconButton, List, ListItem, ListItemText} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";
import {TransactionDialog} from "../transaction-dialog/TransactionDialog";
import "./Transactions.css";

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
        <div className="Container">
            <List className="List">
                {props.items.map((item) => {
                    const labelId = `checkbox-list-label-${item.transactionId}`;

                    return (
                        <ListItem
                            key={item.transactionId}
                            secondaryAction={
                                <div style={{display: 'flex', flexDirection: 'row'}}>
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
                                </div>
                            }
                            disablePadding
                        >
                            <ListItemText
                                id={labelId}
                                primary={item.description}
                            />
                            <ListItemText
                                id={labelId}
                                primary={item.amount}
                            />
                        </ListItem>
                    );
                })}
            </List>
            <Fab
                color="primary"
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
