import {Box, Fab, IconButton, Table, TableBody, TableCell, TableRow} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";
import {TransactionDialog} from "../transaction-dialog/TransactionDialog";
import "./Transactions.css";
import {TransactionAmount} from "../TransactionAmount/TransactionAmount";
import {Category} from "../../pages/main/MainPage";

export interface Transaction {
    date: string;
    transactionId: string;
    amount: number;
    description: string;
    categoryId?: string;
}

interface TransactionsProps {
    items: Transaction[];
    categories: Category[];
    onChange: (value: Transaction[]) => void;
}

export const Transactions = (props: TransactionsProps) => {
    const [editedTransaction, setEditedTransaction] = useState<Transaction>();
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'start',
            }}
        >
            <Table style={{width: 700, margin: 16}}><TableBody>
                {props.items.map((item) => (
                    <TableRow key={item.transactionId}>
                        <TableCell width={100}>
                            {dayjs(item.date).format('l')}
                        </TableCell>
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
                onClick={() => setEditedTransaction({
                    date: dayjs().toString(),
                    amount: 0,
                    description: '',
                    transactionId: crypto.randomUUID()
                })}
            >
                <AddIcon/>
            </Fab>
            {editedTransaction && (
                <TransactionDialog
                    initial={editedTransaction}
                    categories={props.categories}
                    onCancel={() => setEditedTransaction(undefined)}
                    onConfirm={transaction => {
                        props.onChange(props.items.some(item => item.transactionId === transaction?.transactionId)
                            ? props.items.map(item => item.transactionId === transaction?.transactionId ? transaction : item)
                            : [...props.items, transaction]);
                        setEditedTransaction(undefined);
                    }}
                />
            )}
        </Box>
    );
}
