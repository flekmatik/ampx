import {Fab, IconButton, List, ListItem, ListItemText} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";
import {TransactionDialog} from "../transaction-dialog/TransactionDialog";

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
        <div>
            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                {props.items.map((item) => {
                    const labelId = `checkbox-list-label-${item.transactionId}`;

                    return (
                        <ListItem
                            key={item.transactionId}
                            secondaryAction={
                                <div style={{display: 'flex'}}>
                                    {item.amount}
                                    <IconButton
                                        edge="end"
                                        aria-label="edit transaction"
                                        onChange={() => setEditedTransaction(item)}
                                    >
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete transaction"
                                        onChange={() => props.onChange(props.items.filter(i => i.transactionId !== item.transactionId))}
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
                        </ListItem>
                    );
                })}
            </List>
            <Fab
                color="primary"
                aria-label="add"
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
