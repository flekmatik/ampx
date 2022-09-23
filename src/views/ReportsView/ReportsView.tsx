import { Box, Typography } from "@mui/material";
import { Transaction } from "../TransactionsView/TransactionsView";
import { Category } from "../../pages/MainPage/MainPage";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { CashflowChart } from "../../components/CashflowChart/CashflowChart";
import { CategoryChart } from "../../components/CategoryChart/CategoryChart";

dayjs.extend(utc)

interface ReportsViewProps {
    transactions: Transaction[];
    categories: Category[];
}


export const ReportsView = (props: ReportsViewProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <CashflowChart transactions={props.transactions}/>
            <Box>
                <Typography>Income</Typography>
                <CategoryChart
                    transactions={props.transactions.filter(t => t.amount > 0)}
                    categories={props.categories}
                />
            </Box>
            <Box>
                <Typography>Expenses</Typography>
                <CategoryChart
                    transactions={props.transactions
                        .filter(t => t.amount < 0)
                        .map(t => ({...t, amount: -t.amount}))}
                    categories={props.categories}
                />
            </Box>
        </Box>
    );
}
