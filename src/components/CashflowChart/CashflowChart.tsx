import {Bar, ComposedChart, Line, Tooltip, XAxis, YAxis} from "recharts";
import dayjs from "dayjs";
import {Transaction} from "../../views/TransactionsView/TransactionsView";

interface CashflowChartProps {
    transactions: Transaction[];
}

type CashflowChartData = {
    [date: string]: { incomes?: number, expenses?: number };
}

export const CashflowChart = (props: CashflowChartProps) => {
    const dayTransactions = props.transactions.map(t => ({
        ...t,
        date: dayjs(t.date, 'YYYY-MM-DD').utc(true).valueOf() / 86400000
    }));
    const days = dayTransactions.map(t => t.date);
    const minDay = Math.min(...days);
    const maxDay = Math.max(...days);
    const allDays = [...Array(maxDay - minDay)]
        .map((_, index) => minDay + index)
        .reduce((acc, day) => ({...acc, [day]: {}}), {});

    const cashflowChartData = props.transactions
        .reduce<CashflowChartData>((acc, transaction) => {
            const {date, amount} = transaction;
            const type = amount < 0 ? 'expenses' : 'incomes';
            const dayNum = dayjs(date, 'YYYY-MM-DD').utc(true).valueOf() / 86400000;
            const current = acc[dayNum];
            return {
                ...acc,
                [dayNum]: {
                    ...current,
                    [type]: (current?.[type] || 0) + amount,
                },
            };
        }, allDays);
    let currentTotal = 0;
    const d = Object.entries(cashflowChartData)
        .map(([dayNum, data]: any) => ({dayNum, ...data}))
        .sort((a, b) => a.dayNum - b.dayNum)
        .map((item, index, acc) => {
            const dayTotal = (acc[index].incomes ?? 0) + (acc[index].expenses ?? 0);
            currentTotal += dayTotal;
            return ({
                ...item,
                total: currentTotal,
            })
        });

    return (
        <ComposedChart width={400} height={200} data={d} stackOffset="sign">
            <Bar dataKey="expenses" stackId="a" fill="#ff0000"/>
            <Bar dataKey="incomes" stackId="a" fill="#00ff00"/>
            <Line type="monotone" dataKey="total" stroke="#0000ff" dot={false}/>
            <Tooltip/>
            <XAxis
                dataKey="dayNum"
                tickFormatter={dayNum => dayjs(dayNum * 86400000).format('DD/MM')}
            />
            <YAxis unit="€"/>
        </ComposedChart>
    );
}
