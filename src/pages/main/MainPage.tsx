import {useState} from "react";
import {Transaction, Transactions} from "../../components/transactions/Transactions";
import {AppBar} from "@mui/material";

const ContentTypes = {
    transactions: Transactions,
};

type ContentTypeList = keyof typeof ContentTypes;

export const MainPage = () => {
    const [contentType, setContentType] = useState<ContentTypeList>('transactions');
    const Content = ContentTypes[contentType];

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    return (
        <div className="Container">
            <AppBar position="static" color="default" />
            {/*<Sider />*/}
            <Content items={transactions} onChange={value => setTransactions(value)} />
        </div>
    );
}
