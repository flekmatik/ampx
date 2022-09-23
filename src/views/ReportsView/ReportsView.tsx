import {Box} from "@mui/material";
import {Transaction} from "../TransactionsView/TransactionsView";
import {Category} from "../../pages/MainPage/MainPage";
import {Bar, Line, BarChart, XAxis, YAxis, Tooltip} from "recharts";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc)

interface ReportsViewProps {
    transactions: Transaction[];
    categories: Category[];
}

type CashflowChartData = {
    [date: string]: { incomes?: number, expenses?: number };
}

export const ReportsView = (props: ReportsViewProps) => {
    const cashflowChartData = props.transactions
        .reduce<CashflowChartData>((acc, transaction) => {
            const {date, amount} = transaction;
            const type = amount < 0 ? 'expenses' : 'incomes';
            const dayNum = dayjs(date, 'YYYY-MM-DD').utc(true).valueOf() / 86400000;
            console.log('D', date, dayNum)
            return {
                ...acc,
                [dayNum]: {
                    ...acc[dayNum],
                    amount,
                    [type]: (acc[dayNum]?.[type] || 0) + amount,
                },
            };
        }, {});
    const d = Object.entries(cashflowChartData)
        .map(([dayNum, data]: any) => ({dayNum, ...data}))
        .sort((a, b) => b.dayNum - a.dayNum);

    return (
        <Box>
            <BarChart width={400} height={400} data={d} stackOffset="sign">
                <Bar dataKey="expenses"   stackId="a" fill="#ff0000" />
                <Bar dataKey="incomes"  stackId="a" fill="#00ff00" />
                <Tooltip />
                <XAxis dataKey="date"/>
                <YAxis />
            </BarChart>
        </Box>
    );
}
