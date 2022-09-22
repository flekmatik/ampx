import {useState} from "react";
import {Transaction, Transactions} from "../../components/transactions/Transactions";
import {AppBar} from "@mui/material";

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
}

export const MainPage = (props: MainPageProps) => {
    const [contentType, setContentType] = useState<ContentTypeList>('transactions');
    const Content = ContentTypes[contentType];

    return (
        <div className="Container">
            <AppBar position="static" color="default" />
            {/*<Sider />*/}
            <Content
                items={props.model.transactions}
                onChange={value => props.onChange({
                    ...props.model,
                    transactions: value,
                })}
            />
        </div>
    );
}
