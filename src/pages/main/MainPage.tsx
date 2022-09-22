import {useState} from "react";
import {Transactions} from "../../components/transactions/Transactions";

const ContentTypes = {
    transactions: Transactions,
};

type ContentTypeList = keyof typeof ContentTypes;

export const MainPage = () => {
    const [contentType, setContentType] = useState<ContentTypeList>('transactions');
    const Content = ContentTypes[contentType];

    return (
        <div className="Container">
            {/*<Sider />*/}
            <Content />
        </div>
    );
}
