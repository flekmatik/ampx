import {useState} from "react";
import {Transaction, Transactions} from "../../components/transactions/Transactions";
import {AppBar} from "@mui/material";
import {Page, Sider} from "../../components/Sider/Sider";

const ContentTypes = {
    transactions: Transactions,
};

type ContentTypeList = keyof typeof ContentTypes;

export interface Model {
    transactions: Transaction[];
}

interface MainPageProps {
    model: Model;
    onChange: (value: Model) => void;
    onLogout: () => void;
}

export const MainPage = (props: MainPageProps) => {
    const [page, setPage] = useState<Page>('transactions');

    const getContent = () => {
        switch (page) {
            case "transactions":
                return (
                    <Transactions
                        items={props.model.transactions}
                        onChange={value => props.onChange({
                            ...props.model,
                            transactions: value,
                        })}
                    />
                );
        }
    }

    return (
        <div className="Container">
            <AppBar position="static" color="default"/>
            <Sider
                page={page}
                onChange={page => {
                    if (page === 'logout') {
                        props.onLogout();
                    } else {
                        setPage(page);
                    }
                }}
            />
            {getContent()}
        </div>
    );
}
